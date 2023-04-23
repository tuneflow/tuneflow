import _ from 'underscore';
import { DEFAULT_PPQ } from '../utils';
import type { Song } from './song';
import { le as lowerEqual } from 'binary-search-bounds';

export type LyricTokenizer = (input: string) => Promise<string[]>;

export class Lyrics {
  private song: Song;
  private lines: LyricLine[];

  constructor({ song, lines }: { song: Song; lines?: LyricLine[] }) {
    this.song = song;
    this.lines = lines ? lines : [];
  }

  getLines() {
    return this.lines;
  }

  /**
   * Gets the index of the line at a given tick.
   *
   * Returns -1 if there is no line at the tick.
   */
  getIndexOfLineAtTick(tick: number) {
    if (this.lines.length <= 0) {
      return -1;
    }
    const startSearchIndex = lowerEqual(
      this.lines,
      {
        getStartTick: () => tick,
      } as LyricLine,
      (a, b) => a.getStartTick() - b.getStartTick(),
    );
    for (let index = startSearchIndex; index >= 0; index -= 1) {
      const line = this.lines[index];
      if (tick >= line.getStartTick() && tick <= line.getEndTick()) {
        return index;
      }
    }
    return -1;
  }

  /** Create a single line and inserts it into the lyrics. */
  createLine({ startTick, resolveOrder = true }: { startTick: number; resolveOrder?: boolean }) {
    const lyricLine = new LyricLine({ lyrics: this, startTick });
    this.lines.push(lyricLine);
    if (resolveOrder) {
      this.sortLinesInternal();
    }
    return lyricLine;
  }

  /**
   * Create a single line with the given string and inserts it into the lyrics.
   *
   * The string will be splitted into words by `splitBy`.
   */
  async createLineFromString({
    input,
    startTick,
    endTick,
    tokenizer = LyricLine.DEFAULT_TOKENIZER,
  }: {
    input: string;
    startTick: number;
    endTick: number;
    /** An async function to break input into a list of string-format words.  */
    tokenizer?: LyricTokenizer;
  }) {
    const line = this.createLine({ startTick });
    if (!input) {
      return line;
    }
    // @ts-ignore
    await LyricLine.createWordsFromString(line, input, startTick, endTick, tokenizer);
    return line;
  }

  /** Removes a line at the given index. */
  removeLineAtIndex(index: number) {
    if (index < 0 || index >= this.lines.length) {
      return;
    }
    this.lines.splice(index, /* deleteCount= */ 1);
  }

  /** Clone a line and inserts it into the current lyrics. */
  cloneLine(originalLine: LyricLine) {
    const line = new LyricLine({
      lyrics: this,
      startTick: originalLine.getStartTick(),
    });
    for (const lyricWord of originalLine.getWords()) {
      line.createWord({
        word: lyricWord.getWord(),
        startTick: lyricWord.getStartTick(),
        endTick: lyricWord.getEndTick(),
      });
    }
    this.lines.push(line);
    return line;
  }

  sortLinesInternal() {
    this.lines.sort((a, b) => a.getStartTick() - b.getStartTick());
  }
}

/**
 * One single line in lyrics
 */
export class LyricLine {
  private lyrics: Lyrics;
  private words: LyricWord[];

  constructor({ lyrics, startTick }: { lyrics: Lyrics; startTick: number }) {
    this.lyrics = lyrics;
    this.words = [
      new LyricWord({
        line: this,
        word: LyricWord.PLACEHOLDER_WORD,
        startTick,
        endTick: startTick + DEFAULT_PPQ,
      }),
    ];
  }

  getStartTick() {
    if (this.words.length === 0) {
      throw new Error('Words cannot be empty');
    }
    return this.words[0].getStartTick();
  }

  getEndTick() {
    if (this.words.length === 0) {
      throw new Error('Words cannot be empty');
    }
    return (_.max(this.words, item => item.getEndTick()) as LyricWord).getEndTick();
  }

  getWords() {
    return this.words;
  }

  moveTo(startTick: number, endTick: number) {
    const originalStart = this.getStartTick();
    const originalEnd = this.getEndTick();
    if (!_.isNumber(originalStart) || !_.isNumber(originalEnd)) {
      return;
    }
    startTick = Math.max(startTick, 0);
    const scaleFactor = (endTick - startTick) / (originalEnd - originalStart);

    // Maintain the duration ratio of each word.
    for (const lyricWord of this.getWords()) {
      lyricWord.setStartTick(
        LyricLine.relativeMovePoint(
          lyricWord.getStartTick(),
          originalStart,
          startTick,
          scaleFactor,
        ),
        /* resolveOrder= */ false,
      );
      lyricWord.setEndTick(
        LyricLine.relativeMovePoint(lyricWord.getEndTick(), originalStart, startTick, scaleFactor),
        /* resolveOrder= */ false,
      );
    }
    // Re-sort lines.
    this.lyrics.sortLinesInternal();
  }

  /** Remove all existing words. */
  clear() {
    this.words = [this.createPlaceholderWord()];
  }

  async replaceWithString(input: string, tokenizer: LyricTokenizer = LyricLine.DEFAULT_TOKENIZER) {
    const startTick = this.getStartTick();
    const endTick = this.getEndTick();
    this.words = [this.createPlaceholderWord()];
    if (input) {
      await LyricLine.createWordsFromString(this, input, startTick, endTick, tokenizer);
    }
  }

  private static async createWordsFromString(
    line: LyricLine,
    input: string,
    startTick: number,
    endTick: number,
    tokenizer?: LyricTokenizer,
  ) {
    if (!input) {
      return;
    }
    const words = tokenizer ? await tokenizer(input) : input.split('');
    const tickPerWord = (endTick - startTick) / words.length;
    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      const wordStartTick = startTick + tickPerWord * index;
      const wordEndTick = startTick + tickPerWord * (index + 1);
      line.createWord({
        word,
        startTick: wordStartTick,
        endTick: wordEndTick,
        resolveOrder: false,
      });
    }
    line.sortWordsInternal();
  }

  createWord({
    word,
    startTick,
    endTick,
    resolveOrder = true,
  }: {
    word: string;
    startTick: number;
    endTick: number;
    resolveOrder?: boolean;
  }) {
    const newWord = new LyricWord({ line: this, word, startTick, endTick });
    if (this.isEmpty()) {
      this.words = [newWord];
    } else {
      this.words.push(newWord);
    }
    if (resolveOrder) {
      this.sortWordsInternal();
    }
    return newWord;
  }

  deleteWord(word: LyricWord) {
    let searchIndex = lowerEqual(this.words, word, (a, b) => a.getStartTick() - b.getStartTick());
    while (searchIndex >= 0 && this.words[searchIndex]) {
      const lyricWord = this.words[searchIndex];
      if (lyricWord.equals(word)) {
        if (this.words.length === 1) {
          // Words will become empty, insert a default placeholder.
          this.clear();
        } else {
          this.words.splice(searchIndex, /* deleteCount= */ 1);
        }
        return lyricWord;
      }
      searchIndex -= 1;
    }
    return null;
  }

  /** Returns The line as a single string sentence. */
  getSentence() {
    if (this.isEmpty()) {
      return '';
    }
    return LyricLine.getSentenceImpl<LyricWord>(this.words, word => word.getWord());
  }

  isEmpty() {
    return LyricLine.hasOnlyPlaceholderImpl<LyricWord>(this.words, word => word.getWord());
  }

  cloneWord(word: LyricWord) {
    return new LyricWord({
      line: this,
      word: word.getWord(),
      startTick: word.getStartTick(),
      endTick: word.getEndTick(),
    });
  }

  static getSentenceImpl<T>(words: T[], wordToTextFn: (word: T) => string) {
    if (words.length === 1 && wordToTextFn(words[0]) === LyricWord.PLACEHOLDER_WORD) {
      return '♪';
    }
    return words.map(wordToTextFn).join('');
  }

  static hasOnlyPlaceholderImpl<T>(words: T[], wordToTextFn: (word: T) => string) {
    if (!words) {
      return true;
    }
    return words.length === 1 && wordToTextFn(words[0]) === LyricWord.PLACEHOLDER_WORD;
  }

  sortWordsInternal() {
    const startTick = this.getStartTick();
    this.words.sort((a, b) => a.getStartTick() - b.getStartTick());
    if (this.getStartTick() !== startTick) {
      // Re-sort lines.
      this.lyrics.sortLinesInternal();
    }
  }

  private createPlaceholderWord() {
    return new LyricWord({
      line: this,
      word: LyricWord.PLACEHOLDER_WORD,
      startTick: this.getStartTick(),
      endTick: this.getStartTick() + DEFAULT_PPQ * 4 * 2,
    });
  }

  /**
   * The default tokenizer separates on:
   * * Single english word
   * * Single chinese character,
   * * Single punctuation that is not associated with a word
   * * Space
   */
  static async DEFAULT_TOKENIZER(input: string) {
    const tokens: string[] = [];

    let currentToken = '';
    for (const char of input) {
      if (char === ' ') {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(char)) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else if (/[\p{P}]/u.test(char)) {
        if (currentToken) {
          if (/^[']+$/.test(char) && /^[A-Za-z0-9]+$/.test(currentToken)) {
            currentToken += char;
          } else {
            tokens.push(currentToken);
            tokens.push(char);
            currentToken = '';
          }
        } else {
          tokens.push(char);
        }
      } else {
        currentToken += char;
      }
    }

    if (currentToken) {
      tokens.push(currentToken);
    }

    return tokens;
  }

  private static relativeMovePoint(
    time: number,
    originalReferenceStart: number,
    newReferenceStart: number,
    scaleFactor: number,
  ) {
    return newReferenceStart + (time - originalReferenceStart) * scaleFactor;
  }
}

export class LyricWord {
  private line: LyricLine;
  private startTick: number;
  private endTick: number;
  private word: string;

  constructor({
    line,
    word,
    startTick,
    endTick,
  }: {
    line: LyricLine;
    word: string;
    startTick: number;
    endTick: number;
  }) {
    this.line = line;
    this.word = word;
    this.startTick = startTick;
    this.endTick = endTick;
  }

  getStartTick() {
    return this.startTick;
  }

  /**
   * Set a new start tick for the word,
   * note that this might delete the word if it becomes empty.
   */
  setStartTick(startTick: number, resolveOrder = true) {
    if (startTick >= this.endTick && resolveOrder) {
      // Delete this word.
      this.deleteFromParent();
      return;
    }
    this.startTick = startTick;
    if (resolveOrder) {
      this.line.sortWordsInternal();
    }
  }

  getEndTick() {
    return this.endTick;
  }

  /**
   * Set a new emd tick for the word,
   * note that this might delete the word if it becomes empty.
   */
  setEndTick(endTick: number, resolveOrder = true) {
    if (endTick <= this.startTick && resolveOrder) {
      // Delete this word.
      this.deleteFromParent();
      return;
    }
    this.endTick = endTick;
  }

  getWord() {
    return this.word;
  }

  setWord(word: string) {
    if (!word) {
      throw new Error('Cannot set to empty word.');
    }
    this.word = word;
  }

  deleteFromParent() {
    this.line.deleteWord(this);
  }

  equals(word: LyricWord) {
    return (
      this.startTick === word.startTick &&
      this.endTick === word.getEndTick() &&
      this.word === word.getWord()
    );
  }

  static PLACEHOLDER_WORD = '^%%^';
}

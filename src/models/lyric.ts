export class LyricWord {
  private start_tick: number;
  private end_tick: number;
  private word: string;

  constructor({
    word,
    start_tick,
    end_tick,
  }: {
    word: string;
    start_tick: number;
    end_tick: number;
  }) {
    this.word = word;
    this.start_tick = start_tick;
    this.end_tick = end_tick;
  }

  getStartTick() {
    return this.start_tick;
  }

  setStartTick(start_tick: number) {
    this.start_tick = start_tick;
  }

  getEndTick() {
    return this.end_tick;
  }

  setEndTick(end_tick: number) {
    this.end_tick = end_tick;
  }

  getWord() {
    return this.word;
  }

  setWord(word: string) {
    this.word = word;
  }
}

/**
 * One of the lines in lyrics
 */

export class LyricLine {
  private words: LyricWord[];

  constructor({ words }: { words: LyricWord[] }) {
    this.words = words;
  }

  getStartTick() {
    return this.words[0].getStartTick();
  }

  getEndTick() {
    return this.words[this.words.length - 1].getEndTick();
  }

  getWords() {
    return this.words;
  }

  setWords(words: LyricWord[]) {
    this.words = words;
  }

}

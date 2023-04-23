import { Lyrics, Song } from '../src';
import type { LyricWord } from '../src';

function assertWordsEqual(words: LyricWord[], wordList: any[]) {
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const wordInfo = wordList[i];
    try {
      expect(word.getStartTick()).toBeCloseTo(wordInfo.startTick, 2);
      expect(word.getEndTick()).toBeCloseTo(wordInfo.endTick, 2);
      expect(word.getWord()).toBe(wordInfo.word);
    } catch (e: any) {
      console.error(e);
      throw new Error(
        `@${i}th word ${word.getStartTick()}_${word.getEndTick()}_${word.getWord()} is not equal to ${JSON.stringify(
          wordInfo,
        )}`,
      );
    }
  }
}

describe('LyricWord Tests', () => {
  it('Get fields correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    const word2 = line.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });
    expect(word1.getStartTick()).toBe(480);
    expect(word1.getEndTick()).toBe(960);
    expect(word1.getWord()).toBe('hello');
    expect(word2.getStartTick()).toBe(1440);
    expect(word2.getEndTick()).toBe(1680);
    expect(word2.getWord()).toBe('how');
  });

  it('Update start and end ticks, keep word and line order correctly', async () => {
    const song = new Song();
    const lyrics = song.getLyrics();
    const line = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    const word2 = line.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });
    expect(word1.getStartTick()).toBe(480);
    expect(word1.getEndTick()).toBe(960);
    expect(word1.getWord()).toBe('hello');
    expect(word2.getStartTick()).toBe(1440);
    expect(word2.getEndTick()).toBe(1680);
    expect(word2.getWord()).toBe('how');

    word2.setEndTick(1920);
    word2.setStartTick(1680);
    word2.setWord('new');

    expect(word2.getStartTick()).toBe(1680);
    expect(word2.getEndTick()).toBe(1920);
    expect(word2.getWord()).toBe('new');
  });

  it('Update start and end ticks, resort word and line order correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line1 = lyrics.createLine({
      startTick: 240,
    });
    const line2 = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line2.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    const word2 = line2.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });
    expect(word1.getStartTick()).toBe(480);
    expect(word1.getEndTick()).toBe(960);
    expect(word1.getWord()).toBe('hello');
    expect(word2.getStartTick()).toBe(1440);
    expect(word2.getEndTick()).toBe(1680);
    expect(word2.getWord()).toBe('how');
    expect(line1.getStartTick()).toBe(240);
    expect(line2.getStartTick()).toBe(480);
    expect(line2.getEndTick()).toBe(1680);
    expect(line2.getWords()[0]).toBe(word1);
    expect(line2.getWords()[1]).toBe(word2);
    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);

    word2.setStartTick(0);
    word2.setWord('new');

    expect(word2.getStartTick()).toBe(0);
    expect(word2.getEndTick()).toBe(1680);
    expect(word2.getWord()).toBe('new');
    expect(line1.getStartTick()).toBe(240);
    expect(line2.getStartTick()).toBe(0);
    expect(line2.getEndTick()).toBe(1680);
    expect(line2.getWords()[0]).toBe(word2);
    expect(line2.getWords()[1]).toBe(word1);
    expect(lyrics.getLines()[0]).toBe(line2);
    expect(lyrics.getLines()[1]).toBe(line1);
  });

  it('Check equality correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line2 = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line2.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    const word2 = line2.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });

    expect(word1.equals(word2)).toBeFalsy();

    word2.setStartTick(480);
    word2.setEndTick(960);
    word2.setWord('hello');

    expect(word1.equals(word2)).toBeTruthy();
  });
});

describe('LyricLine Tests', () => {
  it('Get fields correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    const word2 = line.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });

    expect(line.getStartTick()).toBe(480);
    expect(line.getEndTick()).toBe(1680);
    expect(line.getWords()[0]).toBe(word1);
    expect(line.getWords()[1]).toBe(word2);
  });

  it('Clear words correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });
    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });
    line.createWord({
      word: 'how',
      startTick: 1440,
      endTick: 1680,
    });

    expect(line.getStartTick()).toBe(480);
    expect(line.getEndTick()).toBe(1680);
    expect(line.getWords().length).toBe(2);
    expect(line.isEmpty()).toBe(false);
    expect(line.getWords()[0]).toBe(word1);

    line.clear();

    expect(line.isEmpty()).toBe(true);
    expect(line.getWords()[0]).not.toBe(word1);
  });

  it('Create word correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });

    expect(line.isEmpty()).toBe(true);

    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });

    expect(line.isEmpty()).toBe(false);
    expect(line.getWords()[0]).toBe(word1);
  });

  it('Delete word correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });

    expect(line.isEmpty()).toBe(true);

    const word1 = line.createWord({
      word: 'hello',
      startTick: 480,
      endTick: 960,
    });

    const word2 = line.createWord({
      word: 'hello2',
      startTick: 960,
      endTick: 1200,
    });

    const word3 = line.createWord({
      word: 'hello3',
      startTick: 1440,
      endTick: 1680,
    });

    expect(line.getWords().length).toBe(3);
    expect(line.getWords()[0]).toBe(word1);
    expect(line.getWords()[1]).toBe(word2);
    expect(line.getWords()[2]).toBe(word3);

    line.deleteWord(word2);

    expect(line.getWords().length).toBe(2);
    expect(line.getWords()[0]).toBe(word1);
    expect(line.getWords()[1]).toBe(word3);
  });

  it('Replace with string correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });

    expect(line.isEmpty()).toBe(true);

    await line.replaceWithString(
      "test一句话, english and chinese. Doesn't include punctuation into words",
    );

    assertWordsEqual(line.getWords(), [
      {
        word: 'test',
        startTick: 480,
        endTick: 501.82,
      },
      {
        word: '一',
        startTick: 501.82,
        endTick: 523.64,
      },
      {
        word: '句',
        startTick: 523.64,
        endTick: 545.45,
      },
      {
        word: '话',
        startTick: 545.45,
        endTick: 567.27,
      },
      {
        word: ',',
        startTick: 567.27,
        endTick: 589.09,
      },
      {
        word: ' ',
        startTick: 589.09,
        endTick: 610.91,
      },
      {
        word: 'english',
        startTick: 610.91,
        endTick: 632.73,
      },
      {
        word: ' ',
        startTick: 632.73,
        endTick: 654.55,
      },
      {
        word: 'and',
        startTick: 654.55,
        endTick: 676.36,
      },
      {
        word: ' ',
        startTick: 676.36,
        endTick: 698.18,
      },
      {
        word: 'chinese',
        startTick: 698.18,
        endTick: 720,
      },
      {
        word: '.',
        startTick: 720,
        endTick: 741.82,
      },
      {
        word: ' ',
        startTick: 741.82,
        endTick: 763.64,
      },
      {
        word: "Doesn't",
        startTick: 763.64,
        endTick: 785.45,
      },
      {
        word: ' ',
        startTick: 785.45,
        endTick: 807.27,
      },
      {
        word: 'include',
        startTick: 807.27,
        endTick: 829.09,
      },
      {
        word: ' ',
        startTick: 829.09,
        endTick: 850.91,
      },
      {
        word: 'punctuation',
        startTick: 850.91,
        endTick: 872.73,
      },
      {
        word: ' ',
        startTick: 872.73,
        endTick: 894.55,
      },
      {
        word: 'into',
        startTick: 894.55,
        endTick: 916.36,
      },
      {
        word: ' ',
        startTick: 916.36,
        endTick: 938.18,
      },
      {
        word: 'words',
        startTick: 938.18,
        endTick: 960,
      },
    ]);
  });

  it('Get sentence correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });

    line.createWord({
      word: 'check',
      startTick: 120,
      endTick: 360,
    });

    line.createWord({
      word: ' ',
      startTick: 240,
      endTick: 480,
    });

    line.createWord({
      word: '这个',
      startTick: 360,
      endTick: 640,
    });

    expect(line.getSentence()).toBe('check 这个');

    await line.replaceWithString('this is another 句子""');

    expect(line.getSentence()).toBe('this is another 句子""');
  });

  it('Clones lyric line correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });
    const line = lyrics.createLine({
      startTick: 480,
    });

    line.replaceWithString('sample sentence');

    const line2 = lyrics.cloneLine(line);
    expect(line2.getStartTick()).toBe(line.getStartTick());
    expect(line2.getEndTick()).toBe(line.getEndTick());
    expect(line2.getSentence()).toBe(line.getSentence());
  });
});

describe('Lyrics Tests', () => {
  it('Get lines correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = lyrics.createLine({ startTick: 480 });

    expect(lyrics.getLines().length).toBe(1);
    expect(lyrics.getLines()[0]).toBe(line1);
  });

  it('Get line at tick correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = lyrics.createLine({ startTick: 480 });
    const line2 = lyrics.createLine({ startTick: 19200 });

    expect(lyrics.getIndexOfLineAtTick(479)).toBe(-1);
    expect(lyrics.getIndexOfLineAtTick(480)).toBe(0);
    expect(lyrics.getIndexOfLineAtTick(line1.getEndTick())).toBe(0);
    expect(lyrics.getIndexOfLineAtTick(line1.getEndTick() + 1)).toBe(-1);
    expect(lyrics.getIndexOfLineAtTick(19199)).toBe(-1);
    expect(lyrics.getIndexOfLineAtTick(19200)).toBe(1);
    expect(lyrics.getIndexOfLineAtTick(line2.getEndTick())).toBe(1);
    expect(lyrics.getIndexOfLineAtTick(line2.getEndTick() + 1)).toBe(-1);
  });

  it('Create line from string correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = await lyrics.createLineFromString({
      input: 'sample sentence',
      startTick: 480,
      endTick: 1200,
    });

    assertWordsEqual(line1.getWords(), [
      {
        word: 'sample',
        startTick: 480,
        endTick: 720,
      },
      {
        word: ' ',
        startTick: 720,
        endTick: 960,
      },
      {
        word: 'sentence',
        startTick: 960,
        endTick: 1200,
      },
    ]);
  });

  it('Remove line correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = await lyrics.createLineFromString({
      input: 'sample sentence',
      startTick: 480,
      endTick: 1200,
    });

    const line2 = lyrics.createLine({
      startTick: 192000,
    });

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);

    lyrics.removeLineAtIndex(1);

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBeUndefined();
  });

  it('Move line keep line order correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = await lyrics.createLineFromString({
      input: 'sample sentence',
      startTick: 480,
      endTick: 1200,
    });

    const line2 = lyrics.createLine({
      startTick: 192000,
    });

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);

    line2.moveTo(1680, 1920);

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);
  });

  it('Move line change line order correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = await lyrics.createLineFromString({
      input: 'sample sentence',
      startTick: 480,
      endTick: 1200,
    });

    const line2 = lyrics.createLine({
      startTick: 192000,
    });

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);

    line2.moveTo(0, 1920);

    expect(lyrics.getLines()[0]).toBe(line2);
    expect(lyrics.getLines()[1]).toBe(line1);
  });

  it('Clone line correctly', async () => {
    const song = new Song();
    const lyrics = new Lyrics({ song });

    expect(lyrics.getLines().length).toBe(0);

    const line1 = await lyrics.createLineFromString({
      input: 'sample sentence',
      startTick: 480,
      endTick: 1200,
    });

    const line2 = lyrics.cloneLine(line1);

    expect(lyrics.getLines()[0]).toBe(line1);
    expect(lyrics.getLines()[1]).toBe(line2);
    expect(line2.getStartTick()).toBe(line1.getStartTick());
    expect(line2.getEndTick()).toBe(line1.getEndTick());
    expect(line2.getWords().length).toBe(line1.getWords().length);
    for (let i = 0; i < line2.getWords().length; i += 1) {
      const word2 = line2.getWords()[i];
      const word1 = line1.getWords()[i];
      expect(word1.equals(word2)).toBeTruthy();
    }
  });
});

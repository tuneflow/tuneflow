import { Song, TuneflowPlugin } from '../src';
import type { SongAccess } from '../src';

describe('Song-related Tests', () => {
  class TestUtilsPlugin extends TuneflowPlugin {
    songAccess(): SongAccess {
      return {
        createTrack: true,
        removeTrack: true,
      };
    }
  }

  const testUtilsPlugin = new TestUtilsPlugin();
  let song = new Song();

  beforeEach(() => {
    song = new Song();
    // @ts-ignore
    song.setPluginContextInternal(testUtilsPlugin);
    song.setResolution(480);
    song.createTempoChange({
      ticks: 0,
      bpm: 120,
    });
    song.createTempoChange({
      ticks: 1440,
      bpm: 60,
    });
    song.createTimeSignature({ ticks: 0, numerator: 4, denominator: 4 });
    song.createTimeSignature({ ticks: 2880, numerator: 7, denominator: 8 });
  });

  describe('Gets tempos correctly', () => {
    it('Gets tempo at tick correctly', async () => {
      expect(song.getTempoAtTick(0)).toBeTruthy();
      expect(song.getTempoAtTick(0)?.getTicks()).toBe(0);
      expect(song.getTempoAtTick(0)?.getBpm()).toBe(120);
      expect(song.getTempoAtTick(10)?.getTicks()).toBe(0);
      expect(song.getTempoAtTick(10)?.getBpm()).toBe(120);
      expect(song.getTempoAtTick(1439)?.getTicks()).toBe(0);
      expect(song.getTempoAtTick(1439)?.getBpm()).toBe(120);
      expect(song.getTempoAtTick(1440)?.getTicks()).toBe(1440);
      expect(song.getTempoAtTick(1440)?.getBpm()).toBe(60);
      expect(song.getTempoAtTick(1441)?.getTicks()).toBe(1440);
      expect(song.getTempoAtTick(1441)?.getBpm()).toBe(60);
    });
  });

  describe('Gets time signatures correctly', () => {
    it('Gets time signature at tick correctly', async () => {
      expect(song.getTimeSignatureAtTick(0)?.getTicks()).toBe(0);
      expect(song.getTimeSignatureAtTick(0)?.getNumerator()).toBe(4);
      expect(song.getTimeSignatureAtTick(0)?.getDenominator()).toBe(4);
      expect(song.getTimeSignatureAtTick(10)?.getTicks()).toBe(0);
      expect(song.getTimeSignatureAtTick(10)?.getNumerator()).toBe(4);
      expect(song.getTimeSignatureAtTick(10)?.getDenominator()).toBe(4);
      expect(song.getTimeSignatureAtTick(1440)?.getTicks()).toBe(0);
      expect(song.getTimeSignatureAtTick(1440)?.getNumerator()).toBe(4);
      expect(song.getTimeSignatureAtTick(1440)?.getDenominator()).toBe(4);
      expect(song.getTimeSignatureAtTick(2880)?.getTicks()).toBe(2880);
      expect(song.getTimeSignatureAtTick(2880)?.getNumerator()).toBe(7);
      expect(song.getTimeSignatureAtTick(2880)?.getDenominator()).toBe(8);
      expect(song.getTimeSignatureAtTick(2881)?.getTicks()).toBe(2880);
      expect(song.getTimeSignatureAtTick(2881)?.getNumerator()).toBe(7);
      expect(song.getTimeSignatureAtTick(2881)?.getDenominator()).toBe(8);
    });
  });
});

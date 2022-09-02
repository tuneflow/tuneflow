import { TrackType, TuneflowPipeline, Song, TuneflowPlugin } from '../src';
import type { SongAccess, ReadAPIs } from '../src';

const MOCK_READ_APIS: ReadAPIs = {
  readAudioBuffer: async () => null,
  translateLabel: (label: any) => label,
  serializeSong: async () => 'serializedSong',
  deserializeSong: async () => new Song(),
};

describe('Skeleton Tuneflow', () => {
  class TestUtilsPlugin extends TuneflowPlugin {
    songAccess(): SongAccess {
      return {
        createTrack: true,
        removeTrack: true,
      };
    }
  }

  class NoAccessCreateTrackPlugin extends TuneflowPlugin {
    static providerId(): string {
      return 'andantei';
    }

    static pluginId(): string {
      return 'test-skeleton';
    }

    static providerDisplayName(): string {
      return 'Andantei';
    }

    static pluginDisplayName(): string {
      return 'Test Skeleton';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async run(song: Song, inputs: any[]): Promise<void> {
      song.createTrack({ type: TrackType.MIDI_TRACK });
    }
  }

  class CreateTrackPlugin extends NoAccessCreateTrackPlugin {
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
  });

  it('finishes correctly', async () => {
    song.setResolution(480);
    song.createTempoChange({
      ticks: 0,
      bpm: 120,
    });
    const track = song.createTrack({ type: TrackType.MIDI_TRACK });
    const clip = track.createMIDIClip({
      clipStartTick: 0,
    });
    clip.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 0,
      endTick: 10,
    });
    const pipeline = new TuneflowPipeline();
    pipeline.setOriginalSong(song);
    // @ts-ignore
    pipeline.cloneSongFnInternal = (song: Song) => song;
    // @ts-ignore
    pipeline.readApisInternal = MOCK_READ_APIS;
    pipeline.addAsOrReplaceActivePlugin(new CreateTrackPlugin());
    expect(song.getTracks().length).toBe(1);
    await pipeline.run();
    expect(song.getTracks().length).toBe(2);
  });

  describe('Song Access', () => {
    beforeEach(() => {
      song = new Song();
    });

    it('throws error if calling restricted methods on song without setting plugin context.', async () => {
      expect(() => {
        song.createTrack({ type: TrackType.MIDI_TRACK });
      }).toThrow();
    });

    it('throws error if plugin calls restricted methods without getting access.', async () => {
      const pipeline = new TuneflowPipeline();
      pipeline.addAsOrReplaceActivePlugin(new NoAccessCreateTrackPlugin());
      expect(song.getTracks().length).toBe(0);
      pipeline.setOriginalSong(song);
      // @ts-ignore
      pipeline.cloneSongFnInternal = (song: Song) => song;
      // @ts-ignore
      pipeline.readApisInternal = MOCK_READ_APIS;
      expect(pipeline.run()).rejects.toBeTruthy();
      expect(song.getTracks().length).toBe(0);
    });
  });
});

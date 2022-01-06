import { TuneflowPipeline, Song, TuneflowPlugin } from '../src';

describe('Skeleton Tuneflow', () => {
  class SkeletonPlugin extends TuneflowPlugin {
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
    async run(song: Song, inputs: any[]): Promise<{ [artifactId: string]: any } | void> {
      song.createTrack();
    }
  }

  it('finishes correctly', async () => {
    const song = new Song();
    song.createTempoChange({
      ticks: 0,
      bpm: 120,
    });
    song.setResolution(480);
    const track = song.createTrack();
    track.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 0,
      endTick: 10,
    });
    const pipeline = new TuneflowPipeline();
    pipeline.addPluginAt(new SkeletonPlugin(), 0);
    expect(song.getTracks().length).toBe(1);
    await pipeline.run(song);
    expect(song.getTracks().length).toBe(2);
  });
});

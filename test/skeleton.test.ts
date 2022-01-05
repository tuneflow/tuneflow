import { Pipeline, Song, BasePlugin } from '../src';

describe('Skeleton Tuneflow', () => {
  class SkeletonPlugin extends BasePlugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async run(song: Song, inputs: any[]): Promise<{ [artifactId: string]: any } | void> {
      song.createTrack();
    }
  }

  it('finishes correctly', async () => {
    const song = new Song();
    const track = song.createTrack();
    track.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 0,
      startTime: 0.0,
      endTick: 10,
      endTime: 1.0,
    });
    const pipeline = new Pipeline();
    pipeline.addPluginAt(new SkeletonPlugin(), 0);
    expect(song.getTracks().length).toBe(1);
    await pipeline.run(song);
    expect(song.getTracks().length).toBe(2);
  });
});

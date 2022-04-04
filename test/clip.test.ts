import { Song, TuneflowPlugin } from '../src';
import type { SongAccess } from '../src';
import { assertClipRange, assertNotesAreEqual, createTestNotes } from '../src/test_utils';

describe('Clip-related Tests', () => {
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
    song.createTempoChange({
      ticks: 0,
      bpm: 120,
    });
    song.setResolution(480);
    const track = song.createTrack({});
    const clip1 = track.createClip({
      clipStartTick: 0,
    });
    clip1.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 0,
      endTick: 10,
    });
    clip1.createNote({
      pitch: 66,
      velocity: 80,
      startTick: 15,
      endTick: 20,
    });
    clip1.createNote({
      pitch: 68,
      velocity: 80,
      startTick: 15,
      endTick: 20,
    });
    clip1.adjustClipRange(0, 15);
    const clip2 = track.createClip({
      clipStartTick: 21,
    });
    clip2.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 21,
      endTick: 30,
    });
    clip2.createNote({
      pitch: 66,
      velocity: 80,
      startTick: 25,
      endTick: 30,
    });
    clip2.createNote({
      pitch: 68,
      velocity: 80,
      startTick: 25,
      endTick: 35,
    });
    clip2.adjustClipRange(21, 30);
    const clip3 = track.createClip({
      clipStartTick: 40,
    });
    clip3.createNote({
      pitch: 67,
      velocity: 80,
      startTick: 40,
      endTick: 45,
    });
    clip3.createNote({
      pitch: 69,
      velocity: 80,
      startTick: 45,
      endTick: 50,
    });
    clip3.createNote({
      pitch: 71,
      velocity: 80,
      startTick: 55,
      endTick: 65,
    });
    clip3.adjustClipRange(40, 65);
  });

  describe('Basic operations', () => {
    it('Gets clip ranges correctly.', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      expect(clip1.getClipStartTick()).toBe(0);
      expect(clip1.getClipEndTick()).toBe(15);
    });

    it("Gets notes within the clip's range correctly.", async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      const clip2 = track.getClips()[1];
      const clip3 = track.getClips()[2];
      assertNotesAreEqual(
        clip1.getNotes(),
        createTestNotes([
          {
            pitch: 64,
            velocity: 80,
            startTick: 0,
            endTick: 10,
          },
        ]),
      );
      assertNotesAreEqual(
        clip2.getNotes(),
        createTestNotes([
          {
            pitch: 64,
            velocity: 80,
            startTick: 21,
            endTick: 30,
          },
          {
            pitch: 66,
            velocity: 80,
            startTick: 25,
            endTick: 30,
          },
        ]),
      );
      assertNotesAreEqual(
        clip3.getNotes(),
        createTestNotes([
          {
            pitch: 67,
            velocity: 80,
            startTick: 40,
            endTick: 45,
          },
          {
            pitch: 69,
            velocity: 80,
            startTick: 45,
            endTick: 50,
          },
          {
            pitch: 71,
            velocity: 80,
            startTick: 55,
            endTick: 65,
          },
        ]),
      );
    });
  });

  describe('Move clips', () => {
    it('Moves clip - no overlapping', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.moveClipTo(70);
      assertClipRange(clip1, 70, 85);
      assertClipRange(clip2, 21, 30);
      assertClipRange(clip3, 40, 65);
    });

    it('Moves clip - overlaps on the left side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.moveClipTo(10);
      assertClipRange(clip1, 10, 25);
      assertClipRange(clip2, 26, 30);
      assertClipRange(clip3, 40, 65);
    });

    it('Moves clip - overlaps on the right side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.moveClipTo(60);
      assertClipRange(clip1, 60, 75);
      assertClipRange(clip2, 21, 30);
      assertClipRange(clip3, 40, 59);
    });

    it('Moves clip - overlaps on the left and the right side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.moveClipTo(28);
      assertClipRange(clip1, 28, 43);
      assertClipRange(clip2, 21, 27);
      assertClipRange(clip3, 44, 65);
    });
  });

  describe('Adjust clip ranges', () => {
    it('Adjusts clip left - no overlapping', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip3.adjustClipLeft(35);
      assertClipRange(clip1, 0, 15);
      assertClipRange(clip2, 21, 30);
      assertClipRange(clip3, 35, 65);
    });

    it('Adjusts clip left - overlaps on the right side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip3.adjustClipLeft(25);
      assertClipRange(clip1, 0, 15);
      assertClipRange(clip2, 21, 24);
      assertClipRange(clip3, 25, 65);
    });

    it('Adjusts clip left - overlaps on the whole clip and on the right', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip3.adjustClipLeft(10);
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      clip2 = track.getClips()[1];
      assertClipRange(clip1, 0, 9);
      assertClipRange(clip2, 10, 65);
    });

    it('Adjusts clip left - overlaps two whole clips', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip3.adjustClipLeft(-10);
      expect(track.getClips().length).toBe(1);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 65);
    });

    it('Adjusts clip right - no overlapping', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.adjustClipRight(18);
      assertClipRange(clip1, 0, 18);
      assertClipRange(clip2, 21, 30);
      assertClipRange(clip3, 40, 65);
    });

    it('Adjusts clip right - overlaps on the left side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.adjustClipRight(25);
      assertClipRange(clip1, 0, 25);
      assertClipRange(clip2, 26, 30);
      assertClipRange(clip3, 40, 65);
    });

    it('Adjusts clip right - overlaps on the whole clip and on the left', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.adjustClipRight(50);
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      clip2 = track.getClips()[1];
      assertClipRange(clip1, 0, 50);
      assertClipRange(clip2, 51, 65);
    });

    it('Adjusts clip right - overlaps two whole clips', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.adjustClipRight(1000);
      expect(track.getClips().length).toBe(1);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 1000);
    });

    it('Adjusts clip range - no overlapping', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(18, 35);
      assertClipRange(clip1, 0, 15);
      assertClipRange(clip2, 18, 35);
      assertClipRange(clip3, 40, 65);
    });

    it('Adjusts clip range - overlaps on the left side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(10, 35);
      assertClipRange(clip1, 0, 9);
      assertClipRange(clip2, 10, 35);
      assertClipRange(clip3, 40, 65);
    });

    it('Adjusts clip range - overlaps on the whole clip to the left', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(0, 35);
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      clip2 = track.getClips()[1];
      assertClipRange(clip1, 0, 35);
      assertClipRange(clip2, 40, 65);
    });

    it('Adjusts clip range - overlaps on the right side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(21, 45);
      assertClipRange(clip1, 0, 15);
      assertClipRange(clip2, 21, 45);
      assertClipRange(clip3, 46, 65);
    });

    it('Adjusts clip range - overlaps on the whole clip to the right', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(21, 1000);
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      clip2 = track.getClips()[1];
      assertClipRange(clip1, 0, 15);
      assertClipRange(clip2, 21, 1000);
    });

    it('Adjusts clip range - overlaps on the left and the right side', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(10, 45);
      assertClipRange(clip1, 0, 9);
      assertClipRange(clip2, 10, 45);
      assertClipRange(clip3, 46, 65);
    });

    it('Adjusts clip range - overlaps two whole clips', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.adjustClipRange(0, 1000);
      expect(track.getClips().length).toBe(1);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 1000);
    });
  });

  describe('Insert clip', () => {
    it('Insert clip - no overlapping', async () => {
      const track = song.getTracks()[0];
      track.createClip({
        clipStartTick: 32,
        clipEndTick: 38,
      });
      expect(track.getClips().length).toBe(4);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 32, 38);
      const clip4 = track.getClips()[3];
      assertClipRange(clip4, 40, 65);
    });

    it('Insert clip - overlaps with left and right', async () => {
      const track = song.getTracks()[0];
      track.createClip({
        clipStartTick: 25,
        clipEndTick: 45,
      });
      expect(track.getClips().length).toBe(4);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 24);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 25, 45);
      const clip4 = track.getClips()[3];
      assertClipRange(clip4, 46, 65);
    });

    it('Insert clip - overlaps with whole clips', async () => {
      const track = song.getTracks()[0];
      track.createClip({
        clipStartTick: 21,
        clipEndTick: 65,
      });
      expect(track.getClips().length).toBe(2);
      const clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      const clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 65);
    });
  });

  describe('Delete clip', () => {
    it('Delete first clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip1.deleteFromParent();
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 21, 30);
      clip2 = track.getClips()[1];
      assertClipRange(clip2, 40, 65);
    });

    it('Delete middle clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip2.deleteFromParent();
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      clip2 = track.getClips()[1];
      assertClipRange(clip2, 40, 65);
    });

    it('Delete last clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(3);
      let clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      let clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
      const clip3 = track.getClips()[2];
      assertClipRange(clip3, 40, 65);
      clip3.deleteFromParent();
      expect(track.getClips().length).toBe(2);
      clip1 = track.getClips()[0];
      assertClipRange(clip1, 0, 15);
      clip2 = track.getClips()[1];
      assertClipRange(clip2, 21, 30);
    });
  });
});

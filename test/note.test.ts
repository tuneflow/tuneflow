import { Song, TrackType, TuneflowPlugin } from '../src';
import type { SongAccess } from '../src';
import { assertNotesAreEqual, createTestNotes } from '../src/test_utils';

describe('Note-related Tests', () => {
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
    const track = song.createTrack({ type: TrackType.MIDI_TRACK });
    const clip1 = track.createMIDIClip({
      clipStartTick: 0,
    });
    clip1.createNote({
      pitch: 68,
      velocity: 80,
      startTick: 14,
      endTick: 20,
    });
    clip1.createNote({
      pitch: 66,
      velocity: 80,
      startTick: 15,
      endTick: 20,
    });
    clip1.createNote({
      pitch: 64,
      velocity: 80,
      startTick: 0,
      endTick: 10,
    });

    clip1.adjustClipLeft(5);
    clip1.adjustClipRight(15);
  });

  describe('Basic operations', () => {
    it('Gets data correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );

      assertNotesAreEqual(
        clip1.getNotes(),
        createTestNotes(
          [
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Sets velocity correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      const note1 = clip1.getRawNotes()[0];
      note1.setVelocity(99);
      assertNotesAreEqual(
        [clip1.getRawNotes()[0]],
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 99,
              startTick: 0,
              endTick: 10,
            },
          ],
          clip1,
        ),
      );
    });
  });

  describe('Adjust pitch', () => {
    it('Rejects if setting invalid pitches', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note1 = clip1.getRawNotes()[0];
      expect(() => {
        note1.setPitch(128);
      }).toThrow();
      expect(() => {
        note1.setPitch(-1);
      }).toThrow();
    });

    it('Deletes note if adjusting the note to an invalid pitch.', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note1 = clip1.getRawNotes()[0];
      note1.adjustPitch(999);
      expect(clip1.getRawNotes().length).toBe(2);
      // Check if the note is deleted from the clip.
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Adjusts pitch within valid range correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note1 = clip1.getRawNotes()[0];
      note1.adjustPitch(-9);
      expect(clip1.getRawNotes().length).toBe(3);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64 - 9,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
      note1.adjustPitch(10);
      expect(clip1.getRawNotes().length).toBe(3);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64 - 9 + 10,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });
  });

  describe('Delete from parent', () => {
    it('Deletes the note correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);

      const note2 = clip1.getRawNotes()[1];
      note2.deleteFromParent();
      expect(clip1.getRawNotes().length).toBe(2);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
      expect(clip1.getNotes().length).toBe(0);
    });
  });

  describe('Move note', () => {
    it('Moves the note if the note is not in any clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note2 = clip1.getRawNotes()[1];
      note2.deleteFromParent();

      expect(note2.getClip()).toBeFalsy();
      note2.moveNote(100);
      expect(note2.getStartTick()).toBe(114);
      expect(note2.getEndTick()).toBe(120);
    });

    it('Deletes the note if moved to the left of 0', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);

      const note2 = clip1.getRawNotes()[1];
      note2.moveNote(-9999);

      expect(note2.getEndTick()).toBeLessThan(0);

      // Verify the the note is deleted.
      expect(clip1.getRawNotes().length).toBe(2);
      expect(clip1.getNotes().length).toBe(0);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Do not delete the note if moved to the left of the clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);
      expect(clip1.getClipStartTick()).toBe(5);

      const note2 = clip1.getRawNotes()[1];
      note2.moveNote(-16);

      // Verify the range of the note.
      expect(note2.getStartTick()).toBe(0);
      expect(note2.getEndTick()).toBe(4);

      // Verify the note is not deleted and is not included in the clip's range.
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(0);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 68,
              velocity: 80,
              startTick: 0,
              endTick: 4,
            },
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Do not delete the note if moved to the right of the clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);
      expect(clip1.getClipStartTick()).toBe(5);
      expect(clip1.getClipEndTick()).toBe(15);

      const note2 = clip1.getRawNotes()[1];
      expect(note2.getStartTick()).toBe(14);
      note2.moveNote(2);

      // Verify the range of the note.
      expect(note2.getStartTick()).toBe(16);
      expect(note2.getEndTick()).toBe(22);

      // Verify the the note is not deleted and that it is not
      // included in the clip's range.
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(0);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 16,
              endTick: 22,
            },
          ],
          clip1,
        ),
      );
    });

    it('Moves the note and changes the order of notes correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getClipStartTick()).toBe(5);
      expect(clip1.getClipEndTick()).toBe(15);

      const note3 = clip1.getRawNotes()[2];
      expect(note3.getStartTick()).toBe(15);
      expect(note3.getEndTick()).toBe(20);
      note3.moveNote(-2);

      // Verify the range of the note.
      expect(note3.getStartTick()).toBe(13);
      expect(note3.getEndTick()).toBe(18);

      // Verify the changed notes.
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(2);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 13,
              endTick: 18,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
      assertNotesAreEqual(
        clip1.getNotes(),
        createTestNotes(
          [
            {
              pitch: 66,
              velocity: 80,
              startTick: 13,
              endTick: 18,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Sets note start tick to 0 if moved cross 0', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getClipStartTick()).toBe(5);
      expect(clip1.getClipEndTick()).toBe(15);

      const note3 = clip1.getRawNotes()[2];
      expect(note3.getStartTick()).toBe(15);
      expect(note3.getEndTick()).toBe(20);
      note3.moveNote(-20);

      // Verify the range of the note.
      expect(note3.getStartTick()).toBe(0);
      expect(note3.getEndTick()).toBe(0);

      // Verify the changed notes.
      expect(clip1.getRawNotes().length).toBe(3);
      expect(clip1.getNotes().length).toBe(1);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 66,
              velocity: 80,
              startTick: 0,
              endTick: 0,
            },
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
      assertNotesAreEqual(
        clip1.getNotes(),
        createTestNotes(
          [
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });
  });

  describe('Trim note', () => {
    it('Trims the note if the note is not in any clip', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note2 = clip1.getRawNotes()[1];
      note2.deleteFromParent();

      expect(note2.getClip()).toBeFalsy();
      note2.adjustLeftTo(10);
      note2.adjustRightTo(100);
      expect(note2.getStartTick()).toBe(10);
      expect(note2.getEndTick()).toBe(100);
    });

    it('Deletes the note if the note is trimmed to be invalid.', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note2 = clip1.getRawNotes()[1];

      expect(note2.getClip()).toBeTruthy();
      note2.adjustRightTo(1);
      expect(note2.getStartTick()).toBe(14);
      expect(note2.getEndTick()).toBe(1);
      expect(note2.getClip()).toBeFalsy();
      // Verify clip notes.
      expect(clip1.getRawNotes().length).toBe(2);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });

    it('Adjusts left and re-order notes correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note2 = clip1.getRawNotes()[1];

      expect(note2.getClip()).toBeTruthy();
      note2.adjustLeftTo(16);
      expect(note2.getStartTick()).toBe(16);
      expect(note2.getEndTick()).toBe(20);
      expect(note2.getClip()).toBeTruthy();
      // Verify clip notes.
      expect(clip1.getRawNotes().length).toBe(3);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 16,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });
    it('Adjusts right correctly', async () => {
      const track = song.getTracks()[0];
      expect(track.getClips().length).toBe(1);
      const clip1 = track.getClips()[0];
      expect(clip1).toBeTruthy();
      expect(clip1.getRawNotes().length).toBe(3);

      const note2 = clip1.getRawNotes()[1];

      expect(note2.getClip()).toBeTruthy();
      note2.adjustRightTo(16);
      expect(note2.getStartTick()).toBe(14);
      expect(note2.getEndTick()).toBe(16);
      expect(note2.getClip()).toBeTruthy();
      // Verify clip notes.
      expect(clip1.getRawNotes().length).toBe(3);
      assertNotesAreEqual(
        clip1.getRawNotes(),
        createTestNotes(
          [
            {
              pitch: 64,
              velocity: 80,
              startTick: 0,
              endTick: 10,
            },
            {
              pitch: 68,
              velocity: 80,
              startTick: 14,
              endTick: 16,
            },
            {
              pitch: 66,
              velocity: 80,
              startTick: 15,
              endTick: 20,
            },
          ],
          clip1,
        ),
      );
    });
  });
});

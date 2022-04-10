import { Note } from './models/song';
import type { Clip } from './models/song';

export function assertNotesAreEqual(notes1: Note[], notes2: Note[]) {
  if (notes1.length !== notes2.length) {
    throw new Error(`Notes are not of equal length, ${notes1.length} vs ${notes2.length}`);
  }
  for (let i = 0; i < notes1.length; i += 1) {
    if (!notes1[i].equals(notes2[i])) {
      throw new Error(
        `${i}th notes of the two lists are not equal, ${JSON.stringify(notes1)} vs ${JSON.stringify(
          notes2,
        )}`,
      );
    }
  }
}

export function createTestNotes(noteSpecs: any[]) {
  return noteSpecs.map(item => new Note(item));
}

export function assertClipRange(clip: Clip, startTick: number, endTick: number) {
  expect(clip.getClipStartTick()).toBe(startTick);
  expect(clip.getClipEndTick()).toBe(endTick);
}

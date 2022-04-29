import { nanoid } from 'nanoid';
import { ge as greaterEqual, lt as lowerThan } from 'binary-search-bounds';
import type { Track } from './track';
import { Note } from './note';

/**
 * A clip is a piece in a track, and it contains notes and the clip range.
 * One track can contain one or many non-overlapping clips.
 */
export class Clip {
  /** If the clip is dettached from any track, this field is going to be undefined. */
  private track?: Track;
  private id: string;
  // Notes should be sorted all the time.
  private notes: Note[];
  /** Inclusive start tick. */
  private clipStartTick = 0;
  /** Inclusive end tick. */
  private clipEndTick = 0;
  private nextNoteIdInternal = 1;

  /**
   * IMPORTANT: Do not use the constructor directly, call createClip from tracks instead.
   */
  constructor({
    track = undefined,
    id = Clip.generateClipIdInternal(),
    clipStartTick = 0,
    clipEndTick = 0,
  }: {
    track?: Track;
    id?: string;
    clipStartTick?: number;
    clipEndTick?: number;
  }) {
    this.track = track;
    this.id = id;
    this.notes = [];
    this.clipStartTick = clipStartTick;
    this.clipEndTick = clipEndTick;
  }

  getId() {
    return this.id;
  }

  /**
   * @returns Notes within the clip's range.
   */
  getNotes() {
    return Clip.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
  }

  /**
   * @returns All notes contained by the clip, including those that
   * are not within the clip's range.
   */
  getRawNotes() {
    return this.notes;
  }

  getClipStartTick() {
    return this.clipStartTick;
  }

  getClipEndTick() {
    return this.clipEndTick;
  }

  getTrack() {
    return this.track;
  }

  /**
   * Adds a note to the clip and returns it.
   */
  createNote({
    pitch,
    velocity,
    startTick,
    endTick,
    updateClipRange = true,
    resolveClipConflict = true,
  }: {
    /** An integer value between 0 - 127 */
    pitch: number;
    /** An integer value between 0 - 127 */
    velocity: number;
    /** An integer value indicating the start tick. */
    startTick: number;
    /** An integer value indicating the end tick. */
    endTick: number;
    /** Whether to update the clip's range if the note stretches outside the clip. */
    updateClipRange?: boolean;
    /** Whether to resolve clip conflict if the clip range is updated. */
    resolveClipConflict?: boolean;
  }) {
    if (
      !Note.isValidPitch(pitch) ||
      !Note.isNoteRangeValid(startTick, endTick) ||
      !Note.isNoteVelocityValid(velocity)
    ) {
      return null;
    }

    const note = new Note({
      pitch,
      velocity,
      startTick,
      endTick,
      id: this.getNextNoteIdInternal(),
    });
    if (startTick < this.clipStartTick && updateClipRange) {
      this.adjustClipLeft(startTick, resolveClipConflict);
    }
    if (endTick > this.clipEndTick && updateClipRange) {
      this.adjustClipRight(endTick, resolveClipConflict);
    }
    this.orderedInsertNote(this.notes, note);
    return note;
  }

  private getNoteIndexInternal(note: Note) {
    const startIndex = lowerThan(
      this.notes,
      note,
      (a: Note, b: Note) => a.getStartTick() - b.getStartTick(),
    );

    for (let index = Math.max(0, startIndex); index < this.notes.length; index += 1) {
      const currentNote = this.notes[index];
      if (currentNote && currentNote === note) {
        return index;
      }
      if (currentNote && currentNote.getStartTick() > note.getStartTick()) {
        // We have searched past all possible notes.
        break;
      }
    }
    return -1;
  }

  deleteNote(note: Note) {
    const noteIndex = this.getNoteIndexInternal(note);
    if (noteIndex >= 0) {
      this.deleteNoteAt(noteIndex);
    }
  }

  deleteNoteAt(index: number) {
    const note = this.notes[index];
    if (note) {
      // @ts-ignore
      note.clipInternal = null;
      this.notes.splice(index, 1);
    }
  }

  private orderedInsertNote(noteList: Note[], newNote: Note) {
    if (newNote.getClip() === this) {
      // Do not insert if the note is already in the list.
      return;
    }
    const insertIndex = greaterEqual(
      noteList,
      newNote,
      (a: Note, b: Note) => a.getStartTick() - b.getStartTick(),
    );
    if (insertIndex < 0) {
      noteList.push(newNote);
    } else {
      noteList.splice(insertIndex, 0, newNote);
    }
    // @ts-ignore.
    newNote.clipInternal = this;
  }

  /**
   * Adjust the left boundary of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call.
   * @param clipStartTick The new start tick (inclusive) of the clip.
   */
  adjustClipLeft(clipStartTick: number, resolveConflict = true) {
    clipStartTick = Math.max(0, clipStartTick);
    if (clipStartTick > this.clipEndTick) {
      this.deleteFromParent();
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict && this.track) {
        // @ts-ignore
        this.track.resolveClipConflictInternal(
          this.getId(),
          Math.min(this.clipStartTick, clipStartTick),
          this.clipEndTick,
        );
      }
      this.clipStartTick = clipStartTick;
    }
  }

  /**
   * Adjust the right boundary of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call.
   *
   * @param clipEndTick  The new end tick (inclusive) of the clip.
   */
  adjustClipRight(clipEndTick: number, resolveConflict = true) {
    if (clipEndTick < this.clipStartTick || clipEndTick < 0) {
      this.deleteFromParent();
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict && this.track) {
        // @ts-ignore
        this.track.resolveClipConflictInternal(
          this.getId(),
          this.clipStartTick,
          Math.max(this.clipEndTick, clipEndTick),
        );
      }
      this.clipEndTick = clipEndTick;
    }
  }

  /**
   * Move the clip by the given offset ticks.
   *
   * NOTE: Moving a clip can break the order of clips,
   * so the clip must be re-positioned to the correct index.
   * @param offsetTick
   */
  moveClip(offsetTick: number) {
    const newClipStartTick = Math.max(0, this.clipStartTick + offsetTick);
    const newClipEndTick = this.clipEndTick + offsetTick;
    if (newClipEndTick < 0) {
      this.deleteFromParent();
      return;
    }
    if (this.track) {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      // @ts-ignore
      this.track.resolveClipConflictInternal(this.getId(), newClipStartTick, newClipEndTick);
    }

    // The track's clip order will be invalidated after the move, and deleting the clip
    // requires the clips to be sorted, so delete the clip before the move happens.
    if (this.track) {
      const clipIndex = this.track.getClipIndex(this);
      this.track.deleteClipAt(clipIndex);
    }

    // Move the clip.
    this.clipStartTick = newClipStartTick;
    this.clipEndTick = newClipEndTick;
    for (const note of this.notes) {
      note.setStartTick(note.getStartTick() + offsetTick);
      note.setEndTick(note.getEndTick() + offsetTick);
    }

    if (this.track) {
      // Ordered insert back the clip.
      // @ts-ignore
      this.track.orderedInsertClipInternal(this);
    }
  }

  /**
   * Move the clip to a given tick.
   * @param tick The tick that this clip will start at.
   */
  moveClipTo(tick: number) {
    const offsetTick = tick - this.getClipStartTick();
    this.moveClip(offsetTick);
  }

  deleteFromParent() {
    if (this.track) {
      this.track.deleteClip(this);
      this.track = undefined;
    }
  }

  getNotesByIds(noteIds: number[]) {
    const noteIdSet = new Set<number>(noteIds);
    const notes = [];
    for (const note of this.notes) {
      if (noteIdSet.has(note.getId())) {
        notes.push(note);
      }
    }
    return notes;
  }

  static getNotesInRange(rawNotes: Note[], startTick: number, endTick: number) {
    const startIndex = lowerThan(
      rawNotes,
      { getStartTick: () => startTick } as any,
      (a: Note, b: Note) => a.getStartTick() - b.getStartTick(),
    );
    const inRangeNotes: Note[] = [];
    for (let i = Math.max(startIndex, 0); i < rawNotes.length; i += 1) {
      const note = rawNotes[i];
      if (note.getStartTick() > endTick) {
        break;
      }
      if (!Clip.isNoteInClip(note.getStartTick(), note.getEndTick(), startTick, endTick)) {
        // Note is not fully within this range.
        continue;
      }
      inRangeNotes.push(note);
    }
    return inRangeNotes;
  }

  /**
   * Note is in the clip when:
   * * The note starts at or after the clip start.
   * * The note has overlapping part with the clip.
   * @param noteStartTick
   * @param noteEndTick
   * @param clipStartTick
   * @param clipEndTick
   * @returns
   */
  static isNoteInClip(
    noteStartTick: number,
    noteEndTick: number,
    clipStartTick: number,
    clipEndTick: number,
  ) {
    return (
      // If the clip starts at 0, notes that start before 0 will start at 0.
      (noteStartTick >= clipStartTick || (clipStartTick === 0 && noteStartTick <= 0)) &&
      noteStartTick <= clipEndTick &&
      noteEndTick >= noteStartTick
    );
  }

  /**
   * Some notes might not be fully within the clip, this returns the range of the note
   * that is within the clip's range.
   * @param noteStartTick
   * @param noteEndTick
   * @param clipStartTick
   * @param clipEndTick
   * @returns Returns the start and end tick if the note is in the clip and there's overlap, otherwise null.
   */
  static getNotePlayableRange(
    noteStartTick: number,
    noteEndTick: number,
    clipStartTick: number,
    clipEndTick: number,
  ) {
    if (!Clip.isNoteInClip(noteStartTick, noteEndTick, clipStartTick, clipEndTick)) {
      return null;
    }
    const overlappingStartTick = Math.max(noteStartTick, clipStartTick);
    const overlappingEndTick = Math.min(noteEndTick, clipEndTick);
    if (overlappingStartTick > overlappingEndTick) {
      return null;
    }
    return {
      startTick: overlappingStartTick,
      endTick: overlappingEndTick,
    };
  }

  /**
   * Trim the conflict part from the clip.
   * Anything within the given range (inclusive), will be removed from the current clip.
   * @param startTick
   * @param endTick
   */
  private trimConflictPartInternal(startTick: number, endTick: number) {
    const overlappingStartTick = Math.max(startTick, this.getClipStartTick());
    const overlappingEndTick = Math.min(endTick, this.getClipEndTick());
    if (overlappingStartTick > overlappingEndTick) {
      // Overlapping range is empty.
      return;
    }
    if (
      overlappingStartTick > this.getClipEndTick() ||
      overlappingEndTick < this.getClipStartTick()
    ) {
      // No overlapping.
      return;
    }
    if (
      overlappingEndTick >= this.getClipEndTick() &&
      overlappingStartTick <= this.getClipStartTick()
    ) {
      // The whole clip overlaps with the given range.
      // Delete the clip.
      this.deleteFromParent();
      return;
    }
    if (
      overlappingEndTick < this.getClipEndTick() &&
      overlappingStartTick > this.getClipStartTick()
    ) {
      // Overlapping part is in the middle of the clip.
      // Trim the clip into the left part and create a new clip for the right part.
      const rightClipStartTick = overlappingEndTick + 1;
      const rightClipEndTick = this.getClipEndTick();

      this.adjustClipRight(overlappingStartTick - 1, /* resolveConflict= */ false);

      if (this.track) {
        const rightClip = this.track.createClip({
          clipStartTick: rightClipStartTick,
          clipEndTick: rightClipEndTick,
        });
        const rightNotes = Clip.getNotesInRange(this.notes, rightClipStartTick, rightClipEndTick);
        for (const rightNote of rightNotes) {
          rightClip.createNote({
            pitch: rightNote.getPitch(),
            velocity: rightNote.getVelocity(),
            startTick: rightNote.getStartTick(),
            endTick: rightNote.getEndTick(),
            updateClipRange: false,
            resolveClipConflict: false,
          });
        }
      }

      return;
    }
    // Overlapping part is on the side.
    if (
      overlappingStartTick > this.getClipStartTick() &&
      overlappingStartTick <= this.getClipEndTick()
    ) {
      // Do not resolve conflict here since it will
      // cause a bad loop.
      this.adjustClipRight(overlappingStartTick - 1, /* resolveConflict= */ false);
    } else if (
      overlappingEndTick < this.getClipEndTick() &&
      overlappingEndTick >= this.getClipStartTick()
    ) {
      // Do not resolve conflict here since it will
      // cause a bad loop.
      this.adjustClipLeft(overlappingEndTick + 1, /* resolveConflict= */ false);
    }
  }

  private getNextNoteIdInternal() {
    const noteId = this.nextNoteIdInternal;
    if (this.nextNoteIdInternal >= /* 2^31 -1 */ 2147483647) {
      this.nextNoteIdInternal = 1;
    } else {
      this.nextNoteIdInternal += 1;
    }

    return noteId;
  }

  private static generateClipIdInternal() {
    return nanoid(10);
  }
}

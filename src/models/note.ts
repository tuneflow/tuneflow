import type { Clip } from './clip';

/**
 * Information about how a note should be played.
 */
export class Note {
  private pitch: number;
  private velocity: number;
  private startTick: number;
  private endTick: number;
  private idInternal: number;
  private clipInternal?: Clip;

  /**
   * IMPORTANT: Do not use the constructor directly, call
   * createNote from clips instead.
   */
  constructor({
    pitch,
    velocity,
    startTick,
    endTick,
    id,
    clip,
  }: {
    pitch: number;
    velocity: number;
    startTick: number;
    endTick: number;
    id: number;
    /** If left empty, all clip-related methods will be no-op. */
    clip?: Clip;
  }) {
    this.pitch = pitch;
    this.velocity = velocity;
    this.startTick = startTick;
    this.endTick = endTick;
    this.idInternal = id;
    this.clipInternal = clip;
  }

  getPitch() {
    return this.pitch;
  }

  setPitch(newPitch: number) {
    if (!Note.isValidPitch(newPitch)) {
      throw new Error(`Invalid pitch ${newPitch}`);
    }
    this.pitch = newPitch;
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(newVelocity: number) {
    this.velocity = Math.max(Math.min(newVelocity, 127), 0);
  }

  getStartTick() {
    return this.startTick;
  }

  getEndTick() {
    return this.endTick;
  }

  setStartTick(startTick: number) {
    this.startTick = startTick;
  }

  setEndTick(endTick: number) {
    this.endTick = endTick;
  }

  /**
   * Returns true if the notes should sound the same.
   *
   * NOTE: This does not check note Ids or the clips they belong to.
   */
  equals(note: Note) {
    return (
      this.startTick === note.getStartTick() &&
      this.endTick === note.getEndTick() &&
      this.pitch === note.getPitch() &&
      this.velocity === note.getVelocity()
    );
  }

  deleteFromParent() {
    if (!this.clipInternal) {
      return;
    }
    this.clipInternal.deleteNote(this);
  }

  moveNote(offsetTick: number) {
    if (offsetTick === 0) {
      return;
    }
    const clip = this.clipInternal;
    if (clip) {
      clip.deleteNote(this);
    }
    this.startTick = Math.max(0, this.startTick + offsetTick);
    this.endTick = this.endTick + offsetTick;
    if (!this.isRangeValid()) {
      // Note is out of valid range, delete it
      // by not inserting it back.
      return;
    }
    if (clip) {
      // @ts-ignore
      clip.orderedInsertNote(clip.getRawNotes(), this);
    }
  }

  /**
   * Adjusts the start tick of the note by an offset.
   */
  adjustLeft(offsetTick: number) {
    if (offsetTick === 0) {
      return;
    }
    const clip = this.clipInternal;
    if (clip) {
      clip.deleteNote(this);
    }
    this.startTick += offsetTick;
    if (!this.isRangeValid()) {
      // Note is out of valid range, delete it
      // by not inserting it back.
      return;
    }
    if (clip) {
      // @ts-ignore
      clip.orderedInsertNote(clip.getRawNotes(), this);
    }
  }

  /**
   * Adjusts the start tick of the note to a given tick.
   */
  adjustLeftTo(tick: number) {
    this.adjustLeft(tick - this.startTick);
  }

  /**
   * Adjusts the end tick of the note by an offset.
   */
  adjustRight(offsetTick: number) {
    this.endTick += offsetTick;
    if (!this.isRangeValid()) {
      this.deleteFromParent();
    }
  }

  /**
   * Adjusts the end tick of the note to a given tick.
   */
  adjustRightTo(tick: number) {
    this.adjustRight(tick - this.endTick);
  }

  isRangeValid() {
    return Note.isNoteRangeValid(this.startTick, this.endTick);
  }

  static isValidPitch(pitch: number) {
    return pitch >= 0 && pitch <= 127 && Number.isInteger(pitch);
  }

  static isNoteRangeValid(startTick: number, endTick: number) {
    return (
      endTick >= 0 &&
      startTick <= endTick &&
      Number.isInteger(startTick) &&
      Number.isInteger(endTick)
    );
  }

  static isNoteVelocityValid(velocity: number) {
    return velocity >= 0 && velocity <= 127 && Number.isInteger(velocity);
  }

  getClip() {
    return this.clipInternal;
  }

  /**
   * Adjust the pitch of a note.
   * If the pitch of the note becomes invalid (less than 0 or greater than 127),
   * it will be deleted from the clip.
   */
  adjustPitch(pitchOffset: number) {
    this.pitch = this.pitch + pitchOffset;
    if (!Note.isValidPitch(this.pitch)) {
      this.deleteFromParent();
    }
  }

  getId() {
    return this.idInternal;
  }
}

/**
 * Information about how a note should be played.
 */
export class Note {
  private pitch: number;
  private velocity: number;
  private startTick: number;
  private endTick: number;
  private idInternal: number;

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
  }: {
    pitch: number;
    velocity: number;
    startTick: number;
    endTick: number;
    id: number;
  }) {
    this.pitch = pitch;
    this.velocity = velocity;
    this.startTick = startTick;
    this.endTick = endTick;
    this.idInternal = id;
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

  static isValidPitch(pitch: number) {
    return pitch >= 0 && pitch <= 127;
  }

  getVelocity() {
    return this.velocity;
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

  equals(note: Note) {
    return (
      this.startTick === note.getStartTick() &&
      this.endTick === note.getEndTick() &&
      this.pitch === note.getPitch() &&
      this.velocity === note.getVelocity()
    );
  }
}

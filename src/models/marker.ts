export enum StructureType {
  UNKNOWN = 0,
  INTRO = 1,
  VERSE = 2,
  CHORUS = 3,
  BRIDGE = 4,
  OUTRO = 5,
}

/**
 * Marker for a structure (Intro, Verse, Chorus, ...).
 */
export class StructureMarker {
  private tick: number;
  private type: StructureType;

  constructor({ tick, type }: { tick: number; type: number }) {
    this.tick = tick;
    this.type = type;
  }

  getTick() {
    return this.tick;
  }

  setTick(tick: number) {
    this.tick = tick;
  }

  getType() {
    return this.type;
  }

  setType(type: StructureType) {
    this.type = type;
  }
}

export enum StructureType {
  UNKNOWN = 0,
  INTRO = 1,
  VERSE = 2,
  CHORUS = 3,
  BRIDGE = 4,
  OUTRO = 5,
  PRE_CHORUS = 6,
  POST_CHORUS = 7,
  FILL = 8,
  CUSTOM = 9,
}

/**
 * Marker for a structure (Intro, Verse, Chorus, ...).
 */
export class StructureMarker {
  private tick: number;
  private type: StructureType;
  private customName?: string;

  constructor({ tick, type, customName }: { tick: number; type: number; customName?: string }) {
    this.tick = tick;
    this.type = type;
    if (type === StructureType.CUSTOM) {
      this.customName = customName;
    }
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

  getCustomName() {
    return this.customName;
  }

  setCustomName(customName?: string) {
    this.customName = customName;
  }
}

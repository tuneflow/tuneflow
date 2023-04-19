import _ from 'underscore';
import { isProxy, isRef, toRaw } from 'vue';
import type { TempoEvent } from './models/tempo';

function midiToPitchClass(midi: number): string {
  const scaleIndexToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = midi % 12;
  return scaleIndexToNote[note];
}

/**
 * Convert a midi note into a pitch
 */
export function midiNumberToPitch(midi: number): string {
  const octave = Math.floor(midi / 12) - 2;
  return midiToPitchClass(midi) + octave.toString();
}

const regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;

const noteToScaleIndex = {
  cbb: -2,
  cb: -1,
  c: 0,
  'c#': 1,
  cx: 2,
  dbb: 0,
  db: 1,
  d: 2,
  'd#': 3,
  dx: 4,
  ebb: 2,
  eb: 3,
  e: 4,
  'e#': 5,
  ex: 6,
  fbb: 3,
  fb: 4,
  f: 5,
  'f#': 6,
  fx: 7,
  gbb: 5,
  gb: 6,
  g: 7,
  'g#': 8,
  gx: 9,
  abb: 7,
  ab: 8,
  a: 9,
  'a#': 10,
  ax: 11,
  bbb: 9,
  bb: 10,
  b: 11,
  'b#': 12,
  bx: 13,
};

/**
 * Convert a pitch to a midi number
 */
export function pitchToMidiNumber(note: string): number {
  const split = regexp.exec(note);
  if (!split) {
    return -1;
  }
  const pitch = split[1];
  const octave = split[2];
  // @ts-ignore
  const index = noteToScaleIndex[pitch.toLowerCase()];
  return index + (parseInt(octave, 10) + 2) * 12;
}

/**
 * Gets an id that Tuneflow can uniquely identify a plugin.
 */
export function getAudioPluginTuneflowId(
  manufacturerName: string,
  pluginFormatName: string,
  pluginName: string,
  pluginVersion: string,
) {
  return `${manufacturerName} // ${pluginFormatName} // ${pluginName} // ${pluginVersion}`;
}

/**
 * Gets an id that Tuneflow can uniquely identify a plugin regardless of version.
 */
export function getAudioPluginVersionlessTuneflowId(
  manufacturerName: string,
  pluginFormatName: string,
  pluginName: string,
) {
  return `${manufacturerName} // ${pluginFormatName} // ${pluginName}`;
}

/**
 * Converts a full tfId to a versionless tfId.
 * @param tfId A full tfId
 * @returns A versionless tfId
 */
export function toVersionlessTfId(tfId: string) {
  const parts = decodeAudioPluginTuneflowId(tfId);
  return getAudioPluginVersionlessTuneflowId(
    parts.manufacturerName,
    parts.pluginFormatName,
    parts.name,
  );
}

export function decodeAudioPluginTuneflowId(tfId: string) {
  const parts = tfId.split(' // ');
  if (parts.length < 4) {
    throw new Error('Invalid audio plugin tuneflow id.');
  }
  return {
    name: parts[2],
    manufacturerName: parts[0],
    pluginFormatName: parts[1],
    pluginVersion: parts[3],
  };
}

export function areTuneflowIdsEqual(tfId1: string, tfId2: string) {
  return tfId1 === tfId2;
}

export function areTuneflowIdsEqualIgnoreVersion(tfId1: string, tfId2: string) {
  const parsedId1 = decodeAudioPluginTuneflowId(tfId1);
  const parsedId2 = decodeAudioPluginTuneflowId(tfId2);
  if (_.keys(parsedId1).length !== _.keys(parsedId2).length) {
    return false;
  }

  for (const key of _.keys(parsedId1)) {
    if (key === 'pluginVersion') {
      continue;
    }
    if ((parsedId1 as any)[key] !== (parsedId2 as any)[key]) {
      return false;
    }
  }
  return true;
}

interface TempoInfo {
  ticks: number;
  time: number;
}

/**
 * A helper class to be used when performing large number of tick to second
 * conversions incrementally.
 */
export class TickToSecondStepper {
  private tempoInfos: TempoInfo[] = [];
  private currentTempoIndex = 0;
  private ticksPerSecondAtTempoTick: { [tick: number]: number } = {};

  constructor(tempos: TempoEvent[], resolution: number) {
    // Do not directly use anything from the song as it might
    // be a ref and accessing a ref is much more time consuming.
    for (const tempo of tempos) {
      this.tempoInfos.push({
        ticks: tempo.getTicks(),
        time: tempo.getTime(),
      });
      this.ticksPerSecondAtTempoTick[tempo.getTicks()] = (tempo.getBpm() * resolution) / 60;
    }
  }

  secondsToTick(timeInSeconds: number) {
    let baseTempo = this.tempoInfos[this.currentTempoIndex];
    // Move to the closest tempo before or at the tick.
    while (
      this.tempoInfos[this.currentTempoIndex + 1] &&
      this.tempoInfos[this.currentTempoIndex + 1].time <= timeInSeconds
    ) {
      this.currentTempoIndex += 1;
      baseTempo = this.tempoInfos[this.currentTempoIndex];
    }
    // If the current tempo is later than the current tick, move back.
    while (baseTempo.time > timeInSeconds && this.currentTempoIndex > 0) {
      this.currentTempoIndex -= 1;
      baseTempo = this.tempoInfos[this.currentTempoIndex];
    }
    if (baseTempo.time > timeInSeconds) {
      console.warn(
        `Cannot find any tempo earlier than time ${timeInSeconds}, using the first tempo.`,
      );
      baseTempo = this.tempoInfos[0];
    }
    const timeDelta = timeInSeconds - baseTempo.time;
    const ticksPerSecondSinceLastTempoChange = this.ticksPerSecondAtTempoTick[baseTempo.ticks];
    return Math.round(baseTempo.ticks + timeDelta * ticksPerSecondSinceLastTempoChange);
  }

  tickToSeconds(ticks: number) {
    let baseTempo = this.tempoInfos[this.currentTempoIndex];
    // Move to the closest tempo before or at the tick.
    while (
      this.tempoInfos[this.currentTempoIndex + 1] &&
      this.tempoInfos[this.currentTempoIndex + 1].ticks <= ticks
    ) {
      this.currentTempoIndex += 1;
      baseTempo = this.tempoInfos[this.currentTempoIndex];
    }
    // If the current tempo is later than the current tick, move back.
    while (baseTempo.ticks > ticks && this.currentTempoIndex > 0) {
      this.currentTempoIndex -= 1;
      baseTempo = this.tempoInfos[this.currentTempoIndex];
    }
    if (baseTempo.ticks > ticks) {
      console.warn(`Cannot find any tempo earlier than tick ${ticks}, using the first tempo.`);
      baseTempo = this.tempoInfos[0];
    }
    const ticksDelta = ticks - baseTempo.ticks;
    const ticksPerSecondSinceLastTempoChange = this.ticksPerSecondAtTempoTick[baseTempo.ticks];
    return baseTempo.time + ticksDelta / ticksPerSecondSinceLastTempoChange;
  }
}

/** Maps a dB value to a volume value (0 - 1). */
export function dbToVolumeValue(db: number) {
  return db > -100 ? Math.exp((db - 6) * (1 / 20)) : 0;
}

/**
 *
 * @param gain A value between 0 - 2, corresponding to -inf to +6dB, gain == 1 equals dB == 0.0
 * @returns
 */
export function gainToDb(gain: number) {
  if (gain <= 0) {
    return -100;
  }
  return 20 * Math.log10(gain);
}

/**
 * @param volume A value between 0 - 1, corresponding to -inf to +6 dB.
 */
export function volumeValueToDb(volume: number) {
  return volume > 0 ? 20 * Math.log(volume) + 6 : -100.0;
}

/**
 *
 * @param volume A value between 0 - 1, corresponding to -inf to +6 dB.
 * @returns
 */
export function volumeValueToGain(volume: number) {
  return volume > 0 ? Math.pow(10, (20 * Math.log(volume) + 6) * (1 / 20)) : 0;
}

/**
 *
 * @param gain A value between 0 - 2, corresponding to -inf to +6dB, gain == 1 equals dB == 0.0
 * @returns
 */
export function gainToVolumeValue(gain: number) {
  return gain > 0 ? Math.exp((20 * Math.log10(gain) - 6) * (1 / 20)) : 0;
}

export function remapRange(
  value: number,
  originalStart: number,
  originalEnd: number,
  newStart: number,
  newEnd: number,
) {
  return ((value - originalStart) / (originalEnd - originalStart)) * (newEnd - newStart) + newStart;
}

/**
 *
 * @param pitch A number from 0 to 127.
 */
export function pitchToHz(pitch: number) {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}

export function maybeToRaw<T>(obj: T): T {
  return isProxy(obj) || isRef(obj) ? toRaw(obj) : obj;
}

export enum DrumPitch {
  BassDrum2 = 35,
  BassDrum1 = 36,
  SideStick = 37,
  SnareDrum1 = 38,
  HandClap = 39,
  SnareDrum2 = 40,
  LowTom2 = 41,
  ClosedHiHat = 42,
  LowTom1 = 43,
  PedalHiHat = 44,
  MidTom2 = 45,
  OpenHiHat = 46,
  MidTom1 = 47,
  HighTom2 = 48,
  CrashCymbal1 = 49,
  HighTom1 = 50,
  RideCymbal1 = 51,
  ChineseCymbal = 52,
  RideBell = 53,
  Tambourine = 54,
  SplashCymbal = 55,
  Cowbell = 56,
  CrashCymbal2 = 57,
  VibraSlap = 58,
  RideCymbal2 = 59,
  HighBongo = 60,
  LowBongo = 61,
  MuteHighConga = 62,
  OpenHighConga = 63,
  LowConga = 64,
  HighTimbale = 65,
  LowTimbale = 66,
  HighAgogo = 67,
  LowAgogo = 68,
  Cabasa = 69,
  Maracas = 70,
  ShortWhistle = 71,
  LongWhistle = 72,
  ShortGuiro = 73,
  LongGuiro = 74,
  Claves = 75,
  HighWoodBlock = 76,
  LowWoodBlock = 77,
  MuteCuica = 78,
  OpenCuica = 79,
  MuteTriangle = 80,
  OpenTriangle = 81,
  Shaker = 82,
}

export const SUPPORTED_AUDIO_FORMATS = ['wav', 'mp3', 'aiff', 'flac', 'ogg'];

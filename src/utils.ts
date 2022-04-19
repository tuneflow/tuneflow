import _ from 'underscore';

function midiToPitchClass(midi: number): string {
  const scaleIndexToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = midi % 12;
  return scaleIndexToNote[note];
}

/**
 * Convert a midi note into a pitch
 */
export function midiNumberToPitch(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
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
  return index + (parseInt(octave, 10) + 1) * 12;
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
  return getAudioPluginVersionlessTuneflowId(parts.manufacturerName, parts.pluginFormatName, parts.name)
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

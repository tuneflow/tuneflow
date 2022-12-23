import { nanoid } from 'nanoid';
import { ge as greaterEqual, lt as lowerThan, le as lowerEqual } from 'binary-search-bounds';
import { AudioPlugin } from './audio_plugin';
import type { Song } from './song';
import { Clip, ClipType } from './clip';
import type { AudioClipData } from './clip';
import { dbToVolumeValue, decodeAudioPluginTuneflowId } from '../utils';
import { AutomationData } from './automation';
import _ from 'underscore';

export enum TrackType {
  MIDI_TRACK = 1,
  AUDIO_TRACK = 2,
  MASTER_TRACK = 3,
  AUX_TRACK = 4,
}

/**
 * A track in the song that maps to an instrument.
 *
 * It contains clips, instrument information, play status(volume, muted, etc.), and more.
 */
export class Track {
  static MAX_NUM_EFFECTS_PLUGINS = 5;
  static MAX_NUM_SENDS = 5;

  private insturment?: InstrumentInfo;
  /** Clips sorted by their start tick. */
  private clips: Clip[];
  private suggestedInstruments: InstrumentInfo[];
  private uuid: string;
  private volume: number;
  private solo: boolean;
  private muted: boolean;
  private rank: number;
  private pan: number;
  private samplerPlugin?: AudioPlugin;
  private audioPlugins: { [index: string]: AudioPlugin } = {};
  private song: Song;
  private automation: AutomationData;
  private type: TrackType;
  private auxTrackData?: AuxTrackData;
  private sends: { [index: string]: TrackSend } = {};
  /** If not specified, the track outputs to the default device. */
  private output?: TrackOutput;

  /**
   * IMPORTANT: Do not use the constructor directly, call
   * createTrack from a song instead.
   */
  constructor({
    type,
    song,
    uuid = Track.generateTrackIdInternal(),
    clips = [],
    instrument,
    suggestedInstruments = [],
    volume = dbToVolumeValue(0),
    solo = false,
    muted = false,
    rank = 0,
    pan = 0,
  }: {
    type: TrackType;
    song: Song;
    /**
     * The universal-unique identifier of the track.
     *
     * In most cases, leave it blank and it will be automatically assigned.
     */
    uuid?: string;
    /** Clips of the track. */
    clips?: Clip[];
    /** Information about the instrument to play this track. */
    instrument?: InstrumentInfo;
    /** Other possible instruments. */
    suggestedInstruments?: InstrumentInfo[];
    /** A float value indicating the track-level volume, ranging from 0 to 1. */
    volume?: number;
    /** Whether this track is in solo mode. */
    solo?: boolean;
    /** Whether this track is muted. */
    muted?: boolean;
    /** The rank of this track within the song. */
    rank?: number;
    /** An integer value from -64 to 63, corresponding to the midi pan CC 0 - 127. */
    pan?: number;
  }) {
    this.song = song;
    this.type = type;
    if (instrument) {
      this.insturment = instrument;
    } else if (type === TrackType.MIDI_TRACK) {
      this.insturment = new InstrumentInfo({
        program: 0,
        isDrum: false,
      });
    }
    if (type === TrackType.AUX_TRACK) {
      this.auxTrackData = new AuxTrackData();
      this.auxTrackData.setInputBusRank(1);
    }
    this.clips = [...clips];
    this.suggestedInstruments = [...suggestedInstruments];
    this.uuid = uuid;
    this.volume = volume;
    this.solo = solo;
    this.muted = muted;
    this.rank = rank;
    this.pan = pan;
    this.automation = new AutomationData();
  }

  getType() {
    return this.type;
  }

  getSong() {
    return this.song;
  }

  getInstrument() {
    return this.insturment;
  }

  setInstrument({
    program,
    isDrum,
  }: {
    /**
     * General MIDI program number(counting from 0, i.e. "Acoustic Grand Piano" === 0).
     *
     * https://www.midi.org/specifications-old/item/gm-level-1-sound-set
     */
    program: number;

    /**
     * Whether this instrument is a percussion instrument
     * (or using channel 9(counting from 0) if you know what it means).
     */
    isDrum: boolean;
  }) {
    if (this.type !== TrackType.MIDI_TRACK) {
      return;
    }
    this.insturment = new InstrumentInfo({ program, isDrum });
  }

  getSuggestedInstruments() {
    return this.suggestedInstruments;
  }

  /**
   * Adds a suggested instrument and returns it.
   * @returns
   */
  createSuggestedInstrument({
    program,
    isDrum,
  }: {
    /**
     * General MIDI program number(counting from 0, i.e. "Acoustic Grand Piano" === 0).
     *
     * https://www.midi.org/specifications-old/item/gm-level-1-sound-set
     */
    program: number;

    /**
     * Whether this instrument is a percussion instrument
     * (or using channel 9(counting from 0) if you know what it means).
     */
    isDrum: boolean;
  }) {
    if (this.type !== TrackType.MIDI_TRACK) {
      return;
    }
    const instrumentInfo = new InstrumentInfo({ program, isDrum });
    this.suggestedInstruments.push(instrumentInfo);
    return instrumentInfo;
  }

  clearSuggestedInstruments() {
    this.suggestedInstruments = [];
  }

  getId() {
    return this.uuid;
  }

  /**
   * In most cases, you don't need to use this method and just let the pipeline assign an id for the track.
   * @param uuid A universally unique id for the track.
   */
  setId(uuid: string) {
    this.uuid = uuid;
  }

  getVolume() {
    return this.volume;
  }

  /**
   *
   * @param volume A float value indicating the track-level volume, ranging from 0 to 1.
   */
  setVolume(volume: number) {
    this.volume = volume;
  }

  /**
   *
   * @param pan An integer value between -64 and 63. Setting to 0 means balanced.
   */
  setPan(pan: number) {
    this.pan = pan;
  }

  getPan() {
    return this.pan;
  }

  getSolo() {
    return this.solo;
  }

  /**
   * If set to true, track will be solo'ed and unmuted.
   */
  setSolo(solo: boolean) {
    this.solo = solo;
    if (solo && this.muted) {
      this.muted = false;
    }
  }

  getMuted() {
    return this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  getRank() {
    return this.rank;
  }

  createAudioPlugin(tfId: string) {
    const pluginInfo = decodeAudioPluginTuneflowId(tfId);
    const plugin = new AudioPlugin(
      pluginInfo.name,
      pluginInfo.manufacturerName,
      pluginInfo.pluginFormatName,
      pluginInfo.pluginVersion,
    );
    return plugin;
  }

  getSamplerPlugin() {
    return this.samplerPlugin;
  }

  /**
   *
   * @param plugin
   * @param clearAutomation Whether to remove existing track automation associated with the old plugin.
   */
  setSamplerPlugin(plugin: AudioPlugin, clearAutomation = true) {
    if (this.type !== TrackType.MIDI_TRACK) {
      return;
    }
    const pluginTypeChanged =
      (!this.samplerPlugin && !!plugin) ||
      (!plugin && !!this.samplerPlugin) ||
      (!!plugin && !!this.samplerPlugin && !plugin.matchesTfId(this.samplerPlugin.getTuneflowId()));
    const oldPlugin = this.samplerPlugin;
    this.samplerPlugin = plugin;
    if (pluginTypeChanged && oldPlugin && clearAutomation) {
      this.automation.removeAutomationOfPlugin(oldPlugin.getInstanceId());
    }
  }

  /**
   * This is the number of specified fx plugins.
   *
   * Do not use it to loop through the audio plugins map.
   */
  getAudioPluginCount() {
    return _.keys(this.audioPlugins).length;
  }

  /**
   *
   * @param index Index of the audio plugin (excluding the sampler plugin), counting from 0.
   * @returns
   */
  getAudioPluginAt(index: number): AudioPlugin | undefined {
    return this.audioPlugins[index];
  }

  /**
   *
   * @param index Index of the audio plugin (excluding the sampler plugin), counting from 0.
   * @param plugin
   */
  setAudioPluginAt(index: number, plugin: AudioPlugin, clearAutomation = true) {
    if (index > Track.MAX_NUM_EFFECTS_PLUGINS - 1) {
      throw new Error(
        `The maximum number of effects plugin per track is ${Track.MAX_NUM_EFFECTS_PLUGINS}`,
      );
    }
    const oldPlugin = this.audioPlugins ? this.audioPlugins[index] : undefined;
    const pluginTypeChanged =
      (!oldPlugin && !!plugin) ||
      (!plugin && !!oldPlugin) ||
      (!!plugin && !!oldPlugin && !plugin.matchesTfId(oldPlugin.getTuneflowId()));
    this.audioPlugins[index] = plugin;
    if (pluginTypeChanged && oldPlugin && clearAutomation) {
      this.automation.removeAutomationOfPlugin(oldPlugin.getInstanceId());
    }
  }

  /**
   *
   * @param index Index of the audio plugin (excluding the sampler plugin), counting from 0.
   */
  removeAudioPluginAt(index: number) {
    const oldPlugin = this.audioPlugins ? this.audioPlugins[index] : undefined;
    delete this.audioPlugins[index];
    if (oldPlugin) {
      this.automation.removeAutomationOfPlugin(oldPlugin.getInstanceId());
    }
  }

  getPluginByInstanceId(pluginInstanceId: string) {
    if (this.samplerPlugin && this.samplerPlugin.getInstanceId() === pluginInstanceId) {
      return this.samplerPlugin;
    }
    if (this.audioPlugins) {
      for (const index of _.keys(this.audioPlugins)) {
        const audioPlugin = this.audioPlugins[index];
        if (!audioPlugin) {
          continue;
        }
        if (audioPlugin.getInstanceId() === pluginInstanceId) {
          return audioPlugin;
        }
      }
    }
    return null;
  }

  getTrackStartTick() {
    if (!this.clips || this.clips.length === 0) {
      return 0;
    }
    return this.clips[0].getClipStartTick();
  }

  getTrackEndTick() {
    if (!this.clips || this.clips.length === 0) {
      return 0;
    }
    return this.clips[this.clips.length - 1].getClipEndTick();
  }

  getClipById(clipId: string) {
    for (const clip of this.clips) {
      if (clip.getId() === clipId) {
        return clip;
      }
    }
    return null;
  }

  getClips() {
    return this.clips;
  }

  /**
   * Gets the clips whose range overlaps with the given range.
   */
  getClipsOverlappingWith(startTick: number, endTick: number) {
    const overlappingClips: Clip[] = [];
    const startIndex = lowerThan(
      this.clips,
      { getClipStartTick: () => startTick } as any,
      (a: Clip, b: Clip) => a.getClipStartTick() - b.getClipStartTick(),
    );
    for (let i = Math.max(startIndex, 0); i < this.clips.length; i += 1) {
      const currentClip = this.clips[i];
      if (currentClip.getClipEndTick() < startTick) {
        continue;
      }
      if (currentClip.getClipStartTick() > endTick) {
        break;
      }

      overlappingClips.push(currentClip);
    }
    return overlappingClips;
  }

  /** Creates a MIDI clip and optionally inserts it into the track. */
  createMIDIClip({
    clipStartTick,
    clipEndTick = undefined,
    insertClip = true,
  }: {
    /**
     * The start of the clip, must be specified.
     */
    clipStartTick: number;
    clipEndTick?: number;
    /** Whether to insert the created clip into the track. */
    insertClip?: boolean;
  }) {
    if (!_.isNumber(clipStartTick)) {
      throw new Error('clipStartTick must be specified when creating a clip.');
    }
    const newClipEndTick =
      clipEndTick === undefined || clipEndTick === null ? clipStartTick + 1 : clipEndTick;
    if (newClipEndTick < clipStartTick) {
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${clipStartTick}, clipEndTick: ${clipEndTick}`,
      );
    }
    const clip = new Clip({
      // @ts-ignore
      id: Clip.generateClipIdInternal(),
      type: ClipType.MIDI_CLIP,
      song: this.song,
      track: undefined,
      clipStartTick,
      clipEndTick: newClipEndTick,
    });
    if (insertClip) {
      this.insertClip(clip);
    }

    return clip;
  }

  /** Creates an audio clip and optionally inserts it into the track. */
  createAudioClip({
    clipStartTick,
    audioClipData,
    clipEndTick,
    insertClip = true,
  }: {
    /**
     * The start of the clip, must be specified.
     */
    clipStartTick: number;
    /** The audio-related data, required if type is AUDIO_CLIP. */
    audioClipData: AudioClipData;
    clipEndTick?: number;
    /** Whether to insert the created clip into the track. */
    insertClip?: boolean;
  }) {
    if (!_.isNumber(clipStartTick)) {
      throw new Error('clipStartTick must be specified when creating a clip.');
    }
    const clip = new Clip({
      // @ts-ignore
      id: Clip.generateClipIdInternal(),
      type: ClipType.AUDIO_CLIP,
      song: this.song,
      track: undefined,
      clipStartTick,
      clipEndTick,
      audioClipData,
    });
    if (insertClip) {
      this.insertClip(clip);
    }

    return clip;
  }

  insertClip(clip: Clip) {
    if (clip.getTrack() !== this) {
      if (clip.getTrack()) {
        // Clip belongs to another track.
        clip.deleteFromParent(/* deleteAssociatedTrackAutomation= */ false);
      }
      // @ts-ignore
      clip.track = this;
    } else {
      // Clip already belongs to the track.
      return;
    }

    // Resolve conflict before inserting a new clip
    // to preserve the current order of clips.
    this.resolveClipConflictInternal(clip.getId(), clip.getClipStartTick(), clip.getClipEndTick());
    this.orderedInsertClipInternal(clip);
  }

  /**
   * Clones a clip without inserting it into this track, and returns the cloned instance.
   *
   * @param clip The clip (not necessarily in this track) to clone.
   * @returns The cloned clip.
   */
  cloneClip(clip: Clip) {
    if (clip.getType() === ClipType.MIDI_CLIP) {
      const newClip = this.createMIDIClip({
        clipStartTick: clip.getClipStartTick(),
        clipEndTick: clip.getClipEndTick(),
        insertClip: false,
      });
      for (const note of clip.getRawNotes()) {
        newClip.createNote({
          pitch: note.getPitch(),
          velocity: note.getVelocity(),
          startTick: note.getStartTick(),
          endTick: note.getEndTick(),
          updateClipRange: false,
          resolveClipConflict: false,
        });
      }
      return newClip;
    } else if (clip.getType() === ClipType.AUDIO_CLIP) {
      const newClip = this.createAudioClip({
        clipStartTick: clip.getClipStartTick(),
        clipEndTick: clip.getClipEndTick(),
        audioClipData: clip.getAudioClipData() as AudioClipData,
        insertClip: false,
      });
      return newClip;
    } else {
      throw new Error(`Unsupported clip type ${clip.getType()}`);
    }
  }

  /**
   * Get the index of the clip within the clip list.
   *
   * NOTE: This assumes the clip list is sorted.
   */
  getClipIndex(clip: Clip) {
    const startIndex = lowerEqual(
      this.clips,
      clip,
      (a: Clip, b: Clip) => a.getClipStartTick() - b.getClipStartTick(),
    );

    return this.clips.indexOf(clip, startIndex);
  }

  deleteClip(clip: Clip, deleteAssociatedTrackAutomation: boolean) {
    const index = this.getClipIndex(clip);
    this.deleteClipAt(index, deleteAssociatedTrackAutomation);
  }

  deleteClipAt(index: number, deleteAssociatedTrackAutomation: boolean) {
    if (index < 0) {
      return;
    }
    if (deleteAssociatedTrackAutomation) {
      const clip = this.clips[index];
      if (!clip) {
        return;
      }
      this.automation.removeAllPointsWithinRange(clip.getClipStartTick(), clip.getClipEndTick());
    }

    this.clips.splice(index, 1);
  }

  deleteFromParent() {
    this.song.removeTrack(this.getId());
  }

  getAutomation() {
    return this.automation;
  }

  /** Sets the automation data of this track as a copy of the given automation data. */
  setAutomation(newAutomation: AutomationData) {
    this.automation = newAutomation.clone();
  }

  /** Whether this track has any defined automation. */
  hasAnyAutomation() {
    return (
      this.automation.getAutomationTargets().length > 0 &&
      !_.isEmpty(this.automation.getAutomationTargetValues())
    );
  }

  getAuxTrackData() {
    return this.auxTrackData;
  }

  /**
   * Get the number of specified sends.
   *
   * NOTE: Do not use this as the length of the sends array since many entries might be undefined.
   */
  getSendCount() {
    return _.keys(this.sends).length;
  }

  getSendAt(index: number) {
    return this.sends[index];
  }

  removeSendAt(index: number) {
    delete this.sends[index];
  }

  setSendAt(index: number, send: TrackSend) {
    if (index >= Track.MAX_NUM_SENDS) {
      throw new Error(`Maximum of supported sends is ${Track.MAX_NUM_SENDS}`);
    }
    if (this.type === TrackType.MASTER_TRACK) {
      throw new Error('Cannot add send for master track');
    }
    this.sends[index] = send;
  }

  getOutput() {
    return this.output;
  }

  setOutput({ type, trackId = undefined }: { type: TrackOutputType; trackId?: string }) {
    if (this.type === TrackType.MASTER_TRACK) {
      throw new Error(`Master track can only output to the default device.`);
    }
    if (type !== TrackOutputType.Track) {
      throw new Error('Non-track output type is not supported yet.');
    }
    if (trackId === this.getId()) {
      throw new Error('Cannot set output to the track itself.');
    }

    this.output = new TrackOutput({
      type,
      trackId,
    });
  }

  removeOutput() {
    delete this.output;
  }

  /** Gets all visible notes in this track sorted by start time. */
  getVisibleNotes() {
    const visibleNotes = [];
    for (const clip of this.getClips()) {
      for (const note of clip.getNotes()) {
        visibleNotes.push(note);
      }
    }
    return visibleNotes.sort((a, b) => a.getStartTick() - b.getStartTick());
  }

  private static generateTrackIdInternal() {
    return nanoid();
  }

  /**
   * NOTE: Always resolve conflict BEFORE you make any changes to any clips,
   * so that the order of the clips are still maintained.
   *
   * @param clipId
   * @param startTick
   * @param endTick
   */
  protected resolveClipConflictInternal(clipId: string, startTick: number, endTick: number) {
    const overlappingClips = this.getClipsOverlappingWith(startTick, endTick);
    for (const clip of overlappingClips) {
      if (clip.getId() === clipId) {
        continue;
      }
      // @ts-ignore
      clip.trimConflictPartInternal(startTick, endTick);
    }
  }

  private orderedInsertClipInternal(newClip: Clip) {
    const insertIndex = greaterEqual(
      this.clips,
      newClip,
      (a: Clip, b: Clip) => a.getClipStartTick() - b.getClipStartTick(),
    );

    this.clips.splice(insertIndex, 0, newClip);
  }
}

export enum TrackSendPosition {
  Undefined = 0,
  PreFader = 1,
  PostFader = 2,
  // TODO: Support PostPan
}

export class TrackSend {
  private outputBusRank: number;
  private gainLevel: number;
  private position: TrackSendPosition;
  private muted: boolean;

  constructor({
    outputBusRank,
    gainLevel,
    position = TrackSendPosition.PostFader,
    muted = false,
  }: {
    /** Rank of the bus to send to. Valid value ranges from 1 to `Song.NUM_BUSES`. */
    outputBusRank: number;
    /** A float value from 0 to 1, indicating the send level fader position. */
    gainLevel: number;
    position: TrackSendPosition;
    muted?: boolean;
  }) {
    this.outputBusRank = outputBusRank;
    this.gainLevel = TrackSend.checkGainLevel(gainLevel);
    this.position = position;
    this.muted = _.isBoolean(muted) ? muted : false;
  }

  static checkGainLevel(level: number) {
    if (level < 0 || level > 1) {
      throw new Error(`Send gain level ${level} out of valid range 0 - 1.`);
    }
    return level;
  }

  /**
   * @returns Rank of the bus to send to. Valid value ranges from 1 to `Song.NUM_BUSES`.
   */
  getOutputBusRank() {
    return this.outputBusRank;
  }

  /**
   * @param rank Rank of the bus to send to. Valid value ranges from 1 to `Song.NUM_BUSES`.
   */
  setOutputBusRank(rank: number) {
    this.outputBusRank = rank;
  }

  /**
   * @returns A float value from 0 to 1, indicating the send gain fader position.
   */
  getGainLevel() {
    return this.gainLevel;
  }

  /**
   * @param level A float value from 0 to 1, indicating the send gain fader position.
   */
  setGainLevel(level: number) {
    this.gainLevel = TrackSend.checkGainLevel(level);
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: TrackSendPosition) {
    this.position = position;
  }

  getMuted() {
    return this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }
}

/**
 * Information about how an instrument should be played.
 */
export class InstrumentInfo {
  private program: number;
  private isDrum: boolean;

  constructor({
    program,
    isDrum,
  }: {
    /**
     * General MIDI program number(counting from 0, i.e. "Acoustic Grand Piano" === 0).
     *
     * https://www.midi.org/specifications-old/item/gm-level-1-sound-set
     */
    program: number;

    /**
     * Whether this instrument is a percussion instrument
     * (or using channel 9(counting from 0) if you know what it means).
     */
    isDrum: boolean;
  }) {
    this.program = program;
    this.isDrum = isDrum;
  }

  getProgram() {
    return this.program;
  }

  getIsDrum() {
    return this.isDrum;
  }

  clone() {
    return new InstrumentInfo({
      program: this.program,
      isDrum: this.isDrum,
    });
  }
}

export class AuxTrackData {
  private inputBusRank?: number;

  /**
   * @param rank Rank of the bus to be used as the input, ranges from 1 to Song.NUM_BUSES.
   */
  setInputBusRank(rank: number) {
    this.inputBusRank = rank;
  }

  getInputBusRank() {
    return this.inputBusRank;
  }

  removeInputBus() {
    delete this.inputBusRank;
  }
}

export enum TrackOutputType {
  Undefined = 0,
  Device = 1,
  Track = 2,
}

export class TrackOutput {
  private type: TrackOutputType;
  private trackId?: string;

  /**
   * DO NOT call this constructor directly, use `track.setOutput` instead.
   */
  constructor({ type, trackId = undefined }: { type: TrackOutputType; trackId?: string }) {
    this.type = type;
    this.trackId = trackId;
  }

  getType() {
    return this.type;
  }

  getTrackId() {
    return this.trackId;
  }
}

export enum MelodicInstrumentType {
  AcousticGrandPiano = 0,
  BrightAcousticPiano = 1,
  ElectricGrandPiano = 2,
  HonkyTonkPiano = 3,
  ElectricPiano1 = 4,
  ElectricPiano2 = 5,
  Harpsichord = 6,
  Clavinet = 7,
  Celesta = 8,
  Glockenspiel = 9,
  Musicalbox = 10,
  Vibraphone = 11,
  Marimba = 12,
  Xylophone = 13,
  TubularBell = 14,
  Dulcimer = 15,
  DrawbarOrgan = 16,
  PercussiveOrgan = 17,
  RockOrgan = 18,
  Churchorgan = 19,
  Reedorgan = 20,
  Accordion = 21,
  Harmonica = 22,
  TangoAccordion = 23,
  AcousticGuitarNylon = 24,
  AcousticGuitarSteel = 25,
  ElectricGuitarJazz = 26,
  ElectricGuitarClean = 27,
  ElectricGuitarMuted = 28,
  OverdrivenGuitar = 29,
  DistortionGuitar = 30,
  Guitarharmonics = 31,
  AcousticBass = 32,
  ElectricBassFinger = 33,
  ElectricBassPick = 34,
  FretlessBass = 35,
  SlapBass1 = 36,
  SlapBass2 = 37,
  SynthBass1 = 38,
  SynthBass2 = 39,
  Violin = 40,
  Viola = 41,
  Cello = 42,
  Contrabass = 43,
  TremoloStrings = 44,
  PizzicatoStrings = 45,
  OrchestralHarp = 46,
  Timpani = 47,
  StringEnsemble1 = 48,
  StringEnsemble2 = 49,
  SynthStrings1 = 50,
  SynthStrings2 = 51,
  VoiceAahs = 52,
  VoiceOohs = 53,
  SynthVoice = 54,
  OrchestraHit = 55,
  Trumpet = 56,
  Trombone = 57,
  Tuba = 58,
  MutedTrumpet = 59,
  Frenchhorn = 60,
  BrassSection = 61,
  SynthBrass1 = 62,
  SynthBrass2 = 63,
  SopranoSax = 64,
  AltoSax = 65,
  TenorSax = 66,
  BaritoneSax = 67,
  Oboe = 68,
  EnglishHorn = 69,
  Bassoon = 70,
  Clarinet = 71,
  Piccolo = 72,
  Flute = 73,
  Recorder = 74,
  PanFlute = 75,
  BlownBottle = 76,
  Shakuhachi = 77,
  Whistle = 78,
  Ocarina = 79,
  Lead1Square = 80,
  Lead2Sawtooth = 81,
  Lead3Calliope = 82,
  Lead4Chiff = 83,
  Lead5Charang = 84,
  Lead6Voice = 85,
  Lead7Fifths = 86,
  Lead8BassLead = 87,
  Pad1NewAge = 88,
  Pad2Warm = 89,
  Pad3PolySynth = 90,
  Pad4Choir = 91,
  Pad5Bowed = 92,
  Pad6Metallic = 93,
  Pad7Halo = 94,
  Pad8Sweep = 95,
  FX1Rain = 96,
  FX2Soundtrack = 97,
  FX3Crystal = 98,
  FX4Atmosphere = 99,
  FX5Brightness = 100,
  FX6Goblins = 101,
  FX7Echoes = 102,
  FX8SciFi = 103,
  Sitar = 104,
  Banjo = 105,
  Shamisen = 106,
  Guzheng = 107,
  Kalimba = 108,
  Bagpipe = 109,
  Fiddle = 110,
  Shanai = 111,
  TinkleBell = 112,
  Agogo = 113,
  SteelDrums = 114,
  Woodblock = 115,
  TaikoDrum = 116,
  MelodicTom = 117,
  SynthDrum = 118,
  ReverseCymbal = 119,
  GuitarFretNoise = 120,
  BreathNoise = 121,
  Seashore = 122,
  BirdTweet = 123,
  TelephoneRing = 124,
  Helicopter = 125,
  Applause = 126,
  Gunshot = 127,
}

/**
 * A drum type to drum pitch mapping.
 *
 * The pitch number is used on a drum kit track where program==0 && isDrum==true.
 */
export enum DrumInstrumentType {
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

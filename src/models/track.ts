import { nanoid } from 'nanoid';
import { ge as greaterEqual, lt as lowerThan, le as lowerEqual } from 'binary-search-bounds';
import { AudioPlugin } from './audio_plugin';
import type { Song } from './song';
import { Clip } from './clip';
import { decodeAudioPluginTuneflowId } from '../utils';

/**
 * A track in the song that maps to an instrument.
 *
 * It contains clips, instrument information, play status(volume, muted, etc.), and more.
 */
export class Track {
  private insturment: InstrumentInfo;
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
  private audioPlugins: AudioPlugin[] = [];
  private song: Song;

  /**
   * IMPORTANT: Do not use the constructor directly, call
   * createTrack from a song instead.
   */
  constructor({
    song,
    uuid = Track.generateTrackIdInternal(),
    clips = [],
    instrument = new InstrumentInfo({ program: 0, isDrum: false }),
    suggestedInstruments = [],
    volume = 1,
    solo = false,
    muted = false,
    rank = 0,
    pan = 0,
  }: {
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
    this.insturment = instrument;
    this.clips = [...clips];
    this.suggestedInstruments = [...suggestedInstruments];
    this.uuid = uuid;
    this.volume = volume;
    this.solo = solo;
    this.muted = muted;
    this.rank = rank;
    this.pan = pan;
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

  setSolo(solo: boolean) {
    this.solo = solo;
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
    // @ts-ignore
    plugin.localInstanceIdInternal = nanoid(10);
    return plugin;
  }

  getSamplerPlugin() {
    return this.samplerPlugin;
  }

  setSamplerPlugin(plugin: AudioPlugin) {
    this.samplerPlugin = plugin;
  }

  getAudioPlugins() {
    return this.audioPlugins;
  }

  addAudioPlugin(plugin: AudioPlugin) {
    this.audioPlugins.push(plugin);
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

  /** Creates a clip and optionally inserts it into the track. */
  createClip({
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
    if (clipStartTick === undefined || clipStartTick === null) {
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
      track: undefined,
      clipStartTick,
      clipEndTick: newClipEndTick,
    });
    if (insertClip) {
      this.insertClip(clip);
    }

    return clip;
  }

  insertClip(clip: Clip) {
    if (clip.getTrack() !== this) {
      if (clip.getTrack()) {
        clip.deleteFromParent();
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
    const newClip = this.createClip({
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

  deleteClip(clip: Clip) {
    const index = this.getClipIndex(clip);
    this.deleteClipAt(index);
  }

  deleteClipAt(index: number) {
    if (index < 0) {
      return;
    }
    this.clips.splice(index, 1);
  }

  deleteFromParent() {
    this.song.removeTrack(this.getId());
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

import { nanoid } from 'nanoid';
import { ge as greaterEqual, lt as lowerThan, le as lowerEqual } from 'binary-search-bounds';
import * as _ from 'underscore';
import type { TuneflowPlugin } from '../base_plugin';
import { getAudioPluginTuneflowId } from '..';

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

/**
 * Information about how a note should be played.
 */
export class Note {
  private pitch: number;
  private velocity: number;
  private startTick: number;
  private endTick: number;

  /**
   * IMPORTANT: Do not use the constructor directly, call
   * createNote from clips instead.
   */
  constructor({
    pitch,
    velocity,
    startTick,
    endTick,
  }: {
    pitch: number;
    velocity: number;
    startTick: number;
    endTick: number;
  }) {
    this.pitch = pitch;
    this.velocity = velocity;
    this.startTick = startTick;
    this.endTick = endTick;
  }

  getPitch() {
    return this.pitch;
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

  clone() {
    return new Note({
      pitch: this.pitch,
      velocity: this.velocity,
      startTick: this.startTick,
      endTick: this.endTick,
    });
  }
}

export class AudioPlugin {
  private name: string;
  private manufacturerName: string;
  private pluginFormatName: string;
  private pluginVersion: string;
  private isEnabled = true;

  constructor(
    name: string,
    manufacturerName: string,
    pluginFormatName: string,
    pluginVersion: string,
  ) {
    this.name = name;
    this.manufacturerName = manufacturerName;
    this.pluginFormatName = pluginFormatName;
    this.pluginVersion = pluginVersion;
  }

  /**
   * Gets an id that lets Tuneflow uniquely identify the plugin.
   */
  getTuneflowId() {
    return getAudioPluginTuneflowId(
      this.manufacturerName,
      this.pluginFormatName,
      this.name,
      this.pluginVersion,
    );
  }

  clone() {
    const newPlugin = new AudioPlugin(
      this.name,
      this.manufacturerName,
      this.pluginFormatName,
      this.pluginVersion,
    );
    newPlugin.setIsEnabled(this.isEnabled);
    return newPlugin;
  }

  toJSON() {
    return {
      name: this.name,
      manufacturerName: this.manufacturerName,
      pluginFormatName: this.pluginFormatName,
      pluginVersion: this.pluginVersion,
      isEnabled: this.isEnabled,
    };
  }

  setIsEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }

  getIsEnabled() {
    return this.isEnabled;
  }
}

/**
 * A clip is a piece in a track, and it contains notes and the clip range.
 * One track can contain one or many non-overlapping
 * clips.
 */
export class Clip {
  private track: Track;
  private id: string;
  // Notes should be sorted all the time.
  private notes: Note[];
  /** Inclusive start tick. */
  private clipStartTick = 0;
  /** Inclusive end tick. */
  private clipEndTick = 0;

  /**
   * IMPORTANT: Do not use the constructor directly, call createClip from tracks instead.
   */
  constructor({
    track,
    id = Clip.generateClipIdInternal(),
    sortedNotes = [],
    clipStartTick = 0,
    clipEndTick = 0,
  }: {
    track: Track;
    id?: string;
    /**
     * Notes of the clip sorted by start time.
     * All notes should use absolute timing.
     */
    sortedNotes?: Note[];
    clipStartTick?: number;
    clipEndTick?: number;
  }) {
    this.track = track;
    this.id = id;
    this.notes = [...sortedNotes];
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
    const note = new Note({
      pitch,
      velocity,
      startTick,
      endTick,
    });
    if (startTick < this.clipStartTick && updateClipRange) {
      this.adjustClipLeft(startTick, resolveClipConflict);
    }
    if (endTick > this.clipEndTick && updateClipRange) {
      this.adjustClipRight(endTick, resolveClipConflict);
    }
    this.orderedInsertNote(this.notes, note);
    // TODO: Resolve note conflict.
    return note;
  }

  deleteNote(note: Note) {
    const startIndex = lowerThan(
      this.notes,
      note,
      (a: Note, b: Note) => a.getStartTick() - b.getStartTick(),
    );

    for (let index = Math.max(0, startIndex); index < this.notes.length; index += 1) {
      const currentNote = this.notes[index];
      if (currentNote && currentNote === note) {
        this.notes.splice(index, 1);
        return;
      }
      if (currentNote && currentNote.getStartTick() > note.getStartTick()) {
        // We have searched past all possible notes.
        return;
      }
    }
  }

  deleteNoteAt(index: number) {
    this.notes.splice(index, 1);
  }

  private orderedInsertNote(noteList: Note[], newNote: Note) {
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
  }

  /**
   * Adjust the left boundary of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call. If you need to adjust the left and right boundaries at
   * the same time, use adjustClipRange.
   * @param clipStartTick The new start tick (inclusive) of the clip.
   */
  adjustClipLeft(clipStartTick: number, resolveConflict = true) {
    clipStartTick = Math.max(0, clipStartTick);
    if (clipStartTick > this.clipEndTick) {
      this.deleteFromParent();
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict) {
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
   * this call. If you need to adjust the left and right boundaries at
   * the same time, use adjustClipRange.
   *
   * @param clipEndTick  The new end tick (inclusive) of the clip.
   */
  adjustClipRight(clipEndTick: number, resolveConflict = true) {
    if (clipEndTick < this.clipStartTick) {
      this.deleteFromParent();
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict) {
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
   * Adjust the left and right boundaries of the clip at the same time.
   * @param clipStartTick The new start tick (inclusive) of the clip.
   * @param clipEndTick The new end tick (inclusive) of the clip.
   */
  adjustClipRange(clipStartTick: number, clipEndTick: number, resolveConflict = true) {
    clipStartTick = Math.max(0, clipStartTick);
    if (clipStartTick > clipEndTick) {
      this.deleteFromParent();
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict) {
        // @ts-ignore
        this.track.resolveClipConflictInternal(
          this.getId(),
          Math.min(this.clipStartTick, clipStartTick),
          Math.max(this.clipEndTick, clipEndTick),
        );
      }
      this.clipStartTick = clipStartTick;
      this.clipEndTick = clipEndTick;
    }
  }

  /**
   * Move the clip by the given offset ticks.
   * @param offsetTick
   */
  moveClip(offsetTick: number) {
    const newClipStartTick = Math.max(0, this.clipStartTick + offsetTick);
    const newClipEndTick = Math.max(0, this.clipEndTick + offsetTick);
    // Resolve conflict before changing the clip's range
    // to preserve the current order of clips.
    // @ts-ignore
    this.track.resolveClipConflictInternal(this.getId(), newClipStartTick, newClipEndTick);
    this.clipStartTick = newClipStartTick;
    this.clipEndTick = newClipEndTick;
    for (const note of this.notes) {
      note.setStartTick(note.getStartTick() + offsetTick);
      note.setEndTick(note.getEndTick() + offsetTick);
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
    this.track.deleteClip(this);
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

  static isNoteInClip(
    noteStartTick: number,
    noteEndTick: number,
    clipStartTick: number,
    clipEndTick: number,
  ) {
    return noteStartTick >= clipStartTick && noteEndTick <= clipEndTick;
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
      const rightNotes = Clip.getNotesInRange(this.notes, rightClipStartTick, rightClipEndTick).map(
        item => item.clone(),
      );
      this.adjustClipRight(overlappingStartTick - 1, /* resolveConflict= */ false);

      this.track.createClip({
        sortedNotes: rightNotes,
        clipStartTick: rightClipStartTick,
        clipEndTick: rightClipEndTick,
      });
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

  private static generateClipIdInternal() {
    return nanoid(10);
  }
}

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
    sortedNotes = [],
    insertClip = true,
  }: {
    /**
     * Notes of the clip sorted by start time.
     * All notes should use absolute timing.
     */
    sortedNotes?: Note[];
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
      track: this,
      sortedNotes,
      clipStartTick,
      clipEndTick: newClipEndTick,
    });
    if (insertClip) {
      this.insertClip(clip);
    }

    return clip;
  }

  insertClip(clip: Clip) {
    // Resolve conflict before inserting a new clip
    // to preserve the current order of clips.
    this.resolveClipConflictInternal(clip.getId(), clip.getClipStartTick(), clip.getClipEndTick());
    this.orderedInsertClipInternal(this.clips, clip);
  }

  /**
   * Clones a clip without inserting it into this track, and returns the cloned instance.
   * @param clip The clip (not necessarily in this track) to clone.
   * @returns The cloned clip.
   */
  cloneClip(clip: Clip) {
    const newClip = this.createClip({
      sortedNotes: [],
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
    newClip.adjustClipRange(
      clip.getClipStartTick(),
      clip.getClipEndTick(),
      /* resolveConflict= */ false,
    );
    return newClip;
  }

  deleteClip(clip: Clip) {
    const startIndex = lowerEqual(
      this.clips,
      clip,
      (a: Clip, b: Clip) => a.getClipStartTick() - b.getClipStartTick(),
    );

    const index = this.clips.indexOf(clip, startIndex);
    if (index >= 0) {
      this.clips.splice(index, 1);
    }
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

  private orderedInsertClipInternal(clipList: Clip[], newClip: Clip) {
    const insertIndex = greaterEqual(
      clipList,
      newClip,
      (a: Clip, b: Clip) => a.getClipStartTick() - b.getClipStartTick(),
    );

    clipList.splice(insertIndex, 0, newClip);
  }
}

export class TempoEvent {
  private ticks: number;
  private bpm: number;
  private time: number;

  constructor({
    ticks,
    bpm,
    time,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    /** The new tempo in BPM(Beats-per-minute) format. */
    bpm: number;
    /** The time at which this event happens. */
    time: number;
  }) {
    this.ticks = ticks;
    this.bpm = bpm;
    this.time = time;
  }

  getTicks(): number {
    return this.ticks;
  }

  getBpm(): number {
    return this.bpm;
  }

  /**
   * In most cases you don't need to (and shouldn't) call this method.
   * To update the BPM of a tempo event, call `updateTempo` from the `Song` instance.
   * @param bpm The new tempo in BPM(Beats-per-minute) format.
   */
  setBpmInternal(bpm: number) {
    this.bpm = bpm;
  }

  getTime(): number {
    return this.time;
  }

  /**
   * In most cases you don't need to (and shouldn't) call this method.
   * @param time The time at which this event happens.
   */
  setTimeInternal(time: number) {
    this.time = time;
  }
}

export class TimeSignatureEvent {
  private ticks: number;
  private numerator: number;
  private denominator: number;

  constructor({
    ticks,
    numerator,
    denominator,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    numerator: number;
    denominator: number;
  }) {
    this.ticks = ticks;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  getTicks(): number {
    return this.ticks;
  }

  /**
   *
   * @param ticks The tick at which this event happens.
   */
  setTicks(ticks: number) {
    this.ticks = ticks;
  }

  getNumerator(): number {
    return this.numerator;
  }

  setNumerator(numerator: number) {
    this.numerator = numerator;
  }

  getDenominator(): number {
    return this.denominator;
  }

  setDenominator(denominator: number) {
    this.denominator = denominator;
  }
}

interface PluginContext {
  plugin: TuneflowPlugin;
  numTracksCreatedByPlugin: number;
}

export class Song {
  private tracks: Track[];
  private PPQ: number;
  private tempos: TempoEvent[];
  private timeSignatures: TimeSignatureEvent[];
  private pluginContext?: PluginContext;
  private nextTrackRank = 1;

  constructor() {
    this.tracks = [];
    this.PPQ = 0;
    this.tempos = [];
    this.timeSignatures = [];
  }

  /**
   * @returns All tracks in previously stored order.
   */
  getTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(trackId: string) {
    return _.find(this.tracks, track => track.getId() === trackId);
  }

  getTrackIndex(trackId: string) {
    return _.findIndex(this.tracks, track => track.getId() === trackId);
  }

  /**
   * Adds a new track into the song and returns it.
   *
   * Requires `createTrack` access.
   */
  createTrack({
    index,
  }: {
    /** Index to insert at. If left blank, appends to the end. */
    index?: number;
  }): Track {
    this.checkAccess('createTrack');
    const track = new Track({
      song: this,
      uuid: this.getNextTrackId(),
      rank: this.getNextTrackRank(),
    });
    if (index !== undefined && index !== null) {
      this.tracks.splice(index, 0, track);
    } else {
      this.tracks.push(track);
    }
    return track;
  }

  /**
   * Clones a track and inserts it in this song and returns the cloned instance.
   * @param track The track in this song to clone.
   * @returns The cloned track.
   */
  cloneTrack(track: Track) {
    let trackIndex: any = this.getTrackIndex(track.getId());
    if (trackIndex < 0) {
      // Track not found in this song, new track will be inserted at the end.
      trackIndex = undefined;
    }
    const newTrack = this.createTrack({
      index: trackIndex,
    });
    newTrack.setInstrument({
      program: track.getInstrument().getProgram(),
      isDrum: track.getInstrument().getIsDrum(),
    });
    for (const existingInstrument of track.getSuggestedInstruments()) {
      newTrack.createSuggestedInstrument({
        program: existingInstrument.getProgram(),
        isDrum: existingInstrument.getIsDrum(),
      });
    }
    newTrack.setVolume(track.getVolume());
    newTrack.setSolo(track.getSolo());
    newTrack.setMuted(track.getMuted());
    const existingSamplerPlugin = track.getSamplerPlugin();
    if (existingSamplerPlugin) {
      newTrack.setSamplerPlugin(existingSamplerPlugin.clone());
    }
    for (const audioPlugin of track.getAudioPlugins()) {
      newTrack.addAudioPlugin(audioPlugin.clone());
    }
    for (const clip of track.getClips()) {
      const newClip = newTrack.createClip({
        clipStartTick: clip.getClipStartTick(),
        clipEndTick: clip.getClipEndTick(),
        sortedNotes: [],
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
    }
    return newTrack;
  }

  /**
   * Removes a new track from the song and returns it.
   *
   * Requires `removeTrack` access.
   */
  removeTrack(trackId: string) {
    this.checkAccess('removeTrack');
    const track = this.getTrackById(trackId);
    if (!track) {
      return null;
    }
    this.tracks.splice(
      _.findIndex(this.tracks, track => track.getId() === trackId),
      1,
    );
    return track;
  }

  /**
   * @returns The resolution of the song in Pulse-per-quarter.
   */
  getResolution(): number {
    return this.PPQ;
  }

  /**
   * Sets resolution in Pulse-per-quarter.
   * @param resolution
   */
  setResolution(resolution: number) {
    this.PPQ = resolution;
  }

  /**
   * @returns A list of tempo change events ordered by occurrence time.
   */
  getTempoChanges(): TempoEvent[] {
    return this.tempos;
  }

  /**
   * Adds a tempo change event into the song and returns it.
   * @returns
   */
  createTempoChange({
    ticks,
    bpm,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    /** The new tempo in BPM(Beats-per-minute) format. */
    bpm: number;
  }): TempoEvent {
    if (this.tempos.length === 0 && ticks !== 0) {
      throw new Error('The first tempo event must be at tick 0');
    }
    // Calculate time BEFORE the new tempo event is inserted.
    const tempoChange = new TempoEvent({ ticks, bpm, time: this.tickToSeconds(ticks) });
    const insertIndex = greaterEqual(
      this.tempos,
      tempoChange,
      (a: TempoEvent, b: TempoEvent) => a.getTicks() - b.getTicks(),
    );
    if (insertIndex < 0) {
      this.tempos.push(tempoChange);
    } else {
      this.tempos.splice(insertIndex, 0, tempoChange);
    }
    this.retimingTempoEvents();
    return tempoChange;
  }

  updateTempo(tempoEvent: TempoEvent, newBPM: number) {
    tempoEvent.setBpmInternal(newBPM);
    this.retimingTempoEvents();
  }

  getTimeSignatures(): TimeSignatureEvent[] {
    return this.timeSignatures;
  }

  createTimeSignature({
    ticks,
    numerator,
    denominator,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    numerator: number;
    denominator: number;
  }): TimeSignatureEvent {
    const timeSignature = new TimeSignatureEvent({ ticks, numerator, denominator });
    const insertIndex = greaterEqual(
      this.timeSignatures,
      timeSignature,
      (a: TimeSignatureEvent, b: TimeSignatureEvent) => a.getTicks() - b.getTicks(),
    );
    if (insertIndex < 0) {
      this.timeSignatures.push(timeSignature);
    } else {
      this.timeSignatures.splice(insertIndex, 0, timeSignature);
    }
    return timeSignature;
  }

  /**
   *
   * @returns End tick of the last note.
   */
  getLastTick() {
    let lastTick = 0;

    for (const track of this.tracks) {
      lastTick = Math.max(lastTick, track.getTrackEndTick());
    }
    return lastTick;
  }

  /**
   * @returns Total duration of the song in seconds.
   */
  getDuration() {
    return this.tickToSeconds(this.getLastTick());
  }

  tickToSeconds(tick: number) {
    if (tick === 0) {
      return 0;
    }
    const baseTempoIndex = lowerThan(
      this.getTempoChanges(),
      // @ts-ignore
      { getTicks: () => tick },
      (a, b) => a.getTicks() - b.getTicks(),
    );
    if (baseTempoIndex == -1) {
      return -1;
    }
    const baseTempoChange = this.getTempoChanges()[baseTempoIndex];
    const ticksDelta = tick - baseTempoChange.getTicks();
    const ticksPerSecondSinceLastTempoChange = Song.tempoBPMToTicksPerSecond(
      baseTempoChange.getBpm() as number,
      this.getResolution(),
    );
    return baseTempoChange.getTime() + ticksDelta / ticksPerSecondSinceLastTempoChange;
  }

  secondsToTick(seconds: number) {
    const baseTempoIndex = lowerThan(
      this.getTempoChanges(),
      // @ts-ignore
      { getTime: () => seconds },
      (a, b) => a.getTime() - b.getTime(),
    );
    if (baseTempoIndex == -1) {
      return -1;
    }
    const baseTempoChange = this.getTempoChanges()[baseTempoIndex];
    const timeDelta = seconds - baseTempoChange.getTime();
    const ticksPerSecondSinceLastTempoChange = Song.tempoBPMToTicksPerSecond(
      baseTempoChange.getBpm(),
      this.getResolution(),
    );
    return Math.round(baseTempoChange.getTicks() + timeDelta * ticksPerSecondSinceLastTempoChange);
  }

  protected setPluginContextInternal(plugin: TuneflowPlugin) {
    this.pluginContext = {
      plugin,
      numTracksCreatedByPlugin: 0,
    };
  }

  private getNextTrackId() {
    const pluginContext = this.pluginContext as PluginContext;
    // @ts-ignore
    const pluginGeneratedTrackIds = pluginContext.plugin.generatedTrackIdsInternal;
    if (pluginContext.numTracksCreatedByPlugin === pluginGeneratedTrackIds.length) {
      // @ts-ignore
      pluginGeneratedTrackIds.push(Track.generateTrackIdInternal());
    } else if (pluginContext.numTracksCreatedByPlugin > pluginGeneratedTrackIds.length) {
      throw new Error('Plugin generated track ids out of sync.');
    }
    const nextTrackId = pluginGeneratedTrackIds[pluginContext.numTracksCreatedByPlugin];
    pluginContext.numTracksCreatedByPlugin += 1;
    // @ts-ignore
    return nextTrackId;
  }

  private getNextTrackRank() {
    const nextRank = this.nextTrackRank;
    this.nextTrackRank += 1;
    return nextRank;
  }

  private checkAccess(accessName: string) {
    if (!this.pluginContext) {
      throw new Error(
        `Song needs to be accessed in a plugin context in order to use privileged methods.`,
      );
    }
    if (!(this.pluginContext.plugin.songAccess() as any)[accessName]) {
      throw new Error(
        `Plugin ${(
          this.pluginContext.plugin.constructor as any
        ).id()} requires access ${accessName} in order to run.`,
      );
    }
  }

  private static tempoBPMToTicksPerSecond(tempoBPM: number, ticksPerBeat: number) {
    return (tempoBPM * ticksPerBeat) / 60;
  }

  /**
   * Recalculate all tempo event time.
   */
  private retimingTempoEvents() {
    this.tempos.sort((a, b) => a.getTicks() - b.getTicks());
    // Re-calculate all tempo event time.
    for (const tempoEvent of this.tempos) {
      tempoEvent.setTimeInternal(this.tickToSeconds(tempoEvent.getTicks()));
    }
  }
}

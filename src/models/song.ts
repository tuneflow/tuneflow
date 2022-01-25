import { v4 as uuidv4 } from 'uuid';
import { ge as greaterEqual, lt as lowerThan } from 'binary-search-bounds';
import * as _ from 'underscore';
import type { TuneflowPlugin } from '../base_plugin';

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
}

/**
 * Information about how a note should be played.
 */
export class Note {
  private pitch: number;
  private velocity: number;
  private startTick: number;
  private endTick: number;

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
}

/**
 * A track in the song that maps to an instrument.
 *
 * It contains notes, instrument information, play status(volume, muted, etc.), and more.
 */
export class Track {
  private insturment: InstrumentInfo;
  /** Visible part of the notes. */
  private notes: Note[];
  /** All notes, including those that are not visible. */
  private rawNotes: Note[];
  private suggestedInstruments: InstrumentInfo[];
  private uuid: string;
  private volume: number;
  private solo: boolean;
  private muted: boolean;
  private rank: number;
  private trackStartTick = 0;
  private trackEndTick = 0;

  constructor({
    uuid = uuidv4(),
    notes = [],
    instrument = new InstrumentInfo({ program: 0, isDrum: false }),
    suggestedInstruments = [],
    volume = 1,
    solo = false,
    muted = false,
    rank = 0,
  }: {
    /**
     * The universal-unique identifier of the track.
     *
     * In most cases, leave it blank and it will be automatically assigned.
     */
    uuid?: string;
    /** Notes of the track. */
    notes?: Note[];
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
    this.insturment = instrument;
    this.notes = [...notes];
    this.rawNotes = [...notes];
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

  /**
   * Get currently visible notes.
   */
  getNotes() {
    return this.notes;
  }

  /**
   * Get all notes, including those that are not visible.
   */
  getRawNotes() {
    return this.rawNotes;
  }

  /**
   * Adds a note to the track and returns it.
   */
  createNote({
    pitch,
    velocity,
    startTick,
    endTick,
  }: {
    /** An integer value between 0 - 127 */
    pitch: number;
    /** An integer value between 0 - 127 */
    velocity: number;
    /** An integer value indicating the start tick. */
    startTick: number;
    /** An integer value indicating the end tick. */
    endTick: number;
  }) {
    const note = new Note({
      pitch,
      velocity,
      startTick,
      endTick,
    });
    this.orderedInsertNote(this.rawNotes, note);
    if (this.isNoteVisible(note)) {
      this.orderedInsertNote(this.notes, note);
    }
    this.trackEndTick = Math.max(this.trackEndTick, note.getEndTick());
    return note;
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

  getTrackStartTick() {
    return this.trackStartTick;
  }

  getTrackEndTick() {
    return this.trackEndTick;
  }

  adjustTrackLeft(trackStartTick: number) {
    if (trackStartTick > this.trackEndTick) {
      this.trackStartTick = this.trackEndTick;
    } else {
      this.trackStartTick = trackStartTick;
    }
    this.syncNotesInternal();
  }

  adjustTrackRight(trackEndTick: number) {
    if (trackEndTick < this.trackStartTick) {
      this.trackEndTick = this.trackStartTick;
    } else {
      this.trackEndTick = trackEndTick;
    }
    this.syncNotesInternal();
  }

  moveTrack(offsetTick: number) {
    this.trackStartTick = Math.max(0, this.trackStartTick + offsetTick);
    this.trackEndTick = Math.max(0, this.trackEndTick + offsetTick);
    for (const note of this.rawNotes) {
      note.setStartTick(note.getStartTick() + offsetTick);
      note.setEndTick(note.getEndTick() + offsetTick);
    }
    this.syncNotesInternal();
  }

  /**
   * Re-calculate notes from rawNotes, based on the start and end tick of the track.
   */
  private syncNotesInternal() {
    this.notes = _.filter(this.rawNotes, note => this.isNoteVisible(note));
  }

  private isNoteVisible(note: Note) {
    return note.getStartTick() >= this.trackStartTick && note.getEndTick() <= this.trackEndTick;
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
    const track = new Track({ uuid: this.getNextTrackId(), rank: this.getNextTrackRank() });
    if (index !== undefined && index !== null) {
      this.tracks.splice(index, 0, track);
    } else {
      this.tracks.push(track);
    }
    return track;
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
      pluginGeneratedTrackIds.push(uuidv4());
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

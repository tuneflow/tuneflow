import { v4 as uuidv4 } from 'uuid';

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
  private startTime: number;
  private endTick: number;
  private endTime: number;

  constructor({
    pitch,
    velocity,
    startTick,
    startTime,
    endTick,
    endTime,
  }: {
    pitch: number;
    velocity: number;
    startTick: number;
    startTime: number;
    endTick: number;
    endTime: number;
  }) {
    this.pitch = pitch;
    this.velocity = velocity;
    this.startTick = startTick;
    this.startTime = startTime;
    this.endTick = endTick;
    this.endTime = endTime;
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

  getStartTime() {
    return this.startTime;
  }

  getEndTick() {
    return this.endTick;
  }

  getEndTime() {
    return this.endTime;
  }
}

/**
 * A track in the song that maps to an instrument.
 *
 * It contains notes, instrument information, play status(volume, muted, etc.), and more.
 */
export class Track {
  private insturment: InstrumentInfo;
  private notes: Note[];
  private suggestedInstruments: InstrumentInfo[];
  private uuid: string;
  private volume: number;
  private solo: boolean;
  private muted: boolean;

  constructor({
    uuid = uuidv4(),
    notes = [],
    instrument = new InstrumentInfo({ program: 0, isDrum: false }),
    suggestedInstruments = [],
    volume = 1,
    solo = false,
    muted = false,
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
  }) {
    this.insturment = instrument;
    this.notes = notes;
    this.suggestedInstruments = suggestedInstruments;
    this.uuid = uuid;
    this.volume = volume;
    this.solo = solo;
    this.muted = muted;
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

  getNotes() {
    return this.notes;
  }

  /**
   * Adds a note to the track and returns it.
   */
  createNote({
    pitch,
    velocity,
    startTick,
    startTime,
    endTick,
    endTime,
  }: {
    /** An integer value between 0 - 127 */
    pitch: number;
    /** An integer value between 0 - 127 */
    velocity: number;
    /** An integer value indicating the start tick. */
    startTick: number;
    /** A float value indicating the start time in seconds. */
    startTime: number;
    /** An integer value indicating the end tick. */
    endTick: number;
    /** A float value indicating the end time in seconds. */
    endTime: number;
  }) {
    const note = new Note({
      pitch,
      velocity,
      startTick,
      startTime,
      endTick,
      endTime,
    });
    this.notes.push(note);
    return note;
  }

  getSuggestedInstruments() {
    return this.suggestedInstruments;
  }

  /**
   * Adds a suggested instrument and returns it.
   * @param program
   * @param isDrum
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

  getUuid() {
    return this.uuid;
  }

  /**
   * In most cases, you don't need to use this method and just let the pipeline assign an id for the track.
   * @param uuid
   */
  setUuid(uuid: string) {
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
    /** The time in seconds at which this event happens. */
    time: number;
  }) {
    this.ticks = ticks;
    this.bpm = bpm;
    this.time = time;
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

  getBpm(): number {
    return this.bpm;
  }

  /**
   *
   * @param bpm The new tempo in BPM(Beats-per-minute) format.
   */
  setBpm(bpm: number) {
    this.bpm = bpm;
  }

  getTime(): number {
    return this.time;
  }

  /**
   *
   * @param time The time in seconds at which this event happens.
   */
  setTime(time: number) {
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

export class Song {
  private tracks: Track[];
  private PPQ: number;
  private tempos: TempoEvent[];
  private timeSignatures: TimeSignatureEvent[];

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

  /**
   * Adds a new track into the song and returns it.
   */
  createTrack(): Track {
    const track = new Track({});
    this.tracks.push(track);
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
   * @param ticks
   * @param bpm
   * @param time
   * @returns
   */
  createTempoChange({
    ticks,
    bpm,
    time,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    /** The new tempo in BPM(Beats-per-minute) format. */
    bpm: number;
    /** The time in seconds at which this event happens. */
    time: number;
  }): TempoEvent {
    const tempoChange = new TempoEvent({ ticks, bpm, time });
    this.tempos.push(tempoChange);
    return tempoChange;
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
    this.timeSignatures.push(timeSignature);
    return timeSignature;
  }

  /**
   *
   * @returns End tick of the last note.
   */
  getLastTick() {
    let lastTick = 0;

    for (const track of this.tracks) {
      if (track.getNotes().length == 0) {
        continue;
      }
      lastTick = Math.max(lastTick, track.getNotes()[track.getNotes().length - 1].getEndTick());
    }
    return lastTick;
  }

  /**
   * @returns Total duration of the song in seconds.
   */
  getDuration() {
    let duration = 0.0;
    for (const track of this.tracks) {
      if (track.getNotes().length == 0) {
        continue;
      }
      duration = Math.max(duration, track.getNotes()[track.getNotes().length - 1].getEndTime());
    }
    return duration;
  }
}

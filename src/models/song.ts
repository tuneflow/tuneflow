import { ge as greaterEqual, lt as lowerThan, le as lowerEqual } from 'binary-search-bounds';
import cloneDeep from 'lodash.clonedeep';
import * as _ from 'underscore';
import type { TuneflowPlugin } from '../base_plugin';
import { TempoEvent } from './tempo';
import { TimeSignatureEvent } from './time_signature';
import { Track, TrackOutputType, TrackSend, TrackType } from './track';
import type { AuxTrackData, TrackOutput } from './track';
import { Midi } from '@tonejs/midi';
import { AutomationTarget, AutomationTargetType } from './automation';
import type { AutomationValue } from './automation';
import { AudioPlugin } from './audio_plugin';
import { StructureMarker } from './marker';
import type { StructureType } from './marker';

export class Song {
  /** The default PPQ used in TuneFlow. */
  static DEFAULT_PPQ = 480;

  static NUM_BUSES = 32;

  private masterTrack?: Track;
  private tracks: Track[];
  private PPQ: number;
  private tempos: TempoEvent[];
  private timeSignatures: TimeSignatureEvent[];
  private structures: StructureMarker[];
  private pluginContext?: PluginContext;
  private nextTrackRank = 1;
  private buses: Bus[] = [];

  constructor() {
    this.tracks = [];
    this.PPQ = 0;
    this.tempos = [];
    this.timeSignatures = [];
    this.structures = [];
  }

  getBusByRank(rank: number) {
    return this.buses[rank - 1];
  }

  setBus(rank: number, name: string) {
    if (rank > Song.NUM_BUSES) {
      throw new Error(`Only ${Song.NUM_BUSES} buses are supported.`);
    }
    const index = rank - 1;
    if (!this.buses[index]) {
      this.buses[index] = new Bus({ rank, name });
    } else {
      this.buses[index].setName(name);
    }
  }

  getMasterTrack() {
    if (!this.masterTrack) {
      this.masterTrack = new Track({
        type: TrackType.MASTER_TRACK,
        song: this,
        // @ts-ignore
        uuid: Track.generateTrackIdInternal(),
      });
    }
    return this.masterTrack;
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

  getTracksByIds(trackIds: string[]) {
    if (!this.tracks) {
      return [];
    }
    const trackIdSet = new Set<string>(trackIds);
    return this.tracks.filter(track => trackIdSet.has(track.getId()));
  }

  /**
   * Get the index of the track within the tracks list.
   * Returns -1 if no track matches the track id.
   */
  getTrackIndex(trackId: string) {
    return _.findIndex(this.tracks, track => track.getId() === trackId);
  }

  /**
   * Adds a new track into the song and returns it.
   *
   * Requires `createTrack` access.
   */
  createTrack({
    type,
    index,
    rank,
    assignDefaultSamplerPlugin = false,
  }: {
    type: TrackType;
    /** Index to insert at. If left blank, appends to the end. */
    index?: number;
    /** The displayed rank which uniquely identifies a track. Internal use, do not set this. */
    rank?: number;
    /** Whether to assign a default sampler plugin if type is `MIDI_TRACK`. */
    assignDefaultSamplerPlugin?: boolean;
  }): Track {
    if (rank == undefined || rank === null) {
      rank = this.getNextTrackRank();
    } else {
      this.nextTrackRank = Math.max(rank + 1, this.nextTrackRank);
    }
    const track = new Track({
      type,
      song: this,
      uuid: this.getNextTrackId(),
      rank: rank == undefined || rank === null ? this.getNextTrackRank() : rank,
    });
    if (assignDefaultSamplerPlugin && type === TrackType.MIDI_TRACK) {
      track.setSamplerPlugin(track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));
    }
    if (type === TrackType.AUX_TRACK) {
      (track.getAuxTrackData() as AuxTrackData).setInputBusRank(1);
    }
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
      type: track.getType(),
      index: trackIndex,
    });
    newTrack.setVolume(track.getVolume());
    newTrack.setPan(track.getPan());
    newTrack.setSolo(track.getSolo());
    newTrack.setMuted(track.getMuted());
    if (track.getType() === TrackType.MIDI_TRACK) {
      const trackInstrument = track.getInstrument();
      if (trackInstrument) {
        newTrack.setInstrument({
          program: trackInstrument.getProgram(),
          isDrum: trackInstrument.getIsDrum(),
        });
      }

      for (const existingInstrument of track.getSuggestedInstruments()) {
        newTrack.createSuggestedInstrument({
          program: existingInstrument.getProgram(),
          isDrum: existingInstrument.getIsDrum(),
        });
      }

      const existingSamplerPlugin = track.getSamplerPlugin();
      if (existingSamplerPlugin) {
        newTrack.setSamplerPlugin(existingSamplerPlugin.clone(newTrack));
      }
    }

    for (let i = 0; i < Track.MAX_NUM_EFFECTS_PLUGINS; i += 1) {
      const audioPlugin = track.getAudioPluginAt(i);
      if (!audioPlugin) {
        continue;
      }
      newTrack.setAudioPluginAt(i, audioPlugin.clone(newTrack));
    }
    for (const clip of track.getClips()) {
      const newClip = newTrack.cloneClip(clip);
      newTrack.insertClip(newClip);
    }
    // Clone aux data
    const auxTrackData = track.getAuxTrackData();
    if (
      auxTrackData &&
      _.isNumber(auxTrackData.getInputBusRank()) &&
      (auxTrackData.getInputBusRank() as number) > 0
    ) {
      (newTrack.getAuxTrackData() as AuxTrackData).setInputBusRank(
        auxTrackData.getInputBusRank() as number,
      );
    }
    // Clone sends.
    for (let i = 0; i < Track.MAX_NUM_SENDS; i += 1) {
      const send = track.getSendAt(i);
      if (!send) {
        continue;
      }
      newTrack.setSendAt(
        i,
        new TrackSend({
          outputBusRank: send.getOutputBusRank(),
          gainLevel: send.getGainLevel(),
          position: send.getPosition(),
          muted: send.getMuted(),
        }),
      );
    }
    // Clone automation.
    if (track.hasAnyAutomation()) {
      newTrack.setAutomation(track.getAutomation());
    }
    // Clone track output.
    if (track.getOutput()) {
      const originalOutput = track.getOutput() as TrackOutput;
      newTrack.setOutput({
        type: originalOutput.getType(),
        trackId: originalOutput.getTrackId(),
      });
    }
    return newTrack;
  }

  /**
   * Removes a new track from the song and returns it.
   *
   * Requires `removeTrack` access.
   */
  removeTrack(trackId: string) {
    const track = this.getTrackById(trackId);
    if (!track) {
      return null;
    }
    this.tracks.splice(
      _.findIndex(this.tracks, track => track.getId() === trackId),
      1,
    );
    // Delete dependencies.
    for (const depTrack of this.tracks) {
      const trackOutput = depTrack.getOutput();
      if (
        trackOutput &&
        trackOutput.getType() === TrackOutputType.Track &&
        trackOutput.getTrackId() === trackId
      ) {
        depTrack.removeOutput();
      }
    }
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

  static getLeadingBar(tick: number, barBeats: BarBeat[]) {
    if (!barBeats || barBeats.length === 0) {
      return null;
    }
    if (tick < 0) {
      return barBeats[0];
    }
    let index = lowerEqual(barBeats, { tick } as any, (a, b) => a.tick - b.tick);
    while (index > 0 && barBeats[index].beat !== 1) {
      index -= 1;
    }
    return barBeats[index];
  }

  static getLeadingBeat(tick: number, barBeats: BarBeat[]) {
    if (!barBeats || barBeats.length === 0) {
      return null;
    }
    if (tick < 0) {
      return barBeats[0];
    }
    const index = lowerEqual(barBeats, { tick } as any, (a, b) => a.tick - b.tick);
    return barBeats[index];
  }

  static getTrailingBeat(tick: number, barBeats: BarBeat[]) {
    if (!barBeats || barBeats.length === 0) {
      return null;
    }
    if (tick < 0) {
      return barBeats[0];
    }
    const index = greaterEqual(barBeats, { tick } as any, (a, b) => a.tick - b.tick);
    if (index > barBeats.length - 1) {
      return barBeats[barBeats.length - 1];
    }
    return barBeats[index];
  }

  static getClosestBeat(tick: number, barBeats: BarBeat[]) {
    if (!barBeats || barBeats.length === 0) {
      return null;
    }
    if (tick < 0) {
      return barBeats[0];
    }
    const index = lowerEqual(barBeats, { tick } as any, (a, b) => a.tick - b.tick);

    if (index >= barBeats.length - 1) {
      return barBeats[index];
    }
    if (Math.abs(barBeats[index].tick - tick) > Math.abs(barBeats[index + 1].tick - tick)) {
      // tick is closer to the next beat.
      return barBeats[index + 1];
    }
    return barBeats[index];
  }

  getBarBeats(endTick: number) {
    return Song.getBarBeatsImpl<TimeSignatureEvent>(
      endTick,
      this.PPQ,
      this.timeSignatures,
      signature => ({
        tick: signature.getTicks(),
        numerator: signature.getNumerator(),
        denominator: signature.getDenominator(),
      }),
    );
  }

  /** Gets a list of all bar beats and the corresponding ticks. */
  static getBarBeatsImpl<T>(
    endTick: number,
    ppq: number,
    timeSignatures: T[],
    parseTimeSignatureFn: (signature: T) => any,
  ): BarBeat[] {
    if (timeSignatures.length === 0) {
      return [];
    }
    // Dedupe time signatures.
    const dedupedTimeSignatures = [];
    for (let i = 0; i < timeSignatures.length; i += 1) {
      if (dedupedTimeSignatures.length === 0) {
        dedupedTimeSignatures.push(timeSignatures[i]);
      } else {
        const currentTimeSignatureInfo = parseTimeSignatureFn(timeSignatures[i]);
        const prevTimeSignatureInfo = parseTimeSignatureFn(
          dedupedTimeSignatures[dedupedTimeSignatures.length - 1],
        );
        if (
          currentTimeSignatureInfo.numerator !== prevTimeSignatureInfo.numerator ||
          currentTimeSignatureInfo.denominator !== prevTimeSignatureInfo.denominator
        ) {
          dedupedTimeSignatures.push(timeSignatures[i]);
        }
      }
    }
    // Calculate bar beats.
    const barBeats: BarBeat[] = [];
    let currentTick = 0;
    let currentTimeSignatureIndex = 0;
    let bar = 1;
    let beat = 1;

    while (currentTick <= endTick) {
      if (currentTimeSignatureIndex < dedupedTimeSignatures.length - 1) {
        const nextTimeSignatureInfo = parseTimeSignatureFn(
          dedupedTimeSignatures[currentTimeSignatureIndex + 1],
        );
        const nextSwitchingTick = nextTimeSignatureInfo.tick;
        if (currentTick >= nextSwitchingTick) {
          currentTick = nextSwitchingTick;
          currentTimeSignatureIndex += 1;
          if (beat > 1) {
            // The bar before the time signature change did not finish,
            // move on to the next bar.
            beat = 1;
            bar += 1;
          }
        }
      }
      const currentTimeSignatureInfo = parseTimeSignatureFn(
        dedupedTimeSignatures[currentTimeSignatureIndex],
      );
      barBeats.push({
        bar,
        beat,
        tick: currentTick,
        numerator: beat === 1 ? currentTimeSignatureInfo.numerator : undefined,
        denominator: beat === 1 ? currentTimeSignatureInfo.denominator : undefined,
        ticksPerBeat: beat === 1 ? (ppq * 4) / currentTimeSignatureInfo.denominator : undefined,
      });

      if (beat >= currentTimeSignatureInfo.numerator) {
        beat = 1;
        bar += 1;
      } else {
        beat += 1;
      }
      currentTick += (ppq * 4) / currentTimeSignatureInfo.denominator;
    }
    return barBeats;
  }

  /**
   * @returns A list of tempo change events ordered by occurrence time.
   */
  getTempoChanges(): TempoEvent[] {
    return this.tempos;
  }

  getTempoAtTick(tick: number) {
    return Song.getTempoAtTickImpl<TempoEvent>(
      tick,
      this.tempos,
      tick =>
        ({
          getTicks: () => tick,
        } as any),
      tempo => tempo.getTicks(),
    );
  }

  static getTempoAtTickImpl<T>(
    tick: number,
    tempos: T[],
    tickToTempoFn: (tick: number) => T,
    tempoToTickFn: (tempo: T) => number,
  ): T {
    let index = lowerEqual(
      tempos,
      tickToTempoFn(tick),
      (a, b) => tempoToTickFn(a) - tempoToTickFn(b),
    );
    if (index < 0) {
      index = 0;
    }
    if (index >= tempos.length) {
      index = tempos.length - 1;
    }
    return tempos[index];
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
    if (this.PPQ <= 0) {
      throw new Error('Song resolution must be provided before creating tempo changes.');
    }
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

  removeTempoChange(index: number) {
    if (this.getTempoChanges().length <= 1) {
      throw new Error('Song has to have at least one tempo change.');
    }
    if (index === 0) {
      throw new Error('Cannot remove the first tempo.');
    }
    this.getTempoChanges().splice(index, /* deleteCount= */ 1);
    this.retimingTempoEvents();
  }

  /**
   * Overwrite the existing tempo changes with the new tempo changes. Tempo times will be re-calculated.
   *
   * You can omit time in the new `TempoEvent`s since we'll re-calculate them altogether.
   *
   * Note that the new tempo events must have one tempo event starting at tick 0.
   * @param tempoEvents
   */
  overwriteTempoChanges(tempoEvents: TempoEvent[]) {
    if (tempoEvents.length === 0) {
      throw new Error('Cannot clear all the tempo events.');
    }
    const sortedTempoEvents = cloneDeep(tempoEvents);
    sortedTempoEvents.sort((a: any, b: any) => a.getTicks() - b.getTicks());
    const firstTempoEvent = sortedTempoEvents[0];
    if (firstTempoEvent.getTicks() > 0) {
      throw new Error('The first tempo event needs to start from tick 0');
    }
    this.tempos = [
      new TempoEvent({
        ticks: 0,
        time: 0,
        bpm: firstTempoEvent.getBpm(),
      }),
    ];
    for (let i = 1; i < sortedTempoEvents.length; i += 1) {
      const tempoEvent = sortedTempoEvents[i];
      this.createTempoChange({
        ticks: tempoEvent.getTicks(),
        bpm: tempoEvent.getBpm(),
      });
    }
    this.retimingTempoEvents();
  }

  updateTempo(tempoEvent: TempoEvent, newBPM: number) {
    tempoEvent.setBpmInternal(newBPM);
    this.retimingTempoEvents();
  }

  moveTempo(tempoIndex: number, moveToTick: number) {
    const tempo = this.getTempoChanges()[tempoIndex];
    if (!tempo) {
      return;
    }
    if (tempoIndex === 0) {
      // Cannot move the first tempo.
      return;
    }
    const prevTempo = this.getTempoChanges()[tempoIndex - 1];
    if (prevTempo.getTicks() === moveToTick) {
      // Moved to another tempo, delete it.
      this.removeTempoChange(tempoIndex - 1);
    } else if (tempoIndex < this.getTempoChanges().length - 1) {
      const nextTempo = this.getTempoChanges()[tempoIndex + 1];
      if (nextTempo && nextTempo.getTicks() === moveToTick) {
        // Moved to another tempo, delete it.
        this.removeTempoChange(tempoIndex + 1);
      }
    }

    // @ts-ignore
    tempo.ticks = moveToTick;
    this.retimingTempoEvents();
  }

  /**
   * Create a new tempo at the tick or update the existing
   * tempo if any.
   * @param tick
   * @param newBPM
   */
  updateTempoAtTick(tick: number, newBPM: number) {
    const existingEvent = this.getTempoAtTick(tick);
    if (existingEvent) {
      this.updateTempo(existingEvent, newBPM);
    } else {
      this.createTempoChange({
        ticks: tick,
        bpm: newBPM,
      });
    }
  }

  getTimeSignatures(): TimeSignatureEvent[] {
    return this.timeSignatures;
  }

  /**
   * Overwrite all existing time signatures with the given new time signatures.
   * @param timeSignatures
   */
  overwriteTimeSignatures(timeSignatures: TimeSignatureEvent[]) {
    if (timeSignatures.length === 0) {
      throw new Error('At least one time signature needs to be present.');
    }
    this.timeSignatures = cloneDeep(timeSignatures);
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

  removeTimeSignature(index: number) {
    if (this.getTimeSignatures().length <= 1) {
      throw new Error('Song has to have at least one time signature change.');
    }
    if (index === 0) {
      throw new Error('Cannot remove the first time signature.');
    }
    this.getTimeSignatures().splice(index, /* deleteCount= */ 1);
  }

  /**
   * Create a new time signature at the tick or update the existing
   * signature if any.
   * @param tick
   */
  updateTimeSignatureAtTick(tick: number, numerator: number, denominator: number) {
    const existingEvent = this.getTimeSignatureAtTick(tick);
    if (existingEvent) {
      existingEvent.setNumerator(numerator);
      existingEvent.setDenominator(denominator);
    } else {
      this.createTimeSignature({
        ticks: tick,
        numerator,
        denominator,
      });
    }
  }

  moveTimeSignature(timeSignatureIndex: number, moveToTick: number) {
    const timeSignature = this.getTimeSignatures()[timeSignatureIndex];
    if (!timeSignature) {
      return;
    }
    if (timeSignatureIndex == 0) {
      // Cannot move the first time signature.
      return;
    }
    const prevTimeSignature = this.getTimeSignatures()[timeSignatureIndex - 1];
    if (prevTimeSignature.getTicks() === moveToTick) {
      // Moved to another time signature, delete it.
      this.removeTimeSignature(timeSignatureIndex - 1);
    } else if (timeSignatureIndex < this.getTimeSignatures().length - 1) {
      const nextTimeSignature = this.getTimeSignatures()[timeSignatureIndex + 1];
      if (nextTimeSignature && nextTimeSignature.getTicks() === moveToTick) {
        // Moved to another time signature, delete it.
        this.removeTimeSignature(timeSignatureIndex + 1);
      }
    }

    // @ts-ignore
    timeSignature.ticks = moveToTick;
    this.timeSignatures.sort((a, b) => a.getTicks() - b.getTicks());
  }

  getStructures() {
    return this.structures;
  }

  getStructureAtIndex(index: number) {
    return this.structures[index];
  }

  getStructureAtTick(tick: number) {
    return Song.getStructureAtTickImpl<StructureMarker>(
      tick,
      this.structures,
      tick => ({ getTick: () => tick } as any),
      structure => structure.getTick(),
    );
  }

  static getStructureAtTickImpl<T>(
    tick: number,
    structures: T[],
    tickToStructureFn: (tick: number) => T,
    structureToTickFn: (structure: T) => number,
  ): T {
    let index = lowerEqual(
      structures,
      tickToStructureFn(tick),
      (a, b) => structureToTickFn(a) - structureToTickFn(b),
    );
    if (index < 0) {
      index = 0;
    }
    if (index >= structures.length) {
      index = structures.length - 1;
    }
    return structures[index];
  }

  createStructure({
    tick,
    type,
    customName,
  }: {
    tick: number;
    type: StructureType;
    customName?: string;
  }) {
    const structure = new StructureMarker({
      tick,
      type,
      customName,
    });
    this.structures.push(structure);
    if (this.structures.length === 1) {
      // If there are only 1 structure, move it to the start.
      structure.setTick(0);
    }
    this.structures.sort((a, b) => a.getTick() - b.getTick());
  }

  moveStructure(structureIndex: number, moveToTick: number) {
    const structure = this.getStructures()[structureIndex];
    if (!structure) {
      return;
    }
    if (structureIndex <= 0) {
      return;
    }
    const prevStructure = this.getStructures()[structureIndex - 1];
    if (prevStructure.getTick() === moveToTick) {
      // Moved to another structure, delete it.
      this.removeStructure(structureIndex - 1);
    } else if (structureIndex < this.getStructures().length - 1) {
      const nextStructure = this.getStructures()[structureIndex + 1];
      if (nextStructure && nextStructure.getTick() === moveToTick) {
        // Moved to another time signature, delete it.
        this.removeStructure(structureIndex + 1);
      }
    }

    // @ts-ignore
    structure.tick = moveToTick;
    this.structures.sort((a, b) => a.getTick() - b.getTick());
  }

  updateStructureAtTick(tick: number, type: StructureType) {
    const existinStructure = this.getStructureAtTick(tick);
    if (existinStructure) {
      existinStructure.setType(type);
    } else {
      this.createStructure({
        tick,
        type,
      });
    }
  }

  removeStructure(index: number) {
    if (index < 0 || index >= this.structures.length) {
      return;
    }
    this.getStructures().splice(index, /* deleteCount= */ 1);
    if (this.structures.length > 0 && this.structures[0].getTick() > 0) {
      // If the first structure of the remaining ones does not start
      // from 0, move it to 0.
      this.structures[0].setTick(0);
    }
    this.structures.sort((a, b) => a.getTick() - b.getTick());
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

  /**
   * This is the number of ticks per beat based on the time signature.
   *
   * This should be distinguished from `getResolution()`, which is
   * the number of ticks per quater note.
   */
  getTicksPerBeatAtTick(tick: number) {
    const timeSignature = this.getTimeSignatureAtTick(tick);
    return this.getResolution() * (4 / timeSignature.getDenominator());
  }

  getTimeSignatureAtTick(tick: number) {
    return Song.getTimeSignatureAtTickImpl<TimeSignatureEvent>(
      tick,
      this.timeSignatures,
      tick =>
        ({
          getTicks: () => tick,
        } as any),
      timeSignature => timeSignature.getTicks(),
    );
  }

  static getTimeSignatureAtTickImpl<T>(
    tick: number,
    timeSignatures: T[],
    tickToTimeSignatureFn: (tick: number) => T,
    timeSignatureToTickFn: (timeSignature: T) => number,
  ): T {
    let index = lowerEqual(
      timeSignatures,
      tickToTimeSignatureFn(tick),
      (a, b) => timeSignatureToTickFn(a) - timeSignatureToTickFn(b),
    );
    if (index < 0) {
      index = 0;
    }
    if (index >= timeSignatures.length) {
      index = timeSignatures.length - 1;
    }
    return timeSignatures[index];
  }

  tickToSeconds(tick: number) {
    return Song.tickToSecondsImpl<TempoEvent>(
      tick,
      this.getTempoChanges(),
      this.getResolution(),
      tick =>
        ({
          getTicks: () => tick,
        } as any),
      tempo => tempo.getTicks(),
      tempo => ({
        tick: tempo.getTicks(),
        bpm: tempo.getBpm(),
        time: tempo.getTime(),
      }),
    );
  }

  static tickToSecondsImpl<T>(
    tick: number,
    tempos: T[],
    resolution: number,
    tickToTempoFn: (tick: number) => T,
    tempoToTickFn: (tempo: T) => number,
    parseTempoFn: (tempo: T) => any,
  ): number {
    if (tick === 0) {
      return 0;
    }
    let baseTempoIndex = lowerThan(
      tempos,
      tickToTempoFn(tick),
      (a, b) => tempoToTickFn(a) - tempoToTickFn(b),
    );
    if (baseTempoIndex == -1) {
      // If no tempo is found before the tick, use the first tempo.
      baseTempoIndex = 0;
    }
    const baseTempoChange = tempos[baseTempoIndex];
    const baseTempoInfo = parseTempoFn(baseTempoChange);
    const ticksDelta = tick - baseTempoInfo.tick;
    const ticksPerSecondSinceLastTempoChange = Song.tempoBPMToTicksPerSecond(
      baseTempoInfo.bpm as number,
      resolution,
    );
    return baseTempoInfo.time + ticksDelta / ticksPerSecondSinceLastTempoChange;
  }

  secondsToTick(seconds: number) {
    return Song.secondsToTickImpl<TempoEvent>(
      seconds,
      this.PPQ,
      this.tempos,
      seconds => ({ getTime: () => seconds } as any),
      tempo => tempo.getTime(),
      tempo => ({
        tick: tempo.getTicks(),
        bpm: tempo.getBpm(),
        time: tempo.getTime(),
      }),
    );
  }

  advanceTickByBars(
    originalTick: number,
    offsetBar: number,
    offsetBeat: number,
    barBeats: BarBeat[],
  ) {
    if (originalTick < 0) {
      // Cannot offset negative tick
      return null;
    }
    if (offsetBar < 0 || offsetBeat < 0) {
      // Bar and beat offsets have to be positive;
      return null;
    }
    let barBeatIndex = lowerEqual(
      barBeats,
      { tick: originalTick } as any,
      (a, b) => a.tick - b.tick,
    );
    const startingBarBeat = barBeats[barBeatIndex < 0 ? 0 : barBeatIndex];
    if (!startingBarBeat) {
      return null;
    }
    for (; barBeatIndex < barBeats.length; barBeatIndex += 1) {
      const currentBarBeat = barBeats[barBeatIndex];
      if (currentBarBeat.bar - startingBarBeat.bar >= offsetBar) {
        if (
          currentBarBeat.bar - startingBarBeat.bar > offsetBar ||
          currentBarBeat.beat >= offsetBeat + 1
        ) {
          break;
        }
      }
    }
    const endingBarBeat = barBeats[barBeatIndex];
    return endingBarBeat ? endingBarBeat.tick : null;
  }

  static secondsToTickImpl<T>(
    seconds: number,
    resolution: number,
    tempos: T[],
    secondsToTempoFn: (seconds: number) => T,
    tempoToSecondsFn: (tempo: T) => number,
    parseTempoFn: (tempo: T) => any,
  ) {
    if (seconds === 0) {
      return 0;
    }
    let baseTempoIndex = lowerThan(
      tempos,
      secondsToTempoFn(seconds),
      (a, b) => tempoToSecondsFn(a) - tempoToSecondsFn(b),
    );
    if (baseTempoIndex == -1) {
      // If no tempo is found before the time, use the first tempo.
      baseTempoIndex = 0;
    }
    const baseTempoChange = tempos[baseTempoIndex];
    const baseTempoInfo = parseTempoFn(baseTempoChange);
    const timeDelta = seconds - baseTempoInfo.time;
    const ticksPerSecondSinceLastTempoChange = Song.tempoBPMToTicksPerSecond(
      baseTempoInfo.bpm,
      resolution,
    );
    return Math.round(baseTempoInfo.tick + timeDelta * ticksPerSecondSinceLastTempoChange);
  }

  /** Import a midi file into the song, returns the newly created tracks. */
  static importMIDI(
    song: Song,
    fileBuffer: ArrayBuffer,
    insertAtTick = 0,
    overwriteTemposAndTimeSignatures = false,
  ) {
    const midi = new Midi(fileBuffer);
    const insertOffset = insertAtTick;
    // For songs that are not 480 PPQ, we need to convert the ticks
    // so that the beats and time remain unchanged.
    const ppqScaleFactor = Song.DEFAULT_PPQ / midi.header.ppq;
    // Optionally overwrite tempos and time signatures.
    if (overwriteTemposAndTimeSignatures) {
      // Time signatures need to be imported before tempos.
      const newTimeSignatureEvents = [];
      for (const rawTimeSignatureEvent of midi.header.timeSignatures) {
        newTimeSignatureEvents.push(
          new TimeSignatureEvent({
            ticks: insertOffset + scaleIntBy(rawTimeSignatureEvent.ticks, ppqScaleFactor),
            numerator: rawTimeSignatureEvent.timeSignature[0],
            denominator: rawTimeSignatureEvent.timeSignature[1],
          }),
        );
      }
      song.overwriteTimeSignatures(newTimeSignatureEvents);
      const newTempoEvents = [];
      if (insertOffset > 0) {
        // Insert a default tempo event at the beginning.
        newTempoEvents.push(
          new TempoEvent({
            ticks: 0,
            time: 0,
            bpm: 120,
          }),
        );
      }
      for (const rawTempoEvent of midi.header.tempos) {
        newTempoEvents.push(
          new TempoEvent({
            ticks: insertOffset + scaleIntBy(rawTempoEvent.ticks, ppqScaleFactor),
            time: rawTempoEvent.time as number,
            bpm: rawTempoEvent.bpm,
          }),
        );
      }
      song.overwriteTempoChanges(newTempoEvents);
    }

    // Add tracks and notes.
    const createdTracks = [];
    for (const track of midi.tracks) {
      const songTrack = song.createTrack({
        type: TrackType.MIDI_TRACK,
        assignDefaultSamplerPlugin: true,
      });
      createdTracks.push(songTrack);
      songTrack.setInstrument({
        program: track.instrument.number,
        isDrum: track.instrument.percussion,
      });
      const trackClip = songTrack.createMIDIClip({ clipStartTick: insertOffset });
      let minStartTick = Number.MAX_SAFE_INTEGER;
      // Add notes.
      for (const note of track.notes) {
        trackClip.createNote({
          pitch: note.midi,
          velocity: Math.round(note.velocity * 127),
          startTick: insertOffset + scaleIntBy(note.ticks, ppqScaleFactor),
          endTick: insertOffset + scaleIntBy(note.ticks + note.durationTicks, ppqScaleFactor),
        });
        minStartTick = Math.min(
          minStartTick,
          insertOffset + scaleIntBy(note.ticks, ppqScaleFactor),
        );
      }
      // Add volume automation.
      const volumeCCs = track.controlChanges[7];
      if (volumeCCs) {
        if (volumeCCs.length === 1) {
          songTrack.setVolume(volumeCCs[0].value);
        } else {
          const volumeTarget = new AutomationTarget(AutomationTargetType.VOLUME);
          songTrack.getAutomation().addAutomation(volumeTarget);
          const volumeTargetValue = songTrack
            .getAutomation()
            .getAutomationValueByTarget(volumeTarget) as AutomationValue;
          for (const cc of volumeCCs) {
            volumeTargetValue.addPoint(
              insertOffset + scaleIntBy(cc.ticks, ppqScaleFactor),
              cc.value,
            );
          }
        }
      }
      // Add pan automation.
      const panCCs = track.controlChanges[10];
      if (panCCs) {
        if (panCCs.length === 1) {
          const actualPan = Math.round(panCCs[0].value * 127 - 64);
          songTrack.setPan(actualPan);
        } else {
          const panTarget = new AutomationTarget(AutomationTargetType.PAN);
          songTrack.getAutomation().addAutomation(panTarget);
          const panTargetValue = songTrack
            .getAutomation()
            .getAutomationValueByTarget(panTarget) as AutomationValue;
          for (const cc of panCCs) {
            panTargetValue.addPoint(insertOffset + scaleIntBy(cc.ticks, ppqScaleFactor), cc.value);
          }
        }
      }
      if (minStartTick !== Number.MAX_SAFE_INTEGER) {
        trackClip.adjustClipLeft(minStartTick);
      }
    }
    return createdTracks;
  }

  protected setPluginContextInternal(plugin: TuneflowPlugin) {
    this.pluginContext = {
      plugin,
      numTracksCreatedByPlugin: 0,
    };
  }

  protected clearPluginContextInternal() {
    this.pluginContext = undefined;
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

  private static tempoBPMToTicksPerSecond(tempoBPM: number, PPQ: number) {
    return (tempoBPM * PPQ) / 60;
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

interface PluginContext {
  plugin: TuneflowPlugin;
  numTracksCreatedByPlugin: number;
}

export interface BarBeat {
  bar: number;
  beat: number;
  tick: number;
  numerator?: number;
  denominator?: number;
  ticksPerBeat?: number;
}

function scaleIntBy(val: number, factor: number) {
  return Math.round(val * factor);
}

export class Bus {
  private rank: number;
  private name?: string;

  constructor({
    rank,
    name,
  }: {
    /**
     * Rank of the bus, ranges from 1 to `Song.NUM_BUSES`.
     */
    rank: number;
    name?: string;
  }) {
    this.rank = rank;
    this.name = name;
  }

  /**
   * @returns Rank of the bus, ranges from 1 to `Song.NUM_BUSES`.
   */
  getRank() {
    return this.rank;
  }

  getName() {
    return this.name;
  }

  setName(newName: string) {
    this.name = newName;
  }
}

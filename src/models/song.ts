import { ge as greaterEqual, lt as lowerThan } from 'binary-search-bounds';
import * as _ from 'underscore';
import type { TuneflowPlugin } from '../base_plugin';
import { TempoEvent } from './tempo';
import { TimeSignatureEvent } from './time_signature';
import { Track } from './track';

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
    rank,
  }: {
    /** Index to insert at. If left blank, appends to the end. */
    index?: number;
    /** The displayed rank which uniquely identifies a track. Internal use, do not set this. */
    rank?: number;
  }): Track {
    this.checkAccess('createTrack');
    if (rank == undefined || rank === null) {
      rank = this.getNextTrackRank();
    } else {
      this.nextTrackRank = Math.max(rank + 1, this.nextTrackRank);
    }
    const track = new Track({
      song: this,
      uuid: this.getNextTrackId(),
      rank: rank == undefined || rank === null ? this.getNextTrackRank() : rank,
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

interface PluginContext {
  plugin: TuneflowPlugin;
  numTracksCreatedByPlugin: number;
}

import { nanoid } from 'nanoid';
import { ge as greaterEqual, lt as lowerThan, gt as greaterThan } from 'binary-search-bounds';
import type { Track } from './track';
import { Note } from './note';
import _ from 'underscore';
import type { Song } from './song';

export enum ClipType {
  MIDI_CLIP = 1,
  AUDIO_CLIP = 2,
}

/** A temporary holder of audio data that will be converted to local files and cleared once received. */
export interface AudioData {
  data: Uint8Array;
  format: string;
}

/**
 * Audio-related clip data.
 */
export interface AudioClipData {
  /**
   * The absolute file path of the audio.
   *
   * Can be omitted if `audioData` is set.
   */
  audioFilePath?: string;

  /**
   * A temporary holder of the audio file data. When set, the daw will save a copy to local file system and replace
   * `audioFilePath` with the saved file path, and this field will be cleared afterwards.
   *
   * Can be omitted if `audioFilePath` is set.
   *
   * IMPORTANT: Only supported on desktop, requires desktop app version >= 1.8.9.
   */
  audioData?: AudioData;

  /**
   * The start tick of the audio.
   *
   * This is an absolute position that locates the start of the audio within the song.
   *
   * When the clip adjusts left or right boundaries, the start position of the audio
   * will not change.
   *
   * When the clip moves, the audio will move along with the clip.
   */
  startTick: number;

  /**
   * The duration of the audio content. You can get this value in the plugin
   * by using `readApis.readAudioBuffer` to read the audio file content as `AudioBuffer`, and then
   * get the duration from `audioBuffer.duration`.
   *
   * Duration updates whenever audio file (path or content) changes, it DOES NOT change
   * when speed ratio changes.
   */
  duration: number;

  /** How fast this audio plays, time-stretch is applied when this ratio is set and not 1, default to 1. */
  speedRatio?: number;

  /** Pitch offset in semitones, ranging from -48 to 48, default to 0. */
  pitchOffset?: number;
}

/**
 * A clip is a piece in a track, and it contains notes and the clip range.
 * One track can contain one or many non-overlapping clips.
 */
export class Clip {
  /** The song that the clip belongs to, should always be provided. */
  private song: Song;
  /** If the clip is dettached from any track, this field is going to be undefined. */
  private track?: Track;
  private id: string;
  // Notes should be sorted all the time.
  private notes: Note[];
  /** Inclusive start tick. */
  private clipStartTick = 0;
  /** Inclusive end tick. */
  private clipEndTick = 0;
  private nextNoteIdInternal = 1;
  private type: ClipType;
  /** Audio related data if the clip type is AUDIO_CLIP. */
  private audioClipData?: AudioClipData;

  public static MIN_AUDIO_SPEED_RATIO = 0.05;
  public static MAX_AUDIO_SPEED_RATIO = 20;
  public static MIN_AUDIO_PITCH_OFFSET = -24;
  public static MAX_AUDIO_PITCH_OFFSET = 24;

  /**
   * IMPORTANT: Do not use the constructor directly, call `createClip` from tracks instead.
   */
  constructor({
    song,
    type,
    clipStartTick,
    id = Clip.generateClipIdInternal(),
    track = undefined,
    clipEndTick = undefined,
    audioClipData = undefined,
  }: {
    /** The song that the clip belongs to. */
    song: Song;
    type: ClipType;
    clipStartTick: number;
    id?: string;
    /** The track that the clip belongs to, can be left empty.*/
    track?: Track;
    clipEndTick?: number;
    /** Required if type is AUDIO_CLIP. */
    audioClipData?: AudioClipData;
  }) {
    this.song = song;
    this.track = track;
    this.id = id;
    this.type = type;
    this.notes = [];
    if (type === ClipType.AUDIO_CLIP) {
      if (!audioClipData) {
        throw new Error('Audio clip data must be provided for audio clips.');
      }
      this.audioClipData = {
        audioFilePath: audioClipData.audioFilePath,
        startTick: audioClipData.startTick,
        duration: audioClipData.duration,
        audioData:
          audioClipData.audioData && audioClipData.audioData.data
            ? {
                ...audioClipData.audioData,
              }
            : undefined,
        pitchOffset: audioClipData.pitchOffset,
        speedRatio: audioClipData.speedRatio,
      };

      clipStartTick = _.isNumber(clipStartTick)
        ? Math.max(clipStartTick, audioClipData.startTick)
        : audioClipData.startTick;
      const audioEndTick = this.getAudioEndTick() as number;
      if (!_.isNumber(clipEndTick) || audioEndTick < clipEndTick) {
        clipEndTick = audioEndTick;
      }
      this.clipStartTick = clipStartTick;
      this.clipEndTick = clipEndTick;
    } else if (type === ClipType.MIDI_CLIP) {
      this.clipStartTick = clipStartTick;
      if (!_.isNumber(clipEndTick)) {
        throw new Error(`clip end tick must be provided when creating MIDI clip.`);
      }
      this.clipEndTick = clipEndTick;
    }
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getAudioClipData() {
    return this.audioClipData;
  }

  /** Sets a new audio file. */
  setAudioFile(filePath: string, startTick: number, duration: number) {
    if (!this.audioClipData) {
      this.audioClipData = {
        audioFilePath: filePath,
        startTick,
        duration,
      };
    } else {
      this.audioClipData.audioFilePath = filePath;
      this.audioClipData.startTick = startTick;
      this.audioClipData.duration = duration;
      this.audioClipData.speedRatio = 1;
      this.audioClipData.pitchOffset = 0;
    }
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

  clearNotes() {
    this.notes = [];
    this.nextNoteIdInternal = 1;
  }

  /**
   *
   * @returns Duration from the clip start to clip end, in seconds.
   */
  getDuration() {
    return this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
  }

  /**
   * Gets the STRETCHED, FULL audio duration if the clip is AUDIO_CLIP, this takes speed ratio into consideration.
   *
   * Returns undefined if the clip is not AUDIO_CLIP or audio clip data is missing.
   */
  getAudioDuration() {
    if (this.type !== ClipType.AUDIO_CLIP || !this.audioClipData) {
      return undefined;
    }
    return this.audioClipData.duration / this.getAudioSpeedRatio();
  }

  /**
   * Gets the UNSTRETCHED, FULL audio duration if the clip is AUDIO_CLIP, this DOES NOT consider speed ratio.
   *
   * Returns undefined if the clip is not AUDIO_CLIP or audio clip data is missing.
   */
  getRawAudioDuration() {
    if (this.type !== ClipType.AUDIO_CLIP || !this.audioClipData) {
      return undefined;
    }
    return this.audioClipData.duration;
  }

  /**
   *
   * @returns How fast this audio is played back comparing to its original speed.
   */
  getAudioSpeedRatio() {
    if (
      this.type !== ClipType.AUDIO_CLIP ||
      !this.audioClipData ||
      !this.audioClipData.speedRatio
    ) {
      return 1;
    }
    return this.audioClipData.speedRatio;
  }

  /**
   * Time-stretch the clip by adjusting the start tick of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call.
   * @param toLeftTick The new start tick to stretch the clip to.
   */
  timeStretchFromClipLeft(toLeftTick: number, resolveClipConflict = true) {
    if (toLeftTick >= this.clipEndTick) {
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
      return;
    }
    const stretchFactor = (this.clipEndTick - toLeftTick) / (this.clipEndTick - this.clipStartTick);
    // Resolve conflict before changing the clip's range
    // to preserve the current order of clips.
    if (resolveClipConflict && this.track) {
      // @ts-ignore
      this.track.resolveClipConflictInternal(
        this.getId(),
        Math.min(this.clipStartTick, toLeftTick),
        this.clipEndTick,
      );
    }
    if (this.getType() === ClipType.MIDI_CLIP) {
      this.timeStretchMidiClipImpl(stretchFactor, /* referenceTick= */ this.clipEndTick);
      this.moveClipTo(toLeftTick, /* moveAssociatedTrackAutomationPoints= */ false);
    } else if (this.getType() === ClipType.AUDIO_CLIP) {
      this.timeStretchAudioClipImpl(toLeftTick, this.clipEndTick, this.clipEndTick);
    }
    // TODO: Scale the associated automation points accordingly.
  }

  /**
   * Time-stretch the clip by adjusting the end tick of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call.
   * @param toRightTick The new end tick to stretch the clip to.
   */
  timeStretchFromClipRight(toRightTick: number, resolveClipConflict = true) {
    if (toRightTick <= this.clipStartTick) {
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
      return;
    }
    // Resolve conflict before changing the clip's range
    // to preserve the current order of clips.
    if (resolveClipConflict && this.track) {
      // @ts-ignore
      this.track.resolveClipConflictInternal(
        this.getId(),
        this.clipStartTick,
        Math.max(this.clipEndTick, toRightTick),
      );
    }
    if (this.getType() === ClipType.MIDI_CLIP) {
      const stretchFactor =
        (toRightTick - this.clipStartTick) / (this.clipEndTick - this.clipStartTick);
      this.timeStretchMidiClipImpl(stretchFactor, /* referenceTick= */ this.clipStartTick);
    } else if (this.getType() === ClipType.AUDIO_CLIP) {
      this.timeStretchAudioClipImpl(this.clipStartTick, toRightTick, this.clipStartTick);
    }
    // TODO: Scale the associated automation points accordingly.
  }

  private timeStretchMidiClipImpl(stretchFactor: number, referenceTick: number) {
    for (const note of this.getRawNotes()) {
      note.setStartTick(
        Clip.calculateScaledNewTick(note.getStartTick(), referenceTick, stretchFactor),
      );
      note.setEndTick(Clip.calculateScaledNewTick(note.getEndTick(), referenceTick, stretchFactor));
    }
    this.clipStartTick = Clip.calculateScaledNewTick(
      this.clipStartTick,
      referenceTick,
      stretchFactor,
    );
    this.clipEndTick = Clip.calculateScaledNewTick(this.clipEndTick, referenceTick, stretchFactor);
  }

  private timeStretchAudioClipImpl(
    newLeftTick: number,
    newRightTick: number,
    referenceTick: number,
  ) {
    if (this.type !== ClipType.AUDIO_CLIP) {
      return;
    }
    const audioClipData = this.audioClipData as AudioClipData;
    const oldSpeedRatio =
      _.isNumber(audioClipData.speedRatio) && audioClipData.speedRatio
        ? audioClipData.speedRatio
        : 1;
    const oldDuratoin =
      this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
    const newDuration =
      this.song.tickToSeconds(newRightTick) - this.song.tickToSeconds(newLeftTick);
    const timeStretchFactor = newDuration / oldDuratoin;
    const speedRatio = oldSpeedRatio / timeStretchFactor;
    Clip.validateAudioSpeedRatio(speedRatio);
    const oldAudioStartTime = this.song.tickToSeconds(audioClipData.startTick);
    const referenceTickTime = this.song.tickToSeconds(referenceTick);
    const newAudioStartToReferenceDistanceInTime =
      (referenceTickTime - oldAudioStartTime) * timeStretchFactor;
    const newAudioStartTime = referenceTickTime - newAudioStartToReferenceDistanceInTime;
    const newAudioStartTick = this.song.secondsToTick(newAudioStartTime);
    audioClipData.speedRatio = speedRatio;
    audioClipData.startTick = newAudioStartTick;
    this.clipStartTick = newLeftTick;
    this.clipEndTick = newRightTick;
  }

  public static validateAudioSpeedRatio(speedRatio: number) {
    if (
      !_.isNumber(speedRatio) ||
      speedRatio < Clip.MIN_AUDIO_SPEED_RATIO ||
      speedRatio > Clip.MAX_AUDIO_SPEED_RATIO
    ) {
      throw new Error(
        `Speed ratio must be >= ${Clip.MIN_AUDIO_SPEED_RATIO} and <= ${Clip.MAX_AUDIO_SPEED_RATIO}, you are changing to ${speedRatio}`,
      );
    }
  }

  private static calculateScaledNewTick(
    oldTick: number,
    referenceTick: number,
    scaleFactor: number,
  ) {
    const distance = (referenceTick - oldTick) * scaleFactor;
    return Math.round(referenceTick - distance);
  }

  /**
   *
   * @returns The pitch offset of this audio in semitones, comparing to the raw audio.
   */
  getAudioPitchOffset() {
    if (
      this.type !== ClipType.AUDIO_CLIP ||
      !this.audioClipData ||
      !_.isNumber(this.audioClipData.pitchOffset)
    ) {
      return 0;
    }
    return this.audioClipData.pitchOffset;
  }

  /**
   * Sets the pitch offset of this audio in semitones, the offset is compared to the raw audio.
   * @param offsetInSemitones Ranging from `Clip.MIN_AUDIO_PITCH_OFFSET` to `Clip.MAX_AUDIO_PITCH_OFFSET`, step 1, inclusive.
   * @returns
   */
  setAudioPitchOffset(offsetInSemitones: number) {
    if (this.type !== ClipType.AUDIO_CLIP) {
      return;
    }
    Clip.validateAudioPitchOffset(offsetInSemitones);
    (this.audioClipData as AudioClipData).pitchOffset = offsetInSemitones;
  }

  public static validateAudioPitchOffset(offsetInSemitones: number) {
    if (
      !_.isNumber(offsetInSemitones) ||
      offsetInSemitones < Clip.MIN_AUDIO_PITCH_OFFSET ||
      offsetInSemitones > Clip.MAX_AUDIO_PITCH_OFFSET
    ) {
      throw new Error(
        `Pitch offset must be >= ${Clip.MIN_AUDIO_PITCH_OFFSET} and <= ${Clip.MAX_AUDIO_PITCH_OFFSET}, you are setting to ${offsetInSemitones}`,
      );
    }
  }

  getClipStartTick() {
    return this.clipStartTick;
  }

  getClipEndTick() {
    return this.clipEndTick;
  }

  getTrack() {
    return this.track;
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
    if (this.type !== ClipType.MIDI_CLIP) {
      // Only MIDI clips can create notes.
      return null;
    }
    if (
      !Note.isValidPitch(pitch) ||
      !Note.isNoteRangeValid(startTick, endTick) ||
      !Note.isNoteVelocityValid(velocity)
    ) {
      return null;
    }

    const note = new Note({
      pitch,
      velocity,
      startTick,
      endTick,
      id: this.getNextNoteIdInternal(),
    });
    if (startTick < this.clipStartTick && updateClipRange) {
      this.adjustClipLeft(startTick, resolveClipConflict);
    }
    if (endTick > this.clipEndTick && updateClipRange) {
      this.adjustClipRight(endTick, resolveClipConflict);
    }
    this.orderedInsertNote(this.notes, note);
    return note;
  }

  private getNoteIndexInternal(note: Note) {
    const startIndex = lowerThan(
      this.notes,
      note,
      (a: Note, b: Note) => a.getStartTick() - b.getStartTick(),
    );

    for (let index = Math.max(0, startIndex); index < this.notes.length; index += 1) {
      const currentNote = this.notes[index];
      if (currentNote && currentNote === note) {
        return index;
      }
      if (currentNote && currentNote.getStartTick() > note.getStartTick()) {
        // We have searched past all possible notes.
        break;
      }
    }
    return -1;
  }

  deleteNote(note: Note) {
    const noteIndex = this.getNoteIndexInternal(note);
    if (noteIndex >= 0) {
      this.deleteNoteAt(noteIndex);
    }
  }

  deleteNoteAt(index: number) {
    const note = this.notes[index];
    if (note) {
      // @ts-ignore
      note.clipInternal = null;
      this.notes.splice(index, 1);
    }
  }

  private orderedInsertNote(noteList: Note[], newNote: Note) {
    if (this.type !== ClipType.MIDI_CLIP) {
      // Only MIDI clips can insert notes.
      return;
    }
    if (newNote.getClip() === this) {
      // Do not insert if the note is already in the list.
      return;
    }
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
    // @ts-ignore.
    newNote.clipInternal = this;
  }

  /**
   * Adjust the left boundary of the clip.
   *
   * NOTE: This could delete the clip if the range becomes empty after
   * this call.
   * @param clipStartTick The new start tick (inclusive) of the clip.
   */
  adjustClipLeft(clipStartTick: number, resolveConflict = true) {
    clipStartTick = Math.max(0, clipStartTick);
    if (this.type === ClipType.AUDIO_CLIP && this.audioClipData) {
      // Clip boundary cannot exceed the audio's boundary.
      clipStartTick = Math.max(clipStartTick, this.audioClipData.startTick);
    }
    if (clipStartTick > this.clipEndTick) {
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict && this.track) {
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
   * this call.
   *
   * @param clipEndTick  The new end tick (inclusive) of the clip.
   */
  adjustClipRight(clipEndTick: number, resolveConflict = true) {
    if (this.type === ClipType.AUDIO_CLIP) {
      // Clip right boundary cannot exceed the audio's right boundary.
      const audioEndTick = this.getAudioEndTick();
      if (_.isNumber(audioEndTick)) {
        clipEndTick = Math.min(clipEndTick, audioEndTick);
      }
    }
    if (clipEndTick < this.clipStartTick || clipEndTick < 0) {
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
    } else {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      if (resolveConflict && this.track) {
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
   * Move the clip by the given offset ticks.
   *
   * NOTE: Moving a clip can break the order of clips,
   * so the clip must be re-positioned to the correct index.
   * @param offsetTick
   */
  moveClip(offsetTick: number, moveAssociatedTrackAutomationPoints: boolean) {
    const newClipStartTick = Math.max(0, this.clipStartTick + offsetTick);
    const newClipEndTick = this.clipEndTick + offsetTick;
    if (newClipEndTick < 0) {
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
      return;
    }
    if (this.track) {
      // Resolve conflict before changing the clip's range
      // to preserve the current order of clips.
      // @ts-ignore
      this.track.resolveClipConflictInternal(this.getId(), newClipStartTick, newClipEndTick);
    }

    // The track's clip order will be invalidated after the move, and deleting the clip
    // requires the clips to be sorted, so delete the clip before the move happens.
    if (this.track) {
      const clipIndex = this.track.getClipIndex(this);
      this.track.deleteClipAt(clipIndex, /* deleteAssociatedTrackAutomation= */ false);
    }

    // Move the clip.
    const originalStartTick = this.clipStartTick;
    const originalEndTick = this.clipEndTick;

    if (this.type === ClipType.MIDI_CLIP) {
      this.clipStartTick = newClipStartTick;
      this.clipEndTick = newClipEndTick;
      for (const note of this.notes) {
        note.setStartTick(note.getStartTick() + offsetTick);
        note.setEndTick(note.getEndTick() + offsetTick);
      }
    } else if (this.type === ClipType.AUDIO_CLIP) {
      if (!this.audioClipData) {
        throw new Error('Cannot move audio clip without audio data');
      }
      // Let the content of the audio at the original clip start be S
      // Let the clip start tick before move be T1, after move be T2.
      // Moving an audio clip means:
      // 1. S must be at T2 after move
      // 2. Duration of the playable audio must remain unchanged.
      const song = this.song;
      // The clip's end position's time relative to the audio's start time should remain
      // unchanged.
      const originalAudioStartTime = song.tickToSeconds(this.audioClipData.startTick);
      const originalStartTime = song.tickToSeconds(originalStartTick);
      const originalEndTime = song.tickToSeconds(originalEndTick);
      const playableAudioDuration = originalEndTime - originalStartTime;
      const clipStartRelativeToAudioStart = originalStartTime - originalAudioStartTime;
      // Use the raw updated clip tick here.
      const newClipStartTime = song.tickToSeconds(this.clipStartTick + offsetTick);
      const newAudioStartTime = newClipStartTime - clipStartRelativeToAudioStart;
      const newClipEndTime = newClipStartTime + playableAudioDuration;
      this.clipStartTick = newClipStartTick;
      this.clipEndTick = song.secondsToTick(newClipEndTime);
      this.audioClipData.startTick = song.secondsToTick(newAudioStartTime);
      if (this.clipEndTick < 0) {
        this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
        return;
      }
    }

    if (this.track) {
      // Ordered insert back the clip.
      // @ts-ignore
      this.track.orderedInsertClipInternal(this);

      // Move track automation points if required.
      if (moveAssociatedTrackAutomationPoints) {
        this.track
          .getAutomation()
          .moveAllPointsWithinRange(
            originalStartTick,
            originalEndTick,
            offsetTick,
            /* offsetValue= */ 0,
          );
      }
    }
  }

  /**
   * Move the clip to a given tick.
   * @param tick The tick that this clip will start at.
   */
  moveClipTo(tick: number, moveAssociatedTrackAutomationPoints: boolean) {
    const offsetTick = tick - this.getClipStartTick();
    this.moveClip(offsetTick, moveAssociatedTrackAutomationPoints);
  }

  deleteFromParent(deleteAssociatedTrackAutomation: boolean) {
    if (this.track) {
      this.track.deleteClip(this, deleteAssociatedTrackAutomation);
      this.track = undefined;
    }
  }

  getNotesByIds(noteIds: number[]) {
    const noteIdSet = new Set<number>(noteIds);
    const notes = [];
    for (const note of this.notes) {
      if (noteIdSet.has(note.getId())) {
        notes.push(note);
      }
    }
    return notes;
  }

  /**
   * Gets the current clip audio's start tick.
   *
   * Note that this differs from the clip's start tick in that the user can trim
   * the clip to only play part of the audio.
   *
   * Returns undefined if the clip is not audio clip or audio clip data is missing.
   */
  getAudioStartTick() {
    if (this.type !== ClipType.AUDIO_CLIP || !this.audioClipData) {
      return undefined;
    }
    return this.audioClipData.startTick;
  }

  /**
   * Gets the current clip audio's end tick.
   *
   * Returns undefined if the clip is not audio clip or audio clip data is missing.
   */
  getAudioEndTick() {
    if (this.type !== ClipType.AUDIO_CLIP || !this.audioClipData) {
      return undefined;
    }
    const duration = this.getAudioDuration();
    if (!_.isNumber(duration)) {
      return undefined;
    }
    const audioStartTime = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(audioStartTime + duration);
  }

  static getNotesInRange(rawNotes: Note[], startTick: number, endTick: number) {
    return Clip.getNotesInRangeImpl<Note>(
      rawNotes,
      startTick,
      endTick,
      (startTick: number) => ({ getStartTick: () => startTick }),
      (note: Note) => note.getStartTick(),
      (note: Note) => note.getEndTick(),
    );
  }

  /**
   * Gets notes that are playable in a range.
   *
   * Performs two O(logn) searches and some extra while loops to narrow down range.
   *
   * @param rawNotes
   * @param startTick
   * @param endTick
   * @param startTickToNoteFn
   * @param noteToStartTickFn
   * @param noteToEndTickFn
   * @returns
   */
  static getNotesInRangeImpl<T>(
    rawNotes: T[],
    startTick: number,
    endTick: number,
    startTickToNoteFn: Function,
    noteToStartTickFn: Function,
    noteToEndTickFn: Function,
  ): T[] {
    // Find the first note that is within the clip.
    let startIndex = Math.max(
      0,
      // IMPORTANT: Assuming that a note cannot be within the Clip if it starts before the clip.
      lowerThan(
        rawNotes,
        startTickToNoteFn(startTick),
        (a: any, b: any) => noteToStartTickFn(a) - noteToStartTickFn(b),
      ),
    );
    while (
      rawNotes[startIndex] &&
      !Clip.isNoteInClip(
        noteToStartTickFn(rawNotes[startIndex]),
        noteToEndTickFn(rawNotes[startIndex]),
        startTick,
        endTick,
      )
    ) {
      startIndex += 1;
    }
    if (startIndex >= rawNotes.length) {
      return [];
    }
    // Find the last note that is within the clip.
    let endIndex = Math.min(
      rawNotes.length - 1,
      greaterThan(
        rawNotes,
        startTickToNoteFn(endTick),
        (a: any, b: any) => noteToStartTickFn(a) - noteToStartTickFn(b),
      ),
    );
    while (
      rawNotes[endIndex] &&
      !Clip.isNoteInClip(
        noteToStartTickFn(rawNotes[endIndex]),
        noteToEndTickFn(rawNotes[endIndex]),
        startTick,
        endTick,
      )
    ) {
      endIndex -= 1;
    }
    if (endIndex < 0) {
      return [];
    }
    if (endIndex < startIndex) {
      return [];
    }
    return rawNotes.slice(startIndex, endIndex + 1);
  }

  /**
   * Gets the notes that are overlapping a given range.
   * This differs from `getNotesInRangeImpl` in that this simply checks
   * for range overlapping.
   * @param rawNotes
   * @param startTick
   * @param endTick
   * @param noteToStartTickFn
   * @param noteToEndTickFn
   * @returns
   */
  static getOverlappingNotesWithinRangeImpl<T>(
    rawNotes: T[],
    startTick: number,
    endTick: number,
    noteToStartTickFn: (note: T) => number,
    noteToEndTickFn: (note: T) => number,
  ): T[] {
    const candidates = [];
    for (const note of rawNotes) {
      const noteStartTick = noteToStartTickFn(note);
      if (noteStartTick > endTick) {
        // This note and all following notes won't overlap.
        break;
      }
      const noteEndTick = noteToEndTickFn(note);
      if (noteEndTick > startTick && noteStartTick < endTick) {
        candidates.push(note);
      }
    }
    return candidates;
  }

  /**
   * Note is in the clip when:
   * * The note starts at or after the clip start.
   * * The note has overlapping part with the clip.
   * * The overlapping part is greater than 1 tick, i.e. the note does not
   *   start from the end of the clip or end at the start of the clip.
   * @param noteStartTick
   * @param noteEndTick
   * @param clipStartTick
   * @param clipEndTick
   * @returns
   */
  static isNoteInClip(
    noteStartTick: number,
    noteEndTick: number,
    clipStartTick: number,
    clipEndTick: number,
  ) {
    return (
      // If the clip starts at 0, notes that start before 0 will start at 0.
      (noteStartTick >= clipStartTick || (clipStartTick === 0 && noteStartTick <= 0)) &&
      noteStartTick < clipEndTick &&
      noteEndTick > noteStartTick
    );
  }

  /**
   * Some notes might not be fully within the clip, this returns the range of the note
   * that is within the clip's range.
   * @param noteStartTick
   * @param noteEndTick
   * @param clipStartTick
   * @param clipEndTick
   * @returns Returns the start and end tick if the note is in the clip and there's overlap, otherwise null.
   */
  static getNotePlayableRange(
    noteStartTick: number,
    noteEndTick: number,
    clipStartTick: number,
    clipEndTick: number,
  ) {
    if (!Clip.isNoteInClip(noteStartTick, noteEndTick, clipStartTick, clipEndTick)) {
      return null;
    }
    const overlappingStartTick = Math.max(noteStartTick, clipStartTick);
    const overlappingEndTick = Math.min(noteEndTick, clipEndTick);
    if (overlappingStartTick > overlappingEndTick) {
      return null;
    }
    return {
      startTick: overlappingStartTick,
      endTick: overlappingEndTick,
    };
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
      this.deleteFromParent(/* deleteAssociatedTrackAutomation= */ true);
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

      this.adjustClipRight(overlappingStartTick - 1, /* resolveConflict= */ false);

      if (this.track) {
        if (this.type === ClipType.MIDI_CLIP) {
          const rightClip = this.track.createMIDIClip({
            clipStartTick: rightClipStartTick,
            clipEndTick: rightClipEndTick,
          });
          const rightNotes = Clip.getNotesInRange(this.notes, rightClipStartTick, rightClipEndTick);
          for (const rightNote of rightNotes) {
            rightClip.createNote({
              pitch: rightNote.getPitch(),
              velocity: rightNote.getVelocity(),
              startTick: rightNote.getStartTick(),
              endTick: rightNote.getEndTick(),
              updateClipRange: false,
              resolveClipConflict: false,
            });
          }
        } else if (this.type === ClipType.AUDIO_CLIP) {
          const audioClipData = this.audioClipData as AudioClipData;
          this.track.createAudioClip({
            clipStartTick: rightClipStartTick,
            clipEndTick: rightClipEndTick,
            audioClipData: {
              audioFilePath: audioClipData.audioFilePath,
              startTick: audioClipData.startTick,
              duration: audioClipData.duration,
            },
          });
        }
      }

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

  private getNextNoteIdInternal() {
    const noteId = this.nextNoteIdInternal;
    if (this.nextNoteIdInternal >= /* 2^31 -1 */ 2147483647) {
      this.nextNoteIdInternal = 1;
    } else {
      this.nextNoteIdInternal += 1;
    }

    return noteId;
  }

  private static generateClipIdInternal() {
    return nanoid(10);
  }
}

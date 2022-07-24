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

/**
 * Audio-related clip data.
 */
export interface AudioClipData {
  /**
   * The absolute file path of the audio.
   */
  audioFilePath: string;

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
   * Duration needs to be updated whenever audio file (path or content) changes.
   */
  duration: number;
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

  getDuration() {
    return this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
  }

  /**
   * Gets the audio's duration if the clip is AUDIO_CLIP.
   *
   * Returns undefined if the clip is not AUDIO_CLIP or audio clip data is missing.
   */
  getAudioDuration() {
    if (this.type !== ClipType.AUDIO_CLIP || !this.audioClipData) {
      return undefined;
    }
    return this.audioClipData.duration;
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
   * Note is in the clip when:
   * * The note starts at or after the clip start.
   * * The note has overlapping part with the clip.
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
      noteStartTick <= clipEndTick &&
      noteEndTick >= noteStartTick
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

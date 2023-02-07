import { ClipType, Song, TrackType, TuneflowPlugin } from '../src';
import type { AudioClipData, Track } from '../src';

const TEST_AUDIO_CLIP_DATA: AudioClipData = {
  audioFilePath: 'file1',
  startTick: 480,
  duration: 1,
};

describe('Audio Clip-related Tests', () => {
  class TestUtilsPlugin extends TuneflowPlugin {}

  const testUtilsPlugin = new TestUtilsPlugin();
  let song = new Song();
  let audioTrack: Track;
  let midiTrack: Track;

  beforeEach(() => {
    song = new Song();
    // @ts-ignore
    song.setPluginContextInternal(testUtilsPlugin);
    song.setResolution(480);
    song.createTempoChange({
      ticks: 0,
      bpm: 120,
    });
    song.createTempoChange({
      ticks: 1440,
      bpm: 60,
    });
    audioTrack = song.createTrack({ type: TrackType.AUDIO_TRACK });
    midiTrack = song.createTrack({ type: TrackType.MIDI_TRACK });
  });

  describe('Create audio clips correctly', () => {
    it('Creates audio clip by default', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 0,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getType()).toBe(ClipType.AUDIO_CLIP);
      const clip2 = midiTrack.createMIDIClip({
        clipStartTick: 0,
      });
      expect(clip2.getType()).toBe(ClipType.MIDI_CLIP);
      const clip3 = audioTrack.createMIDIClip({
        clipStartTick: 0,
      });
      expect(clip3.getType()).toBe(ClipType.MIDI_CLIP);
      const clip4 = midiTrack.createAudioClip({
        clipStartTick: 0,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip4.getType()).toBe(ClipType.AUDIO_CLIP);
    });
  });

  describe('Audio clip cannot create notes', () => {
    it('Cannot create note in audio clip', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 0,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getRawNotes().length).toBe(0);
      expect(clip1.getNotes().length).toBe(0);
      const newNote = clip1.createNote({
        pitch: 64,
        velocity: 64,
        startTick: 0,
        endTick: 100,
      });
      expect(newNote).toBeNull();
      expect(clip1.getRawNotes().length).toBe(0);
      expect(clip1.getNotes().length).toBe(0);
    });
  });

  describe('Basic get and set operations', () => {
    it('Get audio related fields correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 480,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipEndTick()).toBe(1440);
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1440);
      expect(clip1.getAudioClipData()).toEqual(TEST_AUDIO_CLIP_DATA);
    });

    it('Set and get custom clip start and end tick out of audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 120,
        clipEndTick: 9000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(480);
      expect(clip1.getClipEndTick()).toBe(1440);
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1440);
      expect(clip1.getAudioClipData()).toEqual(TEST_AUDIO_CLIP_DATA);
    });

    it('Set and get custom clip start and end tick within audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1000);
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1440);
      expect(clip1.getAudioClipData()).toEqual(TEST_AUDIO_CLIP_DATA);
    });
  }); // end of basic set and get operations.

  describe('Trim left and trim right', () => {
    it('trim left within audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1000);
      clip1.adjustClipLeft(600);
      expect(clip1.getClipStartTick()).toBe(600);
      expect(clip1.getClipEndTick()).toBe(1000);
    });

    it('trim left out of audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1000);
      clip1.adjustClipLeft(-100);
      expect(clip1.getClipStartTick()).toBe(480);
      expect(clip1.getClipEndTick()).toBe(1000);
    });

    it('trim right within audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1000);
      clip1.adjustClipRight(980);
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(980);
    });

    it('trim right out of audio range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1000,
        audioClipData: TEST_AUDIO_CLIP_DATA,
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1000);
      clip1.adjustClipRight(2000);
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1440);
    });
  }); // end of trim left and trim right.

  describe('Move clip', () => {
    it('Moves clip within tempo range correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1200,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 480,
          duration: 1,
        },
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1200);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1440);
      clip1.moveClip(-480, /* moveAssociatedTrackAutomationPoints= */ false);
      expect(clip1.getClipStartTick()).toBe(480);
      expect(clip1.getClipEndTick()).toBe(720);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        duration: 1,
        startTick: 0,
      });
      expect(clip1.getAudioEndTick()).toBe(960);
    });

    it('Moves clip to the right cross tempo ranges correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 960,
        clipEndTick: 1200,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 480,
          duration: 1,
        },
      });
      expect(clip1.getClipStartTick()).toBe(960);
      expect(clip1.getClipEndTick()).toBe(1200);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1440);
      clip1.moveClip(480, /* moveAssociatedTrackAutomationPoints= */ false);
      expect(clip1.getClipStartTick()).toBe(1440);
      expect(clip1.getClipEndTick()).toBe(1560);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        duration: 1,
        startTick: 960,
      });
      expect(clip1.getAudioEndTick()).toBe(1680);
    });

    it('Moves clip to the left cross tempo ranges correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 1320,
        clipEndTick: 1560,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 1200,
          duration: 1,
        },
      });
      expect(clip1.getAudioDuration()).toBe(1);
      expect(clip1.getAudioEndTick()).toBe(1800);
      expect(clip1.getClipStartTick()).toBe(1320);
      expect(clip1.getClipEndTick()).toBe(1560);
      expect(clip1.getDuration()).toBeCloseTo(0.375);
      clip1.moveClip(-120, /* moveAssociatedTrackAutomationPoints= */ false);
      expect(clip1.getClipStartTick()).toBe(1200);
      expect(clip1.getClipEndTick()).toBe(1500);
      expect(clip1.getDuration()).toBeCloseTo(0.375);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        duration: 1,
        startTick: 1080,
      });
      expect(clip1.getAudioEndTick()).toBe(1740);
    });

    it('Moves clip to the left cross 0 correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 1320,
        clipEndTick: 1560,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 1200,
          duration: 1,
        },
      });
      expect(clip1.getAudioEndTick()).toBe(1800);
      expect(clip1.getClipStartTick()).toBe(1320);
      expect(clip1.getClipEndTick()).toBe(1560);
      expect(clip1.getDuration()).toBeCloseTo(0.375);
      clip1.moveClip(-1440, /* moveAssociatedTrackAutomationPoints= */ false);
      expect(clip1.getClipStartTick()).toBe(0);
      expect(clip1.getClipEndTick()).toBe(240);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        duration: 1,
        startTick: -240,
      });
      expect(clip1.getAudioEndTick()).toBe(720);
    });

    it('Moves clip to the left cross tempo and 0 correctly', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 1920,
        clipEndTick: 2040,
        audioClipData: {
          audioFilePath: 'file3',
          startTick: 1680,
          duration: 1,
        },
      });
      expect(clip1.getAudioEndTick()).toBe(2160);
      expect(clip1.getClipStartTick()).toBe(1920);
      expect(clip1.getClipEndTick()).toBe(2040);
      expect(clip1.getDuration()).toBeCloseTo(0.25);
      clip1.moveClip(-2040, /* moveAssociatedTrackAutomationPoints= */ false);
      expect(clip1.getClipStartTick()).toBe(0);
      expect(clip1.getClipEndTick()).toBe(120);
      expect(clip1.getDuration()).toBeCloseTo(0.125);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file3',
        duration: 1,
        startTick: -600,
      });
      expect(clip1.getAudioEndTick()).toBe(360);
    });
  }); // end of move clip.

  describe('Resolve conflict', () => {
    it('create clip in the middle of another clip', async () => {
      audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 0,
          duration: 1,
        },
      });
      audioTrack.createAudioClip({
        clipStartTick: 240,
        clipEndTick: 720,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 240,
          duration: 0.5,
        },
      });
      expect(audioTrack.getClips().length).toBe(3);
      expect(audioTrack.getClips()[0].getClipStartTick()).toBe(0);
      expect(audioTrack.getClips()[0].getClipEndTick()).toBe(239);
      expect(audioTrack.getClips()[0].getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 1,
      });
      expect(audioTrack.getClips()[1].getClipStartTick()).toBe(240);
      expect(audioTrack.getClips()[1].getClipEndTick()).toBe(720);
      expect(audioTrack.getClips()[1].getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        startTick: 240,
        duration: 0.5,
      });
      expect(audioTrack.getClips()[2].getClipStartTick()).toBe(721);
      expect(audioTrack.getClips()[2].getClipEndTick()).toBe(960);
      expect(audioTrack.getClips()[2].getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 1,
      });
    });

    it('create clip to the left of another clip', async () => {
      audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 0,
          duration: 1,
        },
      });
      audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 240,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 0,
          duration: 0.25,
        },
      });
      expect(audioTrack.getClips().length).toBe(2);
      expect(audioTrack.getClips()[0].getClipStartTick()).toBe(0);
      expect(audioTrack.getClips()[0].getClipEndTick()).toBe(240);
      expect(audioTrack.getClips()[0].getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        startTick: 0,
        duration: 0.25,
      });
      expect(audioTrack.getClips()[1].getClipStartTick()).toBe(241);
      expect(audioTrack.getClips()[1].getClipEndTick()).toBe(960);
      expect(audioTrack.getClips()[1].getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 1,
      });
    });

    it('create clip to the right of another clip', async () => {
      audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 0,
          duration: 1,
        },
      });
      audioTrack.createAudioClip({
        clipStartTick: 720,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 720,
          duration: 0.25,
        },
      });
      expect(audioTrack.getClips().length).toBe(2);
      expect(audioTrack.getClips()[0].getClipStartTick()).toBe(0);
      expect(audioTrack.getClips()[0].getClipEndTick()).toBe(719);
      expect(audioTrack.getClips()[0].getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 1,
      });
      expect(audioTrack.getClips()[1].getClipStartTick()).toBe(720);
      expect(audioTrack.getClips()[1].getClipEndTick()).toBe(960);
      expect(audioTrack.getClips()[1].getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        startTick: 720,
        duration: 0.25,
      });
    });

    it('trim left edge overlaps with another clip', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 480,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 0,
          duration: 0.5,
        },
      });
      const clip2 = audioTrack.createAudioClip({
        clipStartTick: 720,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 360,
          duration: 1,
        },
      });
      expect(audioTrack.getClips().length).toBe(2);
      clip2.adjustClipLeft(240, /* resolveConflict= */ true);
      expect(clip1.getClipStartTick()).toBe(0);
      expect(clip1.getClipEndTick()).toBe(359);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 0.5,
      });
      expect(clip2.getClipStartTick()).toBe(360);
      expect(clip2.getClipEndTick()).toBe(960);
      expect(clip2.getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        startTick: 360,
        duration: 1,
      });
    });

    it('trim right edge overlaps with another clip', async () => {
      const clip1 = audioTrack.createAudioClip({
        clipStartTick: 0,
        clipEndTick: 240,
        audioClipData: {
          audioFilePath: 'file1',
          startTick: 0,
          duration: 0.75,
        },
      });
      const clip2 = audioTrack.createAudioClip({
        clipStartTick: 480,
        clipEndTick: 960,
        audioClipData: {
          audioFilePath: 'file2',
          startTick: 360,
          duration: 1,
        },
      });
      expect(audioTrack.getClips().length).toBe(2);
      clip1.adjustClipRight(800, /* resolveConflict= */ true);
      expect(clip1.getClipStartTick()).toBe(0);
      expect(clip1.getClipEndTick()).toBe(720);
      expect(clip1.getAudioClipData()).toEqual({
        audioFilePath: 'file1',
        startTick: 0,
        duration: 0.75,
      });
      expect(clip2.getClipStartTick()).toBe(721);
      expect(clip2.getClipEndTick()).toBe(960);
      expect(clip2.getAudioClipData()).toEqual({
        audioFilePath: 'file2',
        startTick: 360,
        duration: 1,
      });
    });
  }); // end of resolve conflict.
});

import { AudioPlugin, dbToVolumeValue, Song, TrackType, TuneflowPlugin } from '../src';
import type { SongAccess } from '../src';
import type { InstrumentInfo } from '../src/models/track';

describe('Track-related Tests', () => {
  class TestUtilsPlugin extends TuneflowPlugin {
    songAccess(): SongAccess {
      return {
        createTrack: true,
        removeTrack: true,
      };
    }
  }

  const testUtilsPlugin = new TestUtilsPlugin();
  let song = new Song();

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
  });

  describe('Create tracks', () => {
    it('Creates MIDI track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getVolume()).toBeCloseTo(dbToVolumeValue(0));
      expect(track.getPan()).toBe(0);
      expect(track.getSolo()).toBe(false);
      expect(track.getMuted()).toBe(false);
      expect(track.getType()).toBe(TrackType.MIDI_TRACK);
    });

    it('Creates audio track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });
      expect(track.getVolume()).toBeCloseTo(dbToVolumeValue(0));
      expect(track.getPan()).toBe(0);
      expect(track.getSolo()).toBe(false);
      expect(track.getMuted()).toBe(false);
      expect(track.getType()).toBe(TrackType.AUDIO_TRACK);
    });
  });

  describe('Audio tracks', () => {
    it('Cannot set instrument or suggested instruments or sampler plugin', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });
      expect(track.getInstrument()).toBeUndefined();
      expect(track.getSamplerPlugin()).toBeUndefined();
      expect(track.getSuggestedInstruments()).toEqual([]);
      track.setInstrument({
        program: 32,
        isDrum: false,
      });
      expect(track.getInstrument()).toBeUndefined();
      track.setSamplerPlugin(new AudioPlugin('plugin1', 'manufacturer1', 'VST', '1.1'));
      expect(track.getSamplerPlugin()).toBeUndefined();
      track.createSuggestedInstrument({
        program: 64,
        isDrum: false,
      });
      expect(track.getSuggestedInstruments()).toEqual([]);
    });

    it('Clone track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });

      track.setInstrument({
        program: 32,
        isDrum: false,
      });

      const audioPlugin = new AudioPlugin('plugin1', 'manufacturer1', 'VST', '1.1');
      track.setSamplerPlugin(audioPlugin);

      track.createSuggestedInstrument({
        program: 64,
        isDrum: false,
      });
      track.setVolume(0.1);
      track.setPan(60);
      track.setSolo(true);
      track.setMuted(true);
      const clonedTrack = song.cloneTrack(track);
      const clonedTrackInstrument = clonedTrack.getInstrument();
      expect(clonedTrackInstrument).toBeUndefined();
      expect(clonedTrack.getSuggestedInstruments().length).toBe(0);
      const clonedTrackSamplerPlugin = clonedTrack.getSamplerPlugin();
      expect(clonedTrackSamplerPlugin).toBeUndefined();
      expect(clonedTrack.getVolume()).toBeCloseTo(0.1);
      expect(clonedTrack.getPan()).toBe(60);
      expect(clonedTrack.getSolo()).toBe(true);
      expect(clonedTrack.getMuted()).toBe(true);
    });
  });

  describe('MIDI tracks', () => {
    it('Clone track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });

      track.setInstrument({
        program: 32,
        isDrum: false,
      });

      const audioPlugin = new AudioPlugin('plugin1', 'manufacturer1', 'VST', '1.1');
      track.setSamplerPlugin(audioPlugin);

      track.createSuggestedInstrument({
        program: 64,
        isDrum: false,
      });
      track.setVolume(0.1);
      track.setPan(60);
      track.setSolo(true);
      track.setMuted(true);
      const clonedTrack = song.cloneTrack(track);
      const clonedTrackInstrument = clonedTrack.getInstrument();
      expect(clonedTrackInstrument).toBeTruthy();
      expect((clonedTrackInstrument as InstrumentInfo).getProgram()).toBe(32);
      expect((clonedTrackInstrument as InstrumentInfo).getIsDrum()).toBe(false);
      expect(clonedTrack.getSuggestedInstruments().length).toBe(1);
      expect(clonedTrack.getSuggestedInstruments()[0].getProgram()).toBe(64);
      expect(clonedTrack.getSuggestedInstruments()[0].getIsDrum()).toBe(false);
      const clonedTrackSamplerPlugin = clonedTrack.getSamplerPlugin();
      expect(clonedTrackSamplerPlugin).toBeTruthy();
      expect(
        (clonedTrackSamplerPlugin as AudioPlugin).matchesTfId(audioPlugin.getTuneflowId()),
      ).toBe(true);
      expect(clonedTrack.getVolume()).toBeCloseTo(0.1);
      expect(clonedTrack.getPan()).toBe(60);
      expect(clonedTrack.getSolo()).toBe(true);
      expect(clonedTrack.getMuted()).toBe(true);
    });
  });
});

import {
  AudioPlugin,
  AutomationTarget,
  AutomationTargetType,
  dbToVolumeValue,
  Song,
  TrackType,
  TuneflowPlugin,
} from '../src';
import type { SongAccess, AutomationValue } from '../src';
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
      const trackClip = track.createMIDIClip({
        clipStartTick: 0,
        clipEndTick: 100,
        insertClip: true,
      });
      trackClip.createNote({
        pitch: 64,
        velocity: 80,
        startTick: 1,
        endTick: 10,
      });
      const volumeAutomationTarget = new AutomationTarget(AutomationTargetType.VOLUME);
      track.getAutomation().addAutomation(volumeAutomationTarget);
      const automationValue = track
        .getAutomation()
        .getOrCreateAutomationValueById(volumeAutomationTarget.toTfAutomationTargetId());
      automationValue.setDisabled(true);
      automationValue.addPoint(3, 0.5, false);
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
      expect(clonedTrack.getClips().length).toBe(1);
      expect(clonedTrack.getClips()[0].getNotes().length).toBe(1);
      expect(clonedTrack.getClips()[0].getNotes()[0].getPitch()).toBe(64);
      expect(clonedTrack.getClips()[0].getNotes()[0].getVelocity()).toBe(80);
      expect(clonedTrack.getClips()[0].getNotes()[0].getStartTick()).toBe(1);
      expect(clonedTrack.getClips()[0].getNotes()[0].getEndTick()).toBe(10);
      expect(clonedTrack.getAutomation().getAutomationTargets().length).toBe(1);
      expect(clonedTrack.getAutomation().getAutomationTargets()[0].toTfAutomationTargetId()).toBe(
        volumeAutomationTarget.toTfAutomationTargetId(),
      );
      const clonedAutomationValue = clonedTrack
        .getAutomation()
        .getAutomationValueById(volumeAutomationTarget.toTfAutomationTargetId()) as AutomationValue;
      expect(clonedAutomationValue.getDisabled()).toBe(true);
      expect(clonedAutomationValue.getPoints().length).toBe(1);
      expect(clonedAutomationValue.getPoints()[0].tick).toBe(3);
      expect(clonedAutomationValue.getPoints()[0].value).toBeCloseTo(0.5);
    });
  });

  describe('Audio plugins', () => {
    it('CRUD audio plugins correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPlugins()).toEqual([]);

      track.setAudioPluginAt(0, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPlugins().length).toBe(1);
      expect(track.getAudioPluginAt(0)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);

      track.removeAudioPluginAt(0);

      expect(track.getAudioPlugins()).toEqual([]);

      track.setAudioPluginAt(2, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPluginAt(0)).toBeUndefined();
      expect(track.getAudioPluginAt(2)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);
    });

    it('Cannot set audio plugin at slot larger than supported', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPlugins()).toEqual([]);

      expect(() =>
        track.setAudioPluginAt(1000, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID)),
      ).toThrow();
    });

    it('Get audio plugin by instance id correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPlugins()).toEqual([]);

      const samplerPlugin = track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID);
      track.setSamplerPlugin(samplerPlugin);

      expect(track.getSamplerPlugin()).toBe(
        track.getPluginByInstanceId(samplerPlugin.getInstanceId()),
      );

      const audioPlugin = track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID);
      track.setAudioPluginAt(1, audioPlugin);
      expect(track.getAudioPluginAt(1)).toBe(
        track.getPluginByInstanceId(audioPlugin.getInstanceId()),
      );
    });
  });
});

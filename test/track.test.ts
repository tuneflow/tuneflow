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
import { TrackOutputType, TrackSend, TrackSendPosition } from '../src/models/track';
import type { AuxTrackData, InstrumentInfo } from '../src/models/track';

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

    it('Clone audio track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });

      track.setInstrument({
        program: 32,
        isDrum: false,
      });

      const audioFxPlugin = new AudioPlugin('audioplugin1', 'man1', 'VST3', '1.0.0');
      track.setAudioPluginAt(1, audioFxPlugin);
      track.setSendAt(
        2,
        new TrackSend({
          outputBusRank: 2,
          gainLevel: 0.53,
          position: TrackSendPosition.PostFader,
          muted: true,
        }),
      );

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
      const clonedAudioFxPlugin = clonedTrack.getAudioPluginAt(1);
      expect(clonedAudioFxPlugin?.matchesTfId(audioFxPlugin.getTuneflowId())).toBe(true);
      const clonedSend = clonedTrack.getSendAt(2);
      expect(clonedSend.getOutputBusRank()).toBe(2);
      expect(clonedSend.getGainLevel()).toBeCloseTo(0.53);
      expect(clonedSend.getPosition()).toBe(TrackSendPosition.PostFader);
      expect(clonedSend.getMuted()).toBe(true);
      expect(clonedTrack.getVolume()).toBeCloseTo(0.1);
      expect(clonedTrack.getPan()).toBe(60);
      expect(clonedTrack.getSolo()).toBe(true);
      expect(clonedTrack.getMuted()).toBe(true);
    });
  });

  describe('MIDI tracks', () => {
    it('Clone midi track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });

      track.setInstrument({
        program: 32,
        isDrum: false,
      });

      const audioPlugin = new AudioPlugin('plugin1', 'manufacturer1', 'VST', '1.1');
      track.setSamplerPlugin(audioPlugin);
      const audioFxPlugin = new AudioPlugin('audioplugin1', 'man1', 'VST3', '1.0.0');
      track.setAudioPluginAt(1, audioFxPlugin);
      track.setSendAt(
        2,
        new TrackSend({
          outputBusRank: 2,
          gainLevel: 0.53,
          position: TrackSendPosition.PostFader,
          muted: true,
        }),
      );

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
      const clonedAudioFxPlugin = clonedTrack.getAudioPluginAt(1);
      expect(clonedAudioFxPlugin?.matchesTfId(audioFxPlugin.getTuneflowId())).toBe(true);
      const clonedSend = clonedTrack.getSendAt(2);
      expect(clonedSend.getOutputBusRank()).toBe(2);
      expect(clonedSend.getGainLevel()).toBeCloseTo(0.53);
      expect(clonedSend.getPosition()).toBe(TrackSendPosition.PostFader);
      expect(clonedSend.getMuted()).toBe(true);
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
  }); // end of midi tracks.

  describe('Aux tracks', () => {
    it('Clone aux track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      (track.getAuxTrackData() as AuxTrackData).setInputBusRank(3);
      const audioFxPlugin = new AudioPlugin('audioplugin1', 'man1', 'VST3', '1.0.0');
      track.setAudioPluginAt(1, audioFxPlugin);
      track.setSendAt(
        2,
        new TrackSend({
          outputBusRank: 2,
          gainLevel: 0.53,
          position: TrackSendPosition.PostFader,
          muted: true,
        }),
      );

      track.setVolume(0.1);
      track.setPan(60);
      track.setSolo(true);
      track.setMuted(true);

      const volumeAutomationTarget = new AutomationTarget(AutomationTargetType.VOLUME);
      track.getAutomation().addAutomation(volumeAutomationTarget);
      const automationValue = track
        .getAutomation()
        .getOrCreateAutomationValueById(volumeAutomationTarget.toTfAutomationTargetId());
      automationValue.setDisabled(true);
      automationValue.addPoint(3, 0.5, false);
      const clonedTrack = song.cloneTrack(track);
      const clonedTrackInstrument = clonedTrack.getInstrument();
      expect(clonedTrackInstrument).toBeUndefined();
      const clonedTrackSamplerPlugin = clonedTrack.getSamplerPlugin();
      expect(clonedTrackSamplerPlugin).toBeUndefined();
      const clonedAuxTrackData = clonedTrack.getAuxTrackData();
      expect(clonedAuxTrackData?.getInputBusRank()).toBe(3);
      const clonedAudioFxPlugin = clonedTrack.getAudioPluginAt(1);
      expect(clonedAudioFxPlugin?.matchesTfId(audioFxPlugin.getTuneflowId())).toBe(true);
      const clonedSend = clonedTrack.getSendAt(2);
      expect(clonedSend.getOutputBusRank()).toBe(2);
      expect(clonedSend.getGainLevel()).toBeCloseTo(0.53);
      expect(clonedSend.getPosition()).toBe(TrackSendPosition.PostFader);
      expect(clonedSend.getMuted()).toBe(true);
      expect(clonedTrack.getVolume()).toBeCloseTo(0.1);
      expect(clonedTrack.getPan()).toBe(60);
      expect(clonedTrack.getSolo()).toBe(true);
      expect(clonedTrack.getMuted()).toBe(true);

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
    it('CRUD audio plugins on a midi track correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPluginCount()).toEqual(0);

      track.setAudioPluginAt(0, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPluginCount()).toBe(1);
      expect(track.getAudioPluginAt(0)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);

      track.removeAudioPluginAt(0);

      expect(track.getAudioPluginCount()).toEqual(0);

      track.setAudioPluginAt(2, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPluginAt(0)).toBeUndefined();
      expect(track.getAudioPluginAt(2)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);
    });

    it('CRUD audio plugins on an audio trackcorrectly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });
      expect(track.getAudioPluginCount()).toEqual(0);

      track.setAudioPluginAt(0, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPluginCount()).toBe(1);
      expect(track.getAudioPluginAt(0)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);

      track.removeAudioPluginAt(0);

      expect(track.getAudioPluginCount()).toEqual(0);

      track.setAudioPluginAt(2, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID));

      expect(track.getAudioPluginAt(0)).toBeUndefined();
      expect(track.getAudioPluginAt(2)?.getTuneflowId()).toBe(AudioPlugin.DEFAULT_SYNTH_TFID);
    });

    it('Cannot set audio plugin at slot larger than supported', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPluginCount()).toEqual(0);

      expect(() =>
        track.setAudioPluginAt(1000, track.createAudioPlugin(AudioPlugin.DEFAULT_SYNTH_TFID)),
      ).toThrow();
    });

    it('Get audio plugin by instance id correctly', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });
      expect(track.getAudioPluginCount()).toEqual(0);

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
  }); // End of audio plugins.

  describe('Input bus', () => {
    it('Sets/Gets/Removes input bus rank correctly', () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      expect((track.getAuxTrackData() as AuxTrackData).getInputBusRank()).toBe(1);

      (track.getAuxTrackData() as AuxTrackData).setInputBusRank(2);

      expect((track.getAuxTrackData() as AuxTrackData).getInputBusRank()).toBe(2);

      (track.getAuxTrackData() as AuxTrackData).removeInputBus();

      expect((track.getAuxTrackData() as AuxTrackData).getInputBusRank()).toBeUndefined();
    });

    it('Non-aux track does not contain aux track data', () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });

      expect(track.getAuxTrackData()).toBeUndefined();
    });
  }); // End of input bus.

  describe('Sends', () => {
    it('Add send correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      expect(track.getSendCount()).toBe(0);

      track.setSendAt(
        0,
        new TrackSend({
          outputBusRank: 32,
          gainLevel: 1.0,
          position: TrackSendPosition.PreFader,
        }),
      );

      expect(track.getSendCount()).toBe(1);

      const addedSend = track.getSendAt(0);
      expect(addedSend.getOutputBusRank()).toBe(32);
      expect(addedSend.getGainLevel()).toBeCloseTo(1.0);
      expect(addedSend.getPosition()).toBe(TrackSendPosition.PreFader);
      expect(addedSend.getMuted()).toBe(false);

      track.setSendAt(
        1,
        new TrackSend({
          outputBusRank: 6,
          gainLevel: 0,
          position: TrackSendPosition.PostFader,
          muted: true,
        }),
      );

      expect(track.getSendCount()).toBe(2);

      const addedSend2 = track.getSendAt(1);
      expect(addedSend2.getOutputBusRank()).toBe(6);
      expect(addedSend2.getGainLevel()).toBeCloseTo(0);
      expect(addedSend2.getPosition()).toBe(TrackSendPosition.PostFader);
      expect(addedSend2.getMuted()).toBe(true);
    });

    it('Reject when adding send for master track', async () => {
      const masterTrack = song.getMasterTrack();

      expect(masterTrack).toBeTruthy();
      expect(() =>
        masterTrack.setSendAt(
          0,
          new TrackSend({
            outputBusRank: 2,
            gainLevel: 0.5,
            position: TrackSendPosition.PreFader,
          }),
        ),
      ).toThrow();
    });

    it('Reject when setting invalid gain level', async () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      expect(track.getSendCount()).toBe(0);

      expect(() =>
        track.setSendAt(
          0,
          new TrackSend({
            outputBusRank: 32,
            gainLevel: 1.1,
            position: TrackSendPosition.PreFader,
          }),
        ),
      ).toThrow();

      const newSend = new TrackSend({
        outputBusRank: 32,
        gainLevel: 1.0,
        position: TrackSendPosition.PreFader,
      });

      track.setSendAt(0, newSend);
      expect(() => newSend.setGainLevel(-1)).toThrow();
    });

    it('Adjust send correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      expect(track.getSendCount()).toBe(0);

      track.setSendAt(
        0,
        new TrackSend({
          outputBusRank: 31,
          gainLevel: 0.5,
          position: TrackSendPosition.PreFader,
        }),
      );

      expect(track.getSendCount()).toBe(1);

      const addedSend = track.getSendAt(0);
      expect(addedSend.getOutputBusRank()).toBe(31);
      expect(addedSend.getGainLevel()).toBeCloseTo(0.5);
      expect(addedSend.getPosition()).toBe(TrackSendPosition.PreFader);
      expect(addedSend.getMuted()).toBe(false);

      addedSend.setOutputBusRank(5);
      addedSend.setGainLevel(0);
      addedSend.setPosition(TrackSendPosition.PostFader);
      addedSend.setMuted(true);

      expect(addedSend.getOutputBusRank()).toBe(5);
      expect(addedSend.getGainLevel()).toBe(0);
      expect(addedSend.getPosition()).toBe(TrackSendPosition.PostFader);
      expect(addedSend.getMuted()).toBe(true);
    });

    it('Remove send correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      expect(track.getSendCount()).toBe(0);

      track.setSendAt(
        0,
        new TrackSend({
          outputBusRank: 31,
          gainLevel: 1.0,
          position: TrackSendPosition.PreFader,
        }),
      );

      expect(track.getSendCount()).toBe(1);
      expect(track.getSendAt(0)).toBeTruthy();

      track.removeSendAt(0);

      expect(track.getSendCount()).toBe(0);
      expect(track.getSendAt(0)).toBeUndefined();
    });
  }); // End of sends.

  describe('Track output', () => {
    it('Gets/Sets track output correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });

      expect(track.getOutput()).toBeUndefined();

      track.setOutput({
        type: TrackOutputType.Track,
        trackId: 'track1',
      });

      expect(track.getOutput()?.getType()).toBe(TrackOutputType.Track);
      expect(track.getOutput()?.getTrackId()).toBe('track1');
    });

    it('Rejects if updating to non-track output', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });

      track.setOutput({
        type: TrackOutputType.Track,
        trackId: 'track1',
      });

      expect(track.getOutput()?.getType()).toBe(TrackOutputType.Track);
      expect(track.getOutput()?.getTrackId()).toBe('track1');

      expect(() =>
        track.setOutput({
          type: TrackOutputType.Device,
          trackId: 'track1',
        }),
      ).toThrow();
    });

    it('Removes track output correctly', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });

      track.setOutput({
        type: TrackOutputType.Track,
        trackId: 'track1',
      });

      expect(track.getOutput()?.getType()).toBe(TrackOutputType.Track);
      expect(track.getOutput()?.getTrackId()).toBe('track1');

      track.removeOutput();

      expect(track.getOutput()).toBeUndefined();
    });

    it('Removes track deletes the track outputs that depend on it', async () => {
      const track = song.createTrack({
        type: TrackType.AUDIO_TRACK,
      });
      const track2 = song.createTrack({
        type: TrackType.AUX_TRACK,
      });

      track.setOutput({
        type: TrackOutputType.Track,
        trackId: track2.getId(),
      });

      expect(track.getOutput()?.getType()).toBe(TrackOutputType.Track);
      expect(track.getOutput()?.getTrackId()).toBe(track2.getId());

      track2.deleteFromParent();

      expect(track.getOutput()).toBeUndefined();
    });

    it('Rejects when setting output on master track', async () => {
      const track = song.getMasterTrack();

      expect(() =>
        track.setOutput({
          type: TrackOutputType.Device,
          trackId: 'sometrack',
        }),
      ).toThrow();
    });

    it('Rejects when setting output to itself', async () => {
      const track = song.createTrack({
        type: TrackType.MIDI_TRACK,
      });

      expect(() =>
        track.setOutput({
          type: TrackOutputType.Track,
          trackId: track.getId(),
        }),
      ).toThrow();
    });
  }); // End of track output.
});

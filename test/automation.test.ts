import {
  AutomationTarget,
  AutomationTargetType,
  AutomationValue,
  Song,
  TrackType,
  TuneflowPlugin,
} from '../src';

describe('Automation-related Tests', () => {
  class TestUtilsPlugin extends TuneflowPlugin {}

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
    song.createTrack({ type: TrackType.MIDI_TRACK });
  });

  describe('AutomationTarget', () => {
    it('Gets and sets properties correctly', async () => {
      let target = new AutomationTarget(AutomationTargetType.VOLUME);
      expect(target.getType()).toBe(AutomationTargetType.VOLUME);
      target = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'someplugininstanceid',
        'someparamid',
      );
      expect(target.getType()).toBe(AutomationTargetType.AUDIO_PLUGIN);
      expect(target.getPluginInstanceId()).toBe('someplugininstanceid');
      expect(target.getParamId()).toBe('someparamid');
      target.setPluginInstanceId('anotherplugininstanceid');
      expect(target.getPluginInstanceId()).toBe('anotherplugininstanceid');
      target.setParamId('anotherparamid');
      expect(target.getParamId()).toBe('anotherparamid');
      target.setType(AutomationTargetType.PAN);
      expect(target.getType()).toBe(AutomationTargetType.PAN);
    });

    it('Encodes target correctly', async () => {
      const target1 = new AutomationTarget(AutomationTargetType.VOLUME);
      expect(target1.toTfAutomationTargetId()).toBe('1');
      const target2 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );
      expect(target2.toTfAutomationTargetId()).toBe(`3^^pluginId1^^paramId1`);
    });

    it('Checks equality correctly', async () => {
      const target1 = new AutomationTarget(AutomationTargetType.PAN);
      const target2 = new AutomationTarget(AutomationTargetType.PAN);
      const target3 = new AutomationTarget(AutomationTargetType.VOLUME);
      const target4 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );
      const target5 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId2',
        'paramId2',
      );
      const target6 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId2',
        'paramId2',
      );
      expect(target1.equals(target2)).toBe(true);
      expect(target1.equals(target3)).toBe(false);
      expect(target1.equals(target4)).toBe(false);
      expect(target4.equals(target5)).toBe(false);
      expect(target5.equals(target6)).toBe(true);
    });

    it('Clones target correctly', async () => {
      const target1 = new AutomationTarget(AutomationTargetType.VOLUME);
      const target2 = target1.clone();
      expect(target1 === target2).toBe(false);
      expect(target1.equals(target2)).toBe(true);
    });
  });

  describe('AutomationValue', () => {
    it('Sets and gets disabled correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getDisabled()).toBe(false);
      automationValue.setDisabled(true);
      expect(automationValue.getDisabled()).toBe(true);
    });

    it('Adds and gets points correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
      ]);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 1);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 1,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
      ]);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.1, /* overwrite= */ true);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.1,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
      ]);
    });

    it('gets points within range correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.65);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.55);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPointsInRange(2, 3)).toEqual([
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.55,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.65,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
      ]);

      expect(automationValue.getPointsInRange(4, 3)).toEqual([]);

      expect(automationValue.getPointsInRange(5, 6)).toEqual([]);

      expect(automationValue.getPointsInRange(4, 5)).toEqual([
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      expect(automationValue.getPointsInRange(0, 1)).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
      ]);
    });

    it('Removes points correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      const points = automationValue.getPoints();
      const point2Id = points[2].id;
      automationValue.removePoints([points[0].id, points[1].id, points[3].id]);
      expect(automationValue.getPoints()).toEqual([
        {
          id: point2Id,
          tick: 3,
          value: 0.5,
        },
      ]);
    });

    it('Removes points in range correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.65);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.55);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.55,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.65,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      automationValue.removePointsInRange(2, 3);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
    });

    it('Moves multiple points to left overwrite correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.65);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.95);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.85);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.35);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.95,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.65,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.35,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.85,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      const points = automationValue.getPoints();
      automationValue.movePoints([points[1].id, points[2].id, points[3].id, points[4].id], -1, 0.3);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 0,
          value: expect.closeTo(0.95),
        },
        {
          id: expect.any(Number),
          tick: 0,
          value: expect.closeTo(0.55),
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: expect.closeTo(0.65),
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 1,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: expect.closeTo(0.75),
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.15),
        },
      ]);
    });

    it('Moves multiple points to right overwrite correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.65);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.95);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.85);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.35);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.95,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.65,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.35,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.85,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      const points = automationValue.getPoints();
      automationValue.movePoints([points[1].id, points[2].id, points[3].id, points[4].id], 2, -0.3);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: expect.closeTo(0.95),
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: expect.closeTo(0.35),
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.05),
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.55),
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.15),
        },
      ]);
    });

    it('Moves single point no overwrite correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      const points = automationValue.getPoints();
      automationValue.movePoints([points[2].id], -2, 0.3, /* overwriteValuesInDragArea= */ false);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: expect.closeTo(0.25),
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: expect.closeTo(0.8),
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: expect.closeTo(0.75),
        },

        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.15),
        },
      ]);
    });

    it('Moves single point overwrite correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.65);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.85);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.85,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.65,
        },
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      const points = automationValue.getPoints();
      automationValue.movePoints([points[1].id], 3, -0.3);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: expect.closeTo(0.85),
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.35),
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: expect.closeTo(0.15),
        },
      ]);
    });

    it('Moves points in range no overwrite correctly', async () => {
      const automationValue = new AutomationValue();
      expect(automationValue.getPoints()).toEqual([]);
      automationValue.addPoint(/* tick= */ 3, /* value= */ 0.5);
      automationValue.addPoint(/* tick= */ 1, /* value= */ 0.25);
      automationValue.addPoint(/* tick= */ 2, /* value= */ 0.75);
      automationValue.addPoint(/* tick= */ 4, /* value= */ 0.15);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 2,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 3,
          value: 0.5,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
      ]);
      automationValue.movePointsInRange(2, 3, 4, 0, /* overwriteValuesInDragArea= */ false);
      expect(automationValue.getPoints()).toEqual([
        {
          id: expect.any(Number),
          tick: 1,
          value: 0.25,
        },
        {
          id: expect.any(Number),
          tick: 4,
          value: 0.15,
        },
        {
          id: expect.any(Number),
          tick: 6,
          value: 0.75,
        },
        {
          id: expect.any(Number),
          tick: 7,
          value: 0.5,
        },
      ]);
    });
  });

  describe('AutomationData', () => {
    it('Adds automation correctly', async () => {
      const track = song.getTracks()[0];
      const target = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );
      expect(track.getAutomation().getAutomationTargets()).toEqual([]);
      expect(
        track.getAutomation().getAutomationValueById(target.toTfAutomationTargetId()),
      ).toBeUndefined();

      track.getAutomation().addAutomation(target);
      expect(track.getAutomation().getAutomationTargets().length).toBe(1);
      expect(track.getAutomation().getAutomationValueByTarget(target)).toBeTruthy();
      expect(track.getAutomation().getAutomationValueById(target.toTfAutomationTargetId())).toBe(
        track.getAutomation().getAutomationValueByTarget(target),
      );
    });

    it('Removes automation correctly', async () => {
      const track = song.getTracks()[0];
      const target = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );

      track.getAutomation().addAutomation(target);
      track.getAutomation().addAutomation(target);
      expect(track.getAutomation().getAutomationTargets().length).toBe(2);
      expect(track.getAutomation().getAutomationValueByTarget(target)).toBeTruthy();
      track.getAutomation().removeAutomation(target);
      expect(track.getAutomation().getAutomationTargets().length).toBe(0);
      expect(track.getAutomation().getAutomationValueByTarget(target)).toBeFalsy();
    });

    it('Multiple automation targets update the same value', async () => {
      const track = song.getTracks()[0];
      const target1 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );
      const target2 = new AutomationTarget(
        AutomationTargetType.AUDIO_PLUGIN,
        'pluginId1',
        'paramId1',
      );

      track.getAutomation().addAutomation(target1);
      track.getAutomation().addAutomation(target2);
      expect(track.getAutomation().getAutomationTargets().length).toBe(2);
      expect(
        (
          track.getAutomation().getAutomationValueByTarget(target1) as AutomationValue
        ).getDisabled(),
      ).toBe(false);
      expect(
        (
          track.getAutomation().getAutomationValueByTarget(target2) as AutomationValue
        ).getDisabled(),
      ).toBe(false);
      (track.getAutomation().getAutomationValueByTarget(target1) as AutomationValue).setDisabled(
        true,
      );
      expect(
        (
          track.getAutomation().getAutomationValueByTarget(target2) as AutomationValue
        ).getDisabled(),
      ).toBe(true);
    });
  });
});

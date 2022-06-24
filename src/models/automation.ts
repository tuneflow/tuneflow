import _ from 'underscore';
import { ge as greaterEqual, gt as greaterThan, lt as lowerThan } from 'binary-search-bounds';

export enum AutomationTargetType {
  UNDEFINED = 0,
  VOLUME = 1,
  PAN = 2,
  AUDIO_PLUGIN = 3,
}

/**
 * The target of an automation.
 *
 * i.e. Volume, Pan, a param of an audio plugin, etc.
 */
export class AutomationTarget {
  private type: AutomationTargetType;
  private pluginInstanceId?: string;
  private paramId?: string;

  /**
   *
   * @param type Type of the automation target.
   * @param pluginInstanceId The instance id of the plugin, required if type is AUDIO_PLUGIN.
   * @param paramId The paramId of the plugin automation param, required if type is AUDIO_PLUGIN.
   */
  constructor(type: AutomationTargetType, pluginInstanceId?: string, paramId?: string) {
    this.type = type;
    this.pluginInstanceId = pluginInstanceId;
    this.paramId = paramId;
  }

  /** Gets the type of the target. */
  getType() {
    return this.type;
  }

  setType(type: AutomationTargetType) {
    this.type = type;
  }

  /**
   * The local id of the target track plugin.
   *
   * Available if type is `AUDIO_PLUGIN`.
   */
  getPluginInstanceId() {
    return this.pluginInstanceId;
  }

  /**
   *
   * @param pluginInstanceId The instance id of the track plugin that can be retrieved from `AudioPlugin.getInstanceId`.
   */
  setPluginInstanceId(pluginInstanceId?: string) {
    this.pluginInstanceId = pluginInstanceId;
  }

  /**
   * The paramId of the plugin automation param.
   *
   * Available if type is `AUDIO_PLUGIN`.
   */
  getParamId() {
    return this.paramId;
  }

  setParamId(paramId?: string) {
    this.paramId = paramId;
  }

  equals(target: AutomationTarget) {
    return AutomationTarget.areAutomationTargetsEqual(
      this.getType(),
      target.getType(),
      this.getPluginInstanceId(),
      target.getPluginInstanceId(),
      this.getParamId(),
      target.getParamId(),
    );
  }

  clone() {
    return new AutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }

  /** Gets a unique id that identifies this target type. */
  toTfAutomationTargetId() {
    return AutomationTarget.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }

  static fromTfAutomationTargetId(tfAutomationTargetId: string) {
    return AutomationTarget.decodeAutomationTarget(tfAutomationTargetId);
  }

  static encodeAutomationTarget(
    targetType: AutomationTargetType,
    pluginInstanceId?: string,
    paramId?: string,
  ) {
    if (targetType === AutomationTargetType.AUDIO_PLUGIN) {
      return `${targetType}^^${pluginInstanceId}^^${paramId}`;
    }
    return `${targetType}`;
  }

  static decodeAutomationTarget(encodedTarget: string) {
    const parts = encodedTarget.split('^^');
    if (parts.length === 0) {
      throw new Error(`Invalid automation target id: ${encodedTarget}`);
    }
    const type = Number(parts[0]);
    if (parts.length > 2) {
      return new AutomationTarget(type, parts[1], parts[2]);
    }
    return new AutomationTarget(type);
  }

  static areAutomationTargetsEqual(
    targetType1: AutomationTargetType,
    targetType2: AutomationTargetType,
    pluginInstanceId1?: string,
    pluginInstanceId2?: string,
    paramId1?: string,
    paramId2?: string,
  ) {
    return (
      AutomationTarget.encodeAutomationTarget(targetType1, pluginInstanceId1, paramId1) ===
      AutomationTarget.encodeAutomationTarget(targetType2, pluginInstanceId2, paramId2)
    );
  }
}

/** A single point in an automation curve. */
export interface AutomationPoint {
  /** An int32. */
  id: number;
  tick: number;
  value: number;
}

/** The points and settings of an automation param. */
export class AutomationValue {
  private points: AutomationPoint[] = [];
  private disabled = false;
  private nextPointIdInternal = 1;

  getDisabled() {
    return this.disabled;
  }

  setDisabled(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  getPoints() {
    return this.points;
  }

  getPointsInRange(startTick: number, endTick: number) {
    return AutomationValue.getPointsInRangeImpl(this.points, startTick, endTick);
  }

  private static getPointsInRangeImpl(
    points: AutomationPoint[],
    startTick: number,
    endTick: number,
  ) {
    const startIndex = greaterEqual(
      points,
      { tick: startTick } as AutomationPoint,
      (a, b) => a.tick - b.tick,
    );
    const results = [];
    for (let i = startIndex; i < points.length; i += 1) {
      const point = points[i];
      if (point.tick > endTick) {
        break;
      }
      results.push(point);
    }
    return results;
  }

  /**
   *
   * @param overwrite Whether to overwrite the points at the insert tick.
   */
  addPoint(tick: number, value: number, overwrite = false) {
    const newPoint: AutomationPoint = {
      tick,
      value,
      id: this.getNextPointIdInternal(),
    };
    AutomationValue.orderedInsertPointInternal(this.points, newPoint, overwrite);
    return newPoint;
  }

  /**
   * Remove points that match the given ids.
   * @param pointIds
   */
  removePoints(pointIds: number[]) {
    const idSet = new Set<number>(pointIds);
    for (let i = this.points.length - 1; i >= 0; i -= 1) {
      const point = this.points[i];
      if (idSet.has(point.id)) {
        this.points.splice(i, 1);
      }
    }
  }

  /**
   * Removes all points within the given time range.
   * @param startTick Inclusive
   * @param endTick Inclusive
   */
  removePointsInRange(startTick: number, endTick: number) {
    const startIndex = greaterEqual(
      this.points,
      { tick: startTick } as AutomationPoint,
      (a, b) => a.tick - b.tick,
    );
    if (startIndex >= this.points.length) {
      return;
    }
    let endIndex = startIndex;
    while (endIndex + 1 < this.points.length && this.points[endIndex + 1].tick <= endTick) {
      endIndex += 1;
    }
    this.points.splice(startIndex, endIndex - startIndex + 1);
  }

  movePointsInRange(
    startTick: number,
    endTick: number,
    offsetTick: number,
    offsetValue: number,
    overwriteValuesInDragArea = true,
  ) {
    const points = this.getPointsInRange(startTick, endTick);
    this.movePoints(
      points.map(point => point.id),
      offsetTick,
      offsetValue,
      overwriteValuesInDragArea,
    );
  }

  /**
   *
   * @param pointIds
   * @param offsetTick
   * @param offsetValue
   * @param overwriteValuesInDragArea If true, all values in between the moved points' old and new indexes will be removed.
   */
  movePoints(
    pointIds: number[],
    offsetTick: number,
    offsetValue: number,
    overwriteValuesInDragArea = true,
  ) {
    if (pointIds.length === 0) {
      return;
    }
    const pointIdSet = new Set<number>(pointIds);
    let dragAreaLeftIndex: number | undefined = undefined;
    let dragAreaRightIndex: number | undefined = undefined;
    const selectedPoints = [];
    for (let i = 0; i < this.points.length; i += 1) {
      const point = this.points[i];
      if (!pointIdSet.has(point.id)) {
        continue;
      }
      selectedPoints.push(point);
      if (dragAreaLeftIndex === undefined) {
        dragAreaLeftIndex = i;
      }
      dragAreaRightIndex = i;
    }
    if (dragAreaLeftIndex === undefined || dragAreaRightIndex === undefined) {
      // None of the given points are not in the automation.
      return;
    }
    if (overwriteValuesInDragArea) {
      // Remove values in drag area.
      if (offsetTick < 0) {
        // Move left, remove values to the left.
        const selectedPointsLeftAfterMove = Math.max(
          0,
          this.points[dragAreaLeftIndex].tick + offsetTick,
        );
        const startRemoveIndex = greaterThan(
          this.points,
          { tick: selectedPointsLeftAfterMove } as AutomationPoint,
          (a, b) => a.tick - b.tick,
        );
        if (startRemoveIndex < dragAreaLeftIndex) {
          this.points.splice(startRemoveIndex, dragAreaLeftIndex - startRemoveIndex);
        }
      } else if (offsetTick > 0) {
        // Move right, remove values to the right.
        const selectedPointsRightAfterMove = this.points[dragAreaRightIndex].tick + offsetTick;
        const endRemoveIndex = lowerThan(
          this.points,
          { tick: selectedPointsRightAfterMove } as AutomationPoint,
          (a, b) => a.tick - b.tick,
        );
        if (endRemoveIndex > dragAreaRightIndex) {
          this.points.splice(dragAreaRightIndex + 1, endRemoveIndex - dragAreaRightIndex);
        }
      }
    }
    for (const point of selectedPoints) {
      point.tick = Math.max(0, point.tick + offsetTick);
      point.value = Math.max(0, Math.min(1, point.value + offsetValue));
    }
    // Maintain the order of points.
    if (Math.abs(offsetTick) > 0) {
      this.points.sort((a, b) => a.tick - b.tick);
    }
  }

  private getNextPointIdInternal() {
    const pointId = this.nextPointIdInternal;
    if (this.nextPointIdInternal >= /* 2^31 -1 */ 2147483647) {
      this.nextPointIdInternal = 1;
    } else {
      this.nextPointIdInternal += 1;
    }

    return pointId;
  }

  private static orderedInsertPointInternal(
    points: AutomationPoint[],
    newPoint: AutomationPoint,
    overwrite = false,
  ) {
    const insertIndex = greaterEqual(
      points,
      newPoint,
      (a: AutomationPoint, b: AutomationPoint) => a.tick - b.tick,
    );

    while (overwrite && points[insertIndex] && points[insertIndex].tick === newPoint.tick) {
      // Remove the points at the insert tick.
      points.splice(insertIndex, 1);
    }

    points.splice(insertIndex, 0, newPoint);
  }
}

/**
 * All automation data of one entity (such as a track).
 *
 * Each `AutomationData` consists of several automation targets(`AutomationTarget`) and
 * the values(`AutomationValue`) store in unique targets.
 *
 * Note that there can be duplicate targets, but targets of the same type write to
 * and read from the same automation value.
 *
 * For example, there can be multiple Volume targets, each Volume target corresponds to
 * the same automation value.
 */
export class AutomationData {
  private targets: AutomationTarget[] = [];

  private targetValues: { [tfAutomationTargetId: string]: AutomationValue | undefined } = {};

  /** All automation targets specified by the user. */
  getAutomationTargets() {
    return this.targets;
  }

  /** Values of each unique automation target. */
  getAutomationTargetValues() {
    return this.targetValues;
  }

  /**
   *
   * @param tfAutomationTargetId The targetId that can be retrieved from `AutomationTarget.prototype.toTfAutomationTargetId` or `AutomationTarget.encodeAutomationTarget`.
   * @returns The automation value of the given target if exists, otherwise creates a new one and returns it.
   */
  getOrCreateAutomationValueById(tfAutomationTargetId: string): AutomationValue {
    if (!this.targetValues[tfAutomationTargetId]) {
      this.targetValues[tfAutomationTargetId] = new AutomationValue();
    }
    return this.targetValues[tfAutomationTargetId] as AutomationValue;
  }

  /**
   *
   * Gets or creates the automation points and settings of an automation target.
   * @param tfAutomationTargetId The targetId that can be retrieved from `AutomationTarget.prototype.toTfAutomationTargetId` or `AutomationTarget.encodeAutomationTarget`.
   */
  getAutomationValueById(tfAutomationTargetId: string) {
    return this.targetValues[tfAutomationTargetId];
  }

  getAutomationValueByTarget(target: AutomationTarget) {
    const tfAutomationTargetId = target.toTfAutomationTargetId();
    return this.getAutomationValueById(tfAutomationTargetId);
  }

  /** Adds an automation target, if there was no such target, creates the automation value. */
  addAutomation(target: AutomationTarget, index = 0) {
    if (!_.isNumber(index)) {
      index = 0;
    }
    this.targets.splice(index, 0, target);

    const tfAutomationTargetId = target.toTfAutomationTargetId();
    if (!this.getAutomationValueById(tfAutomationTargetId)) {
      this.targetValues[tfAutomationTargetId] = new AutomationValue();
    }
  }

  /** Removes all automation targets of the given type and its automation value. */
  removeAutomation(target: AutomationTarget) {
    // Remove targets.
    for (let i = this.targets.length - 1; i >= 0; i -= 1) {
      const existingTarget = this.targets[i];
      if (existingTarget.equals(target)) {
        this.targets.splice(i, 1);
      }
    }

    // Remove values.
    const tfAutomationTargetId = target.toTfAutomationTargetId();
    delete this.targetValues[tfAutomationTargetId];
  }

  /** Remove all automations associated with a certain plugin. */
  removeAutomationOfPlugin(pluginInstanceId: string) {
    for (let i = this.targets.length - 1; i >= 0; i -= 1) {
      const automationTarget = this.targets[i];
      if (automationTarget.getPluginInstanceId() === pluginInstanceId) {
        this.removeAutomation(automationTarget);
      }
    }
    for (const tfAutomationTargetId of _.keys(this.targetValues)) {
      const automationTarget = AutomationTarget.decodeAutomationTarget(tfAutomationTargetId);
      if (automationTarget.getPluginInstanceId() === pluginInstanceId) {
        this.removeAutomation(automationTarget);
      }
    }
  }

  /**
   *
   * @param startTick Inclusive
   * @param endTick Inclusive
   */
  removeAllPointsWithinRange(startTick: number, endTick: number) {
    for (const tfAutomationTargetId of _.keys(this.targetValues)) {
      const automationValue = this.targetValues[tfAutomationTargetId] as AutomationValue;
      automationValue.removePointsInRange(startTick, endTick);
    }
  }

  /**
   *
   * @param startTick Inclusive
   * @param endTick Inclusive
   */
  moveAllPointsWithinRange(
    startTick: number,
    endTick: number,
    offsetTick: number,
    offsetValue: number,
  ) {
    for (const tfAutomationTargetId of _.keys(this.targetValues)) {
      const automationValue = this.targetValues[tfAutomationTargetId] as AutomationValue;
      automationValue.movePointsInRange(
        startTick,
        endTick,
        offsetTick,
        offsetValue,
        /* overwriteValuesInDragArea= */ false,
      );
    }
  }
}

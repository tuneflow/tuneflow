import _ from 'underscore';
import { ge as greaterEqual } from 'binary-search-bounds';

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
   *
   * @param pointIds
   * @param offsetTick
   * @param offsetValue
   * @param overwriteValuesInDragArea If true, all values in between the new and old point time ranges will be deleted.
   */
  movePoints(
    pointIds: number[],
    offsetTick: number,
    offsetValue: number,
    overwriteValuesInDragArea = true,
  ) {
    const pointIdSet = new Set<number>(pointIds);
    let dragAreaLeft = Number.MAX_SAFE_INTEGER;
    let dragAreaRight = 0;
    for (const point of this.points) {
      if (!pointIdSet.has(point.id)) {
        continue;
      }
      dragAreaLeft = Math.min(point.tick, dragAreaLeft);
      dragAreaRight = Math.max(point.tick, dragAreaRight);
    }
    dragAreaLeft = Math.min(dragAreaLeft, dragAreaLeft + offsetTick);
    dragAreaRight = Math.max(dragAreaRight, dragAreaRight + offsetTick);
    for (let i = this.points.length - 1; i >= 0; i -= 1) {
      const point = this.points[i];
      const isSelected = pointIdSet.has(point.id);
      if (
        overwriteValuesInDragArea &&
        !isSelected &&
        point.tick >= dragAreaLeft &&
        point.tick <= dragAreaRight
      ) {
        // Delete the points that are not being moved and overlap with the drag area.
        this.points.splice(i, 1);
      } else if (isSelected) {
        point.tick = Math.max(0, point.tick + offsetTick);
        point.value = Math.max(0, Math.min(1, point.value + offsetValue));
      }
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

  /**
   *
   * @param tfAutomationTargetId The targetId that can be retrieved from `AutomationTarget.prototype.toTfAutomationTargetId` or `AutomationTarget.encodeAutomationTarget`.
   * @returns The automation value of the given target if exists, otherwise creates a new one and returns it.
   */
  getOrCreateAutomationValueById(tfAutomationTargetId: string) {
    if (!this.targetValues[tfAutomationTargetId]) {
      this.targetValues[tfAutomationTargetId] = new AutomationValue();
    }
    return this.targetValues[tfAutomationTargetId];
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
}

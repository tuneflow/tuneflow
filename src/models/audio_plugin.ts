import {
  areTuneflowIdsEqual,
  areTuneflowIdsEqualIgnoreVersion,
  getAudioPluginTuneflowId,
} from '../utils';
import type { Track } from './track';

export class AudioPlugin {
  private name: string;
  private manufacturerName: string;
  private pluginFormatName: string;
  private pluginVersion: string;
  private isEnabled = true;
  // @ts-ignore
  private localInstanceIdInternal: string;
  // @ts-ignore
  private base64StatesInternal: string;

  /**
   * DO NOT call the constructor directly, use Track.createAudioPlugin(tfId: string) instead.
   * @param name
   * @param manufacturerName
   * @param pluginFormatName
   * @param pluginVersion
   */
  constructor(
    name: string,
    manufacturerName: string,
    pluginFormatName: string,
    pluginVersion: string,
  ) {
    this.name = name;
    this.manufacturerName = manufacturerName;
    this.pluginFormatName = pluginFormatName;
    this.pluginVersion = pluginVersion;
  }

  /**
   * Gets an id that lets Tuneflow uniquely identify the plugin.
   */
  getTuneflowId() {
    return getAudioPluginTuneflowId(
      this.manufacturerName,
      this.pluginFormatName,
      this.name,
      this.pluginVersion,
    );
  }

  clone(newTrack: Track) {
    const newPlugin = newTrack.createAudioPlugin(this.getTuneflowId());
    newPlugin.setIsEnabled(this.isEnabled);
    return newPlugin;
  }

  /**
   * Exactly matches the plugin type specified by the tfId.
   * @param tfId
   * @returns
   */
  matchesTfId(tfId: string) {
    return areTuneflowIdsEqual(tfId, this.getTuneflowId());
  }

  /**
   * Similar to matchesTfId but does not check version.
   * @param tfId
   * @returns
   */
  matchesTfIdIgnoreVersion(tfId: string) {
    return areTuneflowIdsEqualIgnoreVersion(tfId, this.getTuneflowId());
  }

  /** A unique id to identify the plugin instance. */
  getInstanceId() {
    return this.localInstanceIdInternal;
  }

  toJSON() {
    return {
      name: this.name,
      manufacturerName: this.manufacturerName,
      pluginFormatName: this.pluginFormatName,
      pluginVersion: this.pluginVersion,
      isEnabled: this.isEnabled,
    };
  }

  setIsEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }

  getIsEnabled() {
    return this.isEnabled;
  }
}

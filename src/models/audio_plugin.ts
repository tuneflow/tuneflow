import { getAudioPluginTuneflowId } from '../utils';

export class AudioPlugin {
  private name: string;
  private manufacturerName: string;
  private pluginFormatName: string;
  private pluginVersion: string;
  private isEnabled = true;

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

  clone() {
    const newPlugin = new AudioPlugin(
      this.name,
      this.manufacturerName,
      this.pluginFormatName,
      this.pluginVersion,
    );
    newPlugin.setIsEnabled(this.isEnabled);
    return newPlugin;
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

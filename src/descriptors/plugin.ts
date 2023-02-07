export interface TuneflowPluginOptions {
  /**
   * Whether to allow users to reset all parameters of this plugin.
   *
   * Defaults to true.
   */
  allowReset?: boolean;

  /**
   * Whether the user can manually apply this plugin and go back to adjust it.
   * Enable this when you want the user to frequently toggle this plugin on and off
   * to see the difference.
   * For example: A plugin that divides a track into two, you want the user to
   * easily switch between the plugin is on or off to see what's going on.
   *
   * Defaults to false.
   */
  allowManualApplyAdjust?: boolean;
}

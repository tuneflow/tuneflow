export interface ClipInfo {
  trackId: string;
  clipId: string;
}

type SupportedPlatform = 'desktop' | 'web';

export interface PluginInfo {
  /** If not provided, supports all platforms. */
  supportedPlatforms?: SupportedPlatform[];

  /**
   * If specified, the desktop requires
   * a minimum version to run this plugin.
   */
  minRequiredDesktopVersion?: string;
}

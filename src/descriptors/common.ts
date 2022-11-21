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

  /** If true, this plugin is in development stage and can only be accessed by its developer. */
  isInDevelopment?: boolean;
}

export interface SongAccess {
  /** Whether the plugin has permission to create a new track. */
  createTrack?: boolean;

  /** Whether the plugin has permission to remove a track. */
  removeTrack?: boolean;
}

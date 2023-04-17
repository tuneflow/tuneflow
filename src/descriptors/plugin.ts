import type { EntityId } from './common';
import type { LabelText } from './text';

/** The type of the `triggers` field in the plugin's `bundle.json`. */
export type TuneflowPluginTrigger = TuneflowPluginTriggerType | TuneflowPluginTriggerConfig;

/** The type of data that is injected to the params of the plugins that have `triggers` specified. */
export interface TuneflowPluginTriggerData {
  type: TuneflowPluginTriggerType;
  entities?: EntityId[];
}

export const TuneflowPluginCategory = {
  Generate: 'generate',
  Transcribe: 'transcribe',
  SeparateSource: 'separate_source',
  Import: 'import',
};

/**
 * The types of plugin triggers.
 *
 * * `song` The plugin will be available on the track and main editing area context menus.
 *        When running, it will not receive additional trigger data..
 * * `context-track-content` The plugin will be available on the **content** part(the "track" portion) of the context menu of the track.
 *        When running, it will receive trigger data about the triggering track under cursor.
 * * `context-track-control` The plugin will be available on the **control** part(the "knobs" portion) of the context menu of the track.
 *        When running, it will receive trigger data about the triggering track under cursor.
 * * `selected-clips` The plugin will be available on the clip context menu. When running, it will receive trigger data about the currently selected clips.
 */
export type TuneflowPluginTriggerType =
  | 'song'
  | 'context-track-content'
  | 'context-track-control'
  | 'selected-clips';

export interface TuneflowPluginTriggerConfig {
  type: TuneflowPluginTriggerType;
  config?:
    | ContextTrackContentTriggerConfig
    | ContextTrackControlTriggerConfig
    | SelectedClipTriggerConfig;
}

export type AllowedTrackType = 'midi' | 'audio' | 'aux';

export interface ContextTrackContentTriggerConfig {
  allowedTrackTypes?: AllowedTrackType[];

  /**
   * When specified, the track's instrument must match one of the given instruments.
   *
   * NOTE: Use with caution since it blocks the plugin from running, and a lot of times you can simply
   * update the tracks's instrument to what you want.
   */
  allowedTrackInstruments?: AllowedTrackInstrument[];

  /** If true, allowed instruments flags will be ignored on desktop. */
  skipAllowedInstrumentCheckOnDesktop?: boolean;
}

export interface ContextTrackControlTriggerConfig {
  allowedTrackTypes?: AllowedTrackType[];

  /**
   * When specified, the track's instrument must match one of the given instruments.
   *
   * NOTE: Use with caution since it blocks the plugin from running, and a lot of times you can simply
   * update the tracks's instrument to what you want.
   */
  allowedTrackInstruments?: AllowedTrackInstrument[];

  /** If true, allowed instruments flags will be ignored on desktop. */
  skipAllowedInstrumentCheckOnDesktop?: boolean;
}

export type AllowedClipType = 'midi' | 'audio';

/** Allowed track instrument. Leave any field undefined to indicate it accepts anything. */
export interface AllowedTrackInstrument {
  program?: number;
  isDrum?: boolean;
}

export interface SelectedClipTriggerConfig {
  allowedClipTypes?: AllowedClipType[];

  maxNumClips?: number;

  /**
   * When specified, the corresponding track's instrument must match one of the given instruments.
   *
   * NOTE: Use with caution since it blocks the plugin from running, and a lot of times you can simply
   * update the tracks's instrument to what you want.
   */
  allowedTrackInstruments?: AllowedTrackInstrument[];

  /** If true, allowed instruments flags will be ignored on desktop. */
  skipAllowedInstrumentCheckOnDesktop?: boolean;
}

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

/** Specification for a single popup to show to the user when they run the plugin. */
export interface TuneflowPluginNotice {
  /** Title of the popup, optional. */
  title?: LabelText;
  /** Content of the popup, required. */
  content: LabelText;
  /** Whether this notice is shown to the user when they run the plugin. */
  showPopup?: boolean;
  /** Whether the popup needs user to explicitly say OK in order to continue. */
  requiresPopupConsent?: boolean;
}

/** Format of the "nitices" field in the `bundle.json` file. */
export type TuneflowPluginNoticeConfig = { [key: string]: TuneflowPluginNotice };

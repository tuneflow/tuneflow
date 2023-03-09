import type { AudioData } from '../models/clip';
import type { ClipInfo } from './common';
import type { LabelText } from './text';
import type { WidgetDescriptor } from './widgets';

export interface ParamDescriptor {
  /** The name to display on the UI. */
  displayName: LabelText;

  /** Configuration of the widget to display on the UI. */
  widget: WidgetDescriptor;

  /** The default value of the param. */
  defaultValue?: any;

  /**
   * Whether this param is adjustable. If the param is not adjustable, the controllable
   * part is not shown.
   * Default to true.
   */
  adjustable?: boolean;

  /**
   * Whether this param is hidden completely.
   */
  hidden?: boolean;

  /** Whether this param can be left undefined or null. */
  optional?: boolean;

  /** Explaining what this parameter is for. */
  description?: LabelText;

  /**
   * Injects the value from the editor at the time the plugin runs.
   *
   * If specified, the editor will inject the value specified by the `InjectSource` or `InjectConfig`.
   */
  injectFrom?: InjectSource | InjectConfig;

  /**
   * If set to true, this param can still be adjusted
   * when the plugin is applied. However, changing the param
   * will invalidate all the changes after this plugin.
   */
  adjustableWhenPluginIsApplied?: boolean;
}

export enum InjectSource {
  /** A string that represents the ids of the current selected tracks. */
  SelectedTrackIds = 1,

  /** A `ClipInfo[]` that represents the `ClipInfo`s of the current selected clips. */
  SelectedClipInfos = 2,

  /** A number that represents the current tick that the playhead is at. */
  TickAtPlayhead = 3,

  /** The `ClipInfo` of the clip that is being edited in the MIDI editor. */
  EditingClipInfo = 4,

  /** The ids of the notes that is being edited in the MIDI editor. */
  EditingNoteIds = 5,

  /** A number that represents the start tick of the beat where the playhead is at. */
  TickAtPlayheadSnappedToBeat = 6,

  /** A list of `AudioData` for specified clips. */
  ClipAudioData = 7,
}

/** Inject config for when injection source is `InjectSource.ClipAudioData`. */
export interface ClipAudioDataInjectOptions {
  clips: 'selectedAudioClips' | ClipInfo[];
}

export interface ClipAudioDataInjectDataEntry {
  clipInfo: ClipInfo;
  audioData: AudioData;
}

/** Inject data type when injection source is `InjectSource.ClipAudioData`. */
export type ClipAudioDataInjectData = ClipAudioDataInjectDataEntry[];

/** Inject config for when injection source is `InjectSource.SelectedClipInfos`. */
export interface SelectedClipInfosInjectOptions {
  /** Maximnum number of clip infos to include. Defaults to unlimited. */
  maxNumClips?: number;
}

/** Used to specify a injection source when additional config is needed. */
export type InjectConfig = {
  type: InjectSource;
  options: ClipAudioDataInjectOptions | SelectedClipInfosInjectOptions;
};

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
   * If specified, the editor will inject the value specified by the `InjectSource`,
   * if you want to overwrite the value provided by the editor,
   * you can use initPluginInstance.
   */
  injectFrom?: InjectSource;
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
}

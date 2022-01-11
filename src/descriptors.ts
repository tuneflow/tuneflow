/** A dictionary whose keys are a locale such as 'zh', and the values are the translation. */
export type I18nLabelText = { [locale: string]: string };

/** A plain string or a dictionary mapping locales to translations. */
export type LabelText = string | I18nLabelText;

export interface SliderWidgetConfig {
  minValue: number;
  maxValue: number;
  step: number;
  unit?: string;
}

export interface InputWidgetConfig {
  minValue: number;
  maxValue: number;
  step: number;
}

export interface SelectOptionConfig {
  value: number;
  label: number;
}

export interface SelectWidgetConfig {
  options: SelectOptionConfig[];
}

export interface TrackSelectorWidgetConfig {
  multiSelection?: boolean;
}

export interface PitchWidgetConfig {
  minAllowedPitch?: number;
  maxAllowedPitch?: number;
}

export interface WidgetDescriptor {
  type: WidgetType;
  config:
    | SliderWidgetConfig
    | InputWidgetConfig
    | SelectWidgetConfig
    | TrackSelectorWidgetConfig
    | PitchWidgetConfig;
}

export interface SongAccess {
  /** Whether the plugin has permission to create a new track. */
  createTrack?: boolean;

  /** Whether the plugin has permission to remove a track. */
  removeTrack?: boolean;
}

export enum WidgetType {
  Slider = 1,
  Input = 2,
  /** A widget that selects one or more track(s). */
  TrackSelector = 3,
  /** A widget that selects a pitch. */
  Pitch = 4,
}

export interface ParamDescriptor {
  /** The name to display on the UI. */
  displayName: LabelText;

  /** Configuration of the widget to display on the UI. */
  widget: WidgetDescriptor;

  /** The default value of the param. */
  defaultValue?: any;

  /** Explaining what this parameter is for. */
  description?: LabelText;
}

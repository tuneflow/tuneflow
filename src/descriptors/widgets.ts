import type { LabelText } from './text';

export enum WidgetType {
  Slider = 1,
  Input = 2,
  /** A widget that selects one track. */
  TrackSelector = 3,
  /** A widget that selects a pitch. */
  Pitch = 4,
  TrackPitchSelector = 5,
  InstrumentSelector = 6,
  Select = 7,
  Switch = 8,
  InputNumber = 9,
  MultiTrackSelector = 10,
  /** Does not render a widget. */
  None = 11,
}

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

export interface TrackSelectorWidgetConfig {
  /** Whether to always show the track info. Default to false. */
  alwaysShowTrackInfo?: boolean;
}

export interface PitchWidgetConfig {
  minAllowedPitch?: number;
  maxAllowedPitch?: number;
}

export interface TrackPitchSelectorWidgetConfig {
  trackSelectorConfig: TrackSelectorWidgetConfig;
  pitchSelectorConfig: PitchWidgetConfig;
}

export interface InstrumentSelectorWidgetConfig {
  /** Not supported yet. */
  disabledPrograms?: number[];
}

export interface SelectWidgetOption {
  label: LabelText;
  value: any;
}

export interface SelectWidgetConfig {
  options: SelectWidgetOption[];
  /** Whether to show search box. Default to false. */
  allowSearch?: boolean;
  placeholder?: LabelText;
  /** https://arco.design/vue/component/select#virtual-list */
  virtualListProps?: any;
}

export interface SwitchWidgetConfig {
  /**
   * 'circle' | 'round' | 'line'
   * https://arco.design/vue/component/switch
   */
  type?: 'circle' | 'round' | 'line';
}

export interface InputNumberWidgetConfig {
  minValue: number;
  maxValue: number;
}

export interface WidgetDescriptor {
  type: WidgetType;
  config?:
    | SliderWidgetConfig
    | InputWidgetConfig
    | SelectWidgetConfig
    | TrackSelectorWidgetConfig
    | PitchWidgetConfig
    | TrackPitchSelectorWidgetConfig
    | InstrumentSelectorWidgetConfig
    | SelectWidgetConfig
    | SwitchWidgetConfig
    | InputNumberWidgetConfig
    | undefined
    | null;
}

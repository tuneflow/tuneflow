/** A dictionary whose keys are a locale such as 'zh', and the values are the translation. */
export type I18nLabelText = { [locale: string]: string };

/** A plain string or a dictionary mapping locales to translations. */
export type LabelText = string | I18nLabelText;

export interface SliderWidgetConfig {
  minValue: number;
  maxValue: number;
  step: number;
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

export interface WidgetDescriptor {
  type: WidgetType;
  config: SliderWidgetConfig | InputWidgetConfig | SelectWidgetConfig;
}

export enum WidgetType {
  Slider = 1,
  Input = 2,
}

export interface ParamDescriptor {
  /** The name to display on the UI. */
  displayName: LabelText;

  /** The default value of the param. */
  defaultValue: any;

  /** Configuration of the widget to display on the UI. */
  widget: WidgetDescriptor;
}

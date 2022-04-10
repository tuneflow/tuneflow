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
}

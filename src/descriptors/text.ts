/** A dictionary whose keys are a locale such as 'zh', and the values are the translation. */
export type I18nLabelText = { [locale: string]: string };

/** A plain string or a dictionary mapping locales to translations. */
export type LabelText = string | I18nLabelText;

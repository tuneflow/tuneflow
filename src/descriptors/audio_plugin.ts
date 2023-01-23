/** Descriptor of an audio plugin. */
export interface AudioPluginDescriptor {
  /** An internal id of the plugin. */
  id: string;

  /**
   * A short name of the plugin.
   * Use this when creating `AudioPlugin` instances.
   * */
  name: string;

  /**
   * Whether this plugin can be used as an instrument to generate
   * sound from MIDI notes.
   */
  isInstrument: string;

  /** Manufacturer of the plugin. */
  manufacturerName: string;

  /** Format of the plugin. e.g. 'VST3', 'AudioUnit', etc. */
  pluginFormatName: string;

  /** Version of the plugin. */
  version: string;

  /**
   * Category of the plugin.
   * e.g.: 'Instrument|Synth', 'Fx|EQ', etc.
   */
  category?: string;

  /** A more detailed name. */
  descriptiveName?: string;
}

import type { Song } from './models/song';

export interface ArtifactDescriptor {
  plugin: typeof BasePlugin;
  artifactId: string;
}

/**
 * The base class of a plugin.
 *
 * All plugins should be a sub-class of this plugin in order to run in the pipeline.
 */
export class BasePlugin {
  /**
   * The unique id to identify the plugin provider.
   *
   * For example:
   * `friday-core`, `some-corp`, etc.
   */
  static providerId(): string {
    throw new Error('providerId() should be overwritten.');
  }

  /**
   * The unique plugin id under the provider's namespace.
   *
   * For example:
   * `melody-extractor`, `tune-analyzer`, etc.
   */
  static pluginId(): string {
    throw new Error('pluginId() should be overwritten.');
  }

  /**
   * Provider a list of their class names.
   *
   * You get the output of these plugins as the input of @run method of this plugin.
   */
  inputs(): ArtifactDescriptor[] {
    return [];
  }

  /**
   * The main logic here.
   *
   * It should return a map that contains the produced artifacts of this plugin.
   * Each artifact goes under a different artifactId.
   *
   * For example: `{ 'artifactId1': <output1>, 'artifactId2': <output2> }`
   *
   * @param song The song that is being processed. You can directly modify the song
   * by calling its methods.
   * @param inputs The inputs specified by the `inputs` method.
   *
   */
  // eslint-disable-next-line
  async run(song: Song, inputs: any[]): Promise<{ [artifactId: string]: any } | void> {}

  // ============ INTERNAL BELOW ================

  /**
   * DO NOT overwrite this method.
   * @final
   * @returns The unique identifier for this plugin, which is the combination of providerId and moduleId.
   */
  public static id(): string {
    return `${this.providerId()}.${this.pluginId()}`;
  }

  public static getPrefixedArtifactId(artifactId: string) {
    return `${this.id()}.${artifactId}`;
  }
}

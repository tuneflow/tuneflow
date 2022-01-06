import * as _ from 'underscore';
import type { ArtifactDescriptor, BasePlugin } from './base_plugin';
import type { Song } from './models/song';

export class Pipeline {
  private plugins: BasePlugin[] = [];

  /** Inserts a plugin at index. */
  addPluginAt(plugin: BasePlugin, index: number) {
    this.plugins.splice(index, 0, plugin);
  }

  /** Gets all plugins in execution order. */
  getPlugins(): BasePlugin[] {
    return this.plugins;
  }

  /**
   * Runs the pipeline and modifies the song.
   * @param song
   */
  async run(song: Song) {
    const artifactStore: { [key: string]: any } = {};

    for (const plugin of this.plugins) {
      const inputs = [];
      for (const input of plugin.inputs()) {
        const artifactId = this.getArtifactId(input);
        const artifact = artifactStore[artifactId];
        if (artifact === undefined) {
          throw new Error(`Missing required artifact ${artifactId}`);
        }
        inputs.push(artifact);
      }
      const outputArtifacts = await plugin.run(song, inputs);
      if (
        outputArtifacts !== undefined &&
        outputArtifacts !== null // This check is necessary as typeof null === 'object'
      ) {
        if (typeof outputArtifacts !== 'object') {
          throw new Error(
            `Output artifacts by plugin ${(
              plugin.constructor as typeof BasePlugin
            ).id()} is not a key-value map.`,
          );
        }
        for (const key of _.keys(outputArtifacts)) {
          artifactStore[(plugin.constructor as any).getPrefixedArtifactId(key)] =
            outputArtifacts[key];
        }
      }
    }
  }

  private getArtifactId(descriptor: ArtifactDescriptor) {
    return `${descriptor.plugin.id()}.${descriptor.artifactId}`;
  }
}

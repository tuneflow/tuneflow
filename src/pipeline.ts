import * as _ from 'underscore';
import type { ArtifactDescriptor, TuneflowPlugin } from './base_plugin';
import type { Song } from './models/song';

export class TuneflowPipeline {
  private plugins: TuneflowPlugin[] = [];

  /** Inserts a plugin to the end. */
  addPlugin(plugin: TuneflowPlugin) {
    this.plugins.push(plugin);
  }

  /** Inserts a plugin at index. */
  addPluginAt(plugin: TuneflowPlugin, index: number) {
    this.plugins.splice(index, 0, plugin);
  }

  /** Removes a plugin from the plugin list. */
  removePlugin(plugin: TuneflowPlugin) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
  }

  /** Gets all plugins in execution order. */
  getPlugins(): TuneflowPlugin[] {
    return this.plugins;
  }

  /**
   * Runs the pipeline and modifies the song.
   * @param song
   * @returns Whether the flow has been successfully completed.
   */
  async run(song: Song): Promise<boolean> {
    const artifactStore: { [key: string]: any } = {};

    for (const plugin of this.plugins) {
      // @ts-ignore
      song.setPluginContextInternal(plugin);
      if (!plugin.enabledInternal) {
        continue;
      }
      const inputs: { [inputName: string]: any } = {};
      for (const inputName of _.keys(plugin.inputs())) {
        const input = plugin.inputs()[inputName];
        const artifactId = this.getArtifactId(input);
        const artifact = artifactStore[artifactId];
        if (artifact === undefined) {
          console.error(`Missing required artifact ${artifactId}`);
          return false;
        }
        inputs[inputName] = artifact;
      }
      if (!plugin.hasAllParamsSet()) {
        return true;
      }
      let outputArtifacts;
      try {
        outputArtifacts = await plugin.run(song, inputs, plugin.getParamsInternal());
      } catch (e: any) {
        console.error(e);
        return false;
      }

      // TODO: Check the modifications made to the song against the plugin's access.
      // Prevent the song from being modified by this plugin if access verification failed.
      if (
        outputArtifacts !== undefined &&
        outputArtifacts !== null // This check is necessary as typeof null === 'object'
      ) {
        if (typeof outputArtifacts !== 'object') {
          throw new Error(
            `Output artifacts by plugin ${(
              plugin.constructor as typeof TuneflowPlugin
            ).id()} is not a key-value map.`,
          );
        }
        for (const key of _.keys(outputArtifacts)) {
          artifactStore[(plugin.constructor as any).getPrefixedArtifactId(key)] =
            outputArtifacts[key];
        }
      }
    }
    return true;
  }

  reset() {
    for (const plugin of this.plugins) {
      plugin.resetInternal();
    }
  }

  private getArtifactId(descriptor: ArtifactDescriptor) {
    return `${descriptor.plugin.id()}.${descriptor.artifactId}`;
  }
}

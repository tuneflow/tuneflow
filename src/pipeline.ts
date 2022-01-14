import cloneDeep from 'lodash.clonedeep';
import * as _ from 'underscore';
import type { ArtifactDescriptor, TuneflowPlugin } from './base_plugin';
import type { Song } from './models/song';

export class TuneflowPipeline {
  private plugins: TuneflowPlugin[] = [];
  /** Whether the last run encountered errors. */
  private threwErrorInLastRun = false;
  /** Cache for the Song instances that was successfully produced in the last run. */
  private songCache: { [pluginId: string]: Song } = {};

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

  resetCache() {
    this.songCache = {};
  }

  /**
   * Runs the pipeline and modifies the song.
   *
   * TODO: Check all the cloneDeep usages and remove unecessary ones if possible.
   *
   * @param song
   * @param dirtyIndex The index of the first dirty plugin.
   * @returns Whether the flow completed with no errors.
   */
  async run(song: Song, dirtyIndex = 0): Promise<boolean> {
    console.log(`dirty from: ${dirtyIndex}`);
    dirtyIndex = Math.max(0, dirtyIndex);
    this.threwErrorInLastRun = false;
    const artifactStore: { [key: string]: any } = {};

    // Jump to the latest cached song before dirtyIndex if available.
    const cachedInputSong = cloneDeep(song);
    const cachedPluginIndex = this.getIndexOfLatestPluginWithCacheBeforeIndex(dirtyIndex);
    if (cachedPluginIndex >= 0) {
      _.assign(song, cloneDeep(this.songCache[this.plugins[cachedPluginIndex].instanceId]));
    }

    // Clear plugin cache from dirtyIndex since we will recompute.
    for (let i = dirtyIndex; i < this.plugins.length; i += 1) {
      delete this.songCache[this.plugins[i].instanceId];
    }

    // Run dirty plugins.
    let numFinishedPlugins = 0;
    for (let i = dirtyIndex; i < this.plugins.length; i += 1) {
      const plugin = this.plugins[i];
      // @ts-ignore
      if (!plugin.enabledInternal) {
        continue;
      }
      // @ts-ignore
      song.setPluginContextInternal(plugin);
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
        this.threwErrorInLastRun = true;
        // Rollback song to the last successful plugin cache.
        const pluginIndex = this.getIndexOfLatestPluginWithCacheBeforeIndex(i);
        if (pluginIndex >= 0) {
          _.assign(song, cloneDeep(this.songCache[this.plugins[pluginIndex].instanceId]));
        } else {
          _.assign(song, cachedInputSong);
        }
        return false;
      }

      this.songCache[plugin.instanceId] = cloneDeep(song);

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
      numFinishedPlugins += 1;
    }
    console.log(`Number of successfully finished plugins: ${numFinishedPlugins}`);
    return true;
  }

  reset() {
    for (const plugin of this.plugins) {
      plugin.resetInternal();
    }
  }

  isPluginFunctioning(plugin: TuneflowPlugin) {
    return !!this.songCache[plugin.instanceId];
  }

  getPluginIndexByPluginInstanceId(instanceId: string) {
    return _.findIndex(this.plugins, plugin => plugin.instanceId === instanceId);
  }

  getThrewErrorInLastRun() {
    return this.threwErrorInLastRun;
  }

  private getArtifactId(descriptor: ArtifactDescriptor) {
    return `${descriptor.plugin.id()}.${descriptor.artifactId}`;
  }

  /**
   * Searches from index - 1 to 0 and return the index of the first plugin found with cache.
   * @param index
   * @returns
   */
  private getIndexOfLatestPluginWithCacheBeforeIndex(index: number) {
    for (let lastIndexWithCache = index - 1; lastIndexWithCache >= 0; lastIndexWithCache -= 1) {
      if (this.songCache[this.plugins[lastIndexWithCache].instanceId]) {
        return lastIndexWithCache;
      }
    }
    return -1;
  }
}

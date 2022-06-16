import * as _ from 'underscore';
import type { TuneflowPlugin } from './base_plugin';
import type { Song } from './models/song';

export class TuneflowPipeline {
  private plugins: TuneflowPlugin[] = [];
  /** Whether the last run encountered errors. */
  private threwErrorInLastRun = false;
  private maxNumPluginsToKeep = 50;
  private originalSong?: Song;
  // @ts-ignore
  private cloneSongFnInternal: Function;

  /** Inserts a plugin to the end. */
  addPlugin(plugin: TuneflowPlugin) {
    this.plugins.push(plugin);
    this.maintainPluginListSize();
  }

  /** Inserts a plugin at index. */
  addPluginAt(plugin: TuneflowPlugin, index: number) {
    this.plugins.splice(index, 0, plugin);
    this.maintainPluginListSize();
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
    for (const plugin of this.plugins) {
      // @ts-ignore
      delete plugin.songCacheInternal;
    }
  }

  setOriginalSong(originalSong: Song) {
    this.originalSong = originalSong;
  }

  hasOriginalSong() {
    return !!this.originalSong;
  }

  /**
   * Runs the pipeline and modifies the song.
   *
   * TODO: Add timeout.
   *
   * @param dirtyIndex The index of the first dirty plugin.
   * @returns If successful, returns the updated song instance. Otherwise return null.
   */
  async run(dirtyIndex = 0): Promise<Song | null> {
    console.log(`dirty from: ${dirtyIndex}`);

    if (!this.originalSong) {
      this.threwErrorInLastRun = true;
      return null;
    }

    dirtyIndex = Math.max(0, dirtyIndex);
    this.threwErrorInLastRun = false;

    // Jump to the latest cached song before dirtyIndex if available.
    let inputSong: Song;
    const cachedPluginIndex = this.getIndexOfLatestPluginWithCacheBeforeIndex(dirtyIndex);
    if (cachedPluginIndex >= 0) {
      // @ts-ignore
      inputSong = await this.cloneSong(this.plugins[cachedPluginIndex].songCacheInternal as Song);
    } else {
      inputSong = await this.cloneSong(this.originalSong);
    }

    // Clear plugin cache from dirtyIndex since we will recompute.
    for (let i = dirtyIndex; i < this.plugins.length; i += 1) {
      // @ts-ignore
      delete this.plugins[i].songCacheInternal;
    }

    for (let i = 0; i <= cachedPluginIndex; i += 1) {
      const plugin = this.plugins[i];
      // @ts-ignore
      plugin.isRollbackable = true;
    }

    // Run dirty plugins.
    let numFinishedPlugins = 0;
    for (
      let i = cachedPluginIndex >= 0 ? cachedPluginIndex + 1 : 0;
      i < this.plugins.length;
      i += 1
    ) {
      const plugin = this.plugins[i];
      // TODO: Revisit here to see if we need to set isRollbackable to false.
      // @ts-ignore
      if (!plugin.enabledInternal) {
        return inputSong;
      }
      if (!plugin.hasAllParamsSet()) {
        return inputSong;
      }

      // @ts-ignore
      inputSong.setPluginContextInternal(plugin);
      try {
        await plugin.run(inputSong, plugin.getParamsInternal());
        // @ts-ignore
        inputSong.clearPluginContextInternal();
      } catch (e: any) {
        console.error(e);
        this.threwErrorInLastRun = true;
        // @ts-ignore
        inputSong.clearPluginContextInternal();
        // Rollback song to the last successful plugin cache.
        const pluginIndex = this.getIndexOfLatestPluginWithCacheBeforeIndex(i);
        if (pluginIndex >= 0) {
          // @ts-ignore
          return await this.cloneSong(this.plugins[pluginIndex].songCacheInternal);
        } else {
          return await this.cloneSong(this.originalSong);
        }
      }

      // @ts-ignore
      plugin.songCacheInternal = await this.cloneSong(inputSong);
      // @ts-ignore
      plugin.isRollbackable = true;

      numFinishedPlugins += 1;
    }
    console.log(`Number of successfully finished plugins: ${numFinishedPlugins}`);
    return inputSong;
  }

  /**
   * Returns an exactly same song with the same ids for everything.
   *
   * @param song
   * @returns
   */
  async cloneSong(song: Song): Promise<Song> {
    if (!this.cloneSongFnInternal) {
      throw new Error('Pipeline is not provided with a clone song function.');
    }
    return this.cloneSongFnInternal(song);
  }

  /**
   * Reset all plugins in the pipeline.
   */
  reset() {
    for (const plugin of this.plugins) {
      plugin.resetInternal();
    }
  }

  /**
   * Remove all plugins from the pipeline.
   */
  clear() {
    this.plugins.splice(0, this.plugins.length);
    this.originalSong = undefined;
  }

  movePluginUp(plugin: TuneflowPlugin) {
    const pluginIndex = this.getPluginIndexByPluginInstanceId(plugin.instanceId);
    if (pluginIndex <= 0) {
      return;
    }
    this.plugins.splice(pluginIndex - 1, 0, this.plugins.splice(pluginIndex, 1)[0]);
  }

  movePluginDown(plugin: TuneflowPlugin) {
    const pluginIndex = this.getPluginIndexByPluginInstanceId(plugin.instanceId);
    if (pluginIndex < 0 || pluginIndex >= this.plugins.length - 1) {
      return;
    }
    this.plugins.splice(pluginIndex, 0, this.plugins.splice(pluginIndex + 1, 1)[0]);
  }

  isPluginFunctioning(plugin: TuneflowPlugin) {
    // @ts-ignore
    return !!plugin.songCacheInternal;
  }

  getPluginIndexByPluginInstanceId(instanceId: string) {
    return _.findIndex(this.plugins, plugin => plugin.instanceId === instanceId);
  }

  getThrewErrorInLastRun() {
    return this.threwErrorInLastRun;
  }

  getLastFunctioningPlugin() {
    for (let i = this.plugins.length - 1; i >= 0; i -= 1) {
      if (this.isPluginFunctioning(this.plugins[i])) {
        return this.plugins[i];
      }
    }
    return null;
  }

  getPluginCache(plugin: TuneflowPlugin) {
    // @ts-ignore
    return plugin.songCacheInternal;
  }

  /**
   * Sets the maximum number of plugins to keep in the pipeline.
   *
   * The oldest plugins will be removed to keep the plugins within limit.
   *
   * @param maxNumPluginsToKeep
   */
  setMaxNumPluginsToKeep(maxNumPluginsToKeep: number) {
    this.maxNumPluginsToKeep = maxNumPluginsToKeep;
    this.maintainPluginListSize();
  }

  /**
   * Searches from index - 1 to 0 and return the index of the first plugin found with cache.
   * @param index
   * @returns
   */
  private getIndexOfLatestPluginWithCacheBeforeIndex(index: number) {
    for (let lastIndexWithCache = index - 1; lastIndexWithCache >= 0; lastIndexWithCache -= 1) {
      if (!!this.getPluginCache(this.plugins[lastIndexWithCache])) {
        return lastIndexWithCache;
      }
    }
    return -1;
  }

  private maintainPluginListSize() {
    while (this.plugins.length > this.maxNumPluginsToKeep && this.plugins.length > 0) {
      this.plugins.shift();
    }
  }
}

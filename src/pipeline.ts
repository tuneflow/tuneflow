import * as _ from 'underscore';
import type { ReadAPIs, TuneflowPlugin } from './base_plugin';
import type { Song } from './models/song';

export class TuneflowPipeline {
  private plugins: TuneflowPlugin[] = [];
  /** Whether the last run encountered errors. */
  private threwErrorInLastRun = false;
  private maxNumPluginsToKeep = 50;
  private originalSong?: Song;
  private activePluginIndex = -1;

  // @ts-ignore
  private static cloneSongFnInternal: (song: Song) => Promise<Song>;
  // @ts-ignore
  private static materializeSongFnInternal: (song: Song, songId: string) => Promise<void>;
  /** Provide additional APIs for plugins to read required data, e.g. read audio file content. */
  // @ts-ignore
  private static readApisInternal: ReadAPIs;

  /**
   * Adds a plugin as the active plugin.
   *
   * * If the active plugin is rollbackable, adds the plugin after it.
   * * If the active plugin is not rollbackable, removes the unrollbackable plugin and add the new
   *   plugin at its position.
   *
   * Removes all the plugins after the insert position.
   * @return The insert position of the plugin.
   */
  addAsOrReplaceActivePlugin(plugin: TuneflowPlugin) {
    let insertIndex: number;
    if (this.activePluginIndex <= -1) {
      insertIndex = 0;
    } else {
      // @ts-ignore
      if (this.plugins[this.activePluginIndex].isRollbackable) {
        // The active plugin is rollbackable, insert the new plugin after it.
        insertIndex = this.activePluginIndex + 1;
      } else {
        // The active plugin is not rollbackable, replace it with the new plugin.
        insertIndex = this.activePluginIndex;
      }
    }
    // Remove all plugins starting from the insert index.
    if (this.plugins.length > 0) {
      this.plugins.splice(insertIndex, this.plugins.length - insertIndex);
    }
    // Add the new plugin at insert index.
    this.addPluginAt(plugin, insertIndex);
    // Find the insert position as the plugin list might have changed due to length maintainence.
    return this.getPluginIndexByPluginInstanceId(plugin.instanceId);
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
   * Non-cancellable part of the pipeline run, which can modify the pipeline.
   *
   * @param dirtyIndex
   * @returns
   */
  async prepareRun(dirtyIndex = 0) {
    console.log(`dirty from: ${dirtyIndex}`);

    if (!this.originalSong) {
      this.threwErrorInLastRun = true;
      return null;
    }

    dirtyIndex = Math.max(0, dirtyIndex);
    this.setActivePluginIndex(dirtyIndex);
    this.threwErrorInLastRun = false;

    // Jump to the latest cached song before dirtyIndex if available.
    const cachedPluginIndex = this.getIndexOfLatestPluginWithCacheBeforeIndex(dirtyIndex);
    const inputSong = await this.cloneCachedSongAtPluginIndex(cachedPluginIndex);

    // Clear plugin cache from dirtyIndex since we will recompute.
    for (let i = dirtyIndex; i < this.plugins.length; i += 1) {
      // @ts-ignore
      delete this.plugins[i].songCacheInternal;
    }

    for (let i = 0; i < this.plugins.length; i += 1) {
      // Mark all plugins to be rerun as unrollbackable.
      // @ts-ignore
      this.plugins[i].isRollbackable = i <= cachedPluginIndex;
    }

    return {
      inputSong,
      plugins: this.plugins.slice(cachedPluginIndex >= 0 ? cachedPluginIndex + 1 : 0),
    };
  }

  /**
   * Runs a plugin.
   *
   * This is supposed to NOT make any pipeline change and should
   * ONLY modify plugins and the input song, as the latter will all be discarded
   * if this run is cancelled.
   *
   * TODO: Add timeout.
   *
   * @returns If successful, returns the updated song instance. Otherwise return null.
   */
  static async run(inputSong: Song, plugins: TuneflowPlugin[], songId: string) {
    // Run dirty plugins.
    let numFinishedPlugins = 0;
    for (const plugin of plugins) {
      // TODO: Revisit here to see if we need to set isRollbackable to false.
      // @ts-ignore
      if (!TuneflowPipeline.isPluginRunnable(plugin)) {
        return inputSong;
      }

      // @ts-ignore
      inputSong.setPluginContextInternal(plugin);
      try {
        // @ts-ignore
        plugin.isExecuting = true;
        plugin.setProgress(null);
        await plugin.run(inputSong, plugin.getParamsInternal(), TuneflowPipeline.readApisInternal);
        // @ts-ignore
        inputSong.clearPluginContextInternal();
        // Write temporary buffers to local files.
        await TuneflowPipeline.materializeSongFnInternal(inputSong, songId);
        // @ts-ignore
        plugin.isExecuting = false;
      } catch (e: any) {
        // @ts-ignore
        inputSong.clearPluginContextInternal();
        // @ts-ignore
        plugin.isExecuting = false;
        throw e;
      }

      // @ts-ignore
      plugin.songCacheInternal = await TuneflowPipeline.cloneSongFnInternal(inputSong);
      // @ts-ignore
      plugin.isRollbackable = true;

      numFinishedPlugins += 1;
    }
    console.log(`Number of successfully finished plugins: ${numFinishedPlugins}`);
    return inputSong;
  }

  /**
   * Activate an already executed plugin.
   *
   * This will not affect plugins later than this plugin
   * since we should be able to rollforward.
   */
  restoreCachedPlugin(index: number) {
    this.setActivePluginIndex(index);
    return this.cloneCachedSongAtPluginIndex(index);
  }

  getActivePluginIndex() {
    return this.activePluginIndex;
  }

  private setActivePluginIndex(index: number) {
    console.log('current active plugin index', index);
    this.activePluginIndex = index;
  }

  private async cloneCachedSongAtPluginIndex(index: number) {
    if (index >= 0) {
      // @ts-ignore
      return await TuneflowPipeline.cloneSongFnInternal(
        // @ts-ignore
        this.plugins[index].songCacheInternal as Song,
      );
    } else {
      if (!this.originalSong) {
        throw new Error('Original song is not avaiable to clone.');
      }
      return await TuneflowPipeline.cloneSongFnInternal(this.originalSong);
    }
  }

  /**
   * Resets the pipeline.
   */
  reset() {
    this.plugins.splice(0, this.plugins.length);
    this.originalSong = undefined;
    this.activePluginIndex = -1;
    this.threwErrorInLastRun = false;
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
   * Searches from (index - 1) to 0 and return the index of the first plugin found with cache.
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

  private addPluginAt(plugin: TuneflowPlugin, index: number) {
    this.plugins.splice(index, 0, plugin);
    this.maintainPluginListSize();
  }

  static isPluginRunnable(plugin: TuneflowPlugin) {
    return plugin.enabledInternal && plugin.hasAllParamsSet();
  }
}

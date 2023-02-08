# TuneFlow Typescript SDK

[English](./README.md) | [中文](./README.zh.md)

![TuneFlow Screenshots](docs/images/tuneflow_wall_thin.jpg)

## What is `TuneFlow`?

[TuneFlow](https://www.tuneflow.com) is a next-gen DAW that aims to boost music making productivity through the power of AI. Unlike traditional DAWs, TuneFlow has a plugin system designed to facilitate music production in almost all areas, including but not limited to **song writing**, **arrangement**, **automation**, **mixing**, **transcription**...... You can easily write your own algorithms or integrate your AI models directly into the song-making process. `tuneflow` is the Typescript SDK of TuneFlow plugins.

## Installation

``` bash
npm install tuneflow
```

## Prefer another language?

Check out the SDKs in other languages:

* **Python**: https://www.github.com/tuneflow/tuneflow-py
* Other: Contributions welcome!

## Getting started

The core idea of TuneFlow's plugin system is that you only care about the data model, NOT the implementation. A plugin's only goal is to modify the song to its need, and the DAW will get the modified result and apply the changes automatically. Below is an illustration:

![Plugin Flow](docs/images/pipeline_flow_en.jpg)

A plugin bundle consists of 3 components: The bundle file, the plugin files, and the bundle export.



### Bundle file (`bundle.json`)

The bundle file, which we usually name it `bundle.json`, contains the information of the plugins in this bundle.  The information here will be shown to the users before they need to load the code of your plugin.

An example manifest file looks like this.

``` json
{
  "plugins": [
    ......,
    {
      "providerId": "my-provider-id",
      "providerDisplayName": "My Provider Name",
      "pluginId": "my-plugin-id",
      "pluginDisplayName": "My Plugin Name",
      "version": "1.0.0",
      "minRequiredDesktopVersion": "1.8.3",
      "options": {
        "allowReset": false
      }
    },
    ......
  ]
}
```

### Plugin code

This is will be your actual code file. A barebone plugin, for example `hello_world_plugin.ts`, may look like this:

``` typescript
// hello_world_plugin.ts

import type { LabelText, ParamDescriptor, SliderWidgetConfig, Song } from 'tuneflow';
import { TuneflowPlugin, WidgetType } from 'tuneflow';

export class HelloWorld extends TuneflowPlugin {
  static providerId(): string {
    return 'my-provider-id';
  }

  static pluginId(): string {
    return 'my-plugin-id';
  }

  params(): { [paramName: string]: ParamDescriptor } {
    return {
      ......
    };
  }

  async init(song: Song, readApis: ReadAPIs): Promise<void> {
    ......
  }

  async run(song: Song, params: { [paramName: string]: any }): Promise<void> {
    ......
  }
}

```

First you'll need to overwrite the `providerId()` and `pluginId()` methods to match what you specified in the manifest file. When loading the plugins, TuneFlow looks for the two ids to match the bundle file with each plugin source code.

### Bundle export

Finally, in order for TuneFlow to execute your code, you need to export it and use build tools to build a bundle. Here we need to create an index file to export all of your plugins in this bundle. Here for example, we can create an `index.ts` file which looks like this:

``` typescript
// index.ts

export { HelloWorld } from './hello_world_plugin';
export { SomeOtherPlugin } from './some_other_plugin';
......
```

## Writing a plugin

When writing a plugin, our main focus is in `params`, `init` and `run`.

### `params`

This is where you specify the input parameters you want from the user or from the DAW. It will be processed by the DAW and generate your plugin's UI widgets.

### `init`

Called by the DAW when the user loads the plugin but before actually running it. The DAW will provide the current song snapshot (`song: Song`) and some read-only APIs (`readApis: ReadAPIs`), and you will take these params to initialize your plugin.

For example, if you have a list of presets that applies to different time signatures, you can use `init` to read the current song's time signature and filter out those options that don't work for the song.

### `run`

Called by the DAW when the user actually runs the plugin by hitting the **Apply`** button.

Here is where you implement your main logic. The method takes in the current song snapshot (`song: Song`), the params that are actually provided by the user or the DAW (`params`), and the read-only APIs (`readApis: ReadAPIs`).

## Run your plugin

To run or debug your plugin, your can use `tuneflow-devkit`. For more information on plugin development, check out https://www.github.com/tuneflow/tuneflow-devkit

## Examples

For a comprehensive of basic plugins that are used in TuneFlow's editor, check out https://www.github.com/tuneflow/tuneflow-plugin-basic


## Resources

[TuneFlow Website](https://tuneflow.com)

[Python SDK](https://www.github.com/tuneflow/tuneflow-py)
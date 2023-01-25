# TuneFlow Typescript SDK

[English](./README.md) | [中文](./README.zh.md)


## What is `TuneFlow`?

[TuneFlow](https://www.tuneflow.com) is a next-gen DAW that aims to boost music making productivity through the power of AI. Unlike traditional DAWs, TuneFlow has a plugin system designed to facilitate music production in almost all areas, including but not limited to **song writing**, **arrangement**, **automation**, **mixing**, **transcription**...... You can easily write your own algorithms or integrate your AI models directly into the song-making process. `tuneflow` is the Typescript SDK of TuneFlow plugins.

## Installation

``` bash
npm install tuneflow
```

## Prefer Another Language?

Check out the SDKs in other languages:

* **Python**: https://www.github.com/tuneflow/tuneflow-py
* Other: Contributions welcome!

## Getting Started

The core idea of TuneFlow's plugin system is that you only care about the data model, NOT the implementation. A plugin's only goal is to modify the song to its need, and the DAW will get the modified result and apply the changes automatically. Below is an illustration:

![Plugin Flow](docs/images/pipeline_flow_en.jpg)

A barebone plugin may look like this:

``` typescript
import type { LabelText, ParamDescriptor, SliderWidgetConfig, Song } from 'tuneflow';
import { TuneflowPlugin, WidgetType } from 'tuneflow';

export class HelloWorld extends TuneflowPlugin {
  static providerId(): string {
    return 'andantei';
  }

  static pluginId(): string {
    return 'hello-world';
  }

  static providerDisplayName(): LabelText {
    return 'Andantei';
  }

  static pluginDisplayName(): LabelText {
    return 'Hello World';
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

When writing a plugin, our main focus is in`params`, `init` and `run`.

### `params`

This is where you specify the input parameters you want from the user or from the DAW. It will be processed by the DAW and generate your plugin's UI widgets.

### `init`

Called by the DAW when the user loads the plugin but before actually running it. The DAW will provide the current song snapshot (`song: Song`) and some read-only APIs (`readApis: ReadAPIs`), and you will take these params to initialize your plugin.

For example, if you have a list of presets that applies to different time signatures, you can use `init` to read the current song's time signature and filter out those options that don't work for the song.

### `run`

Called by the DAW when the user actually runs the plugin by hitting the **Apply`** button.

Here is where you implement your main logic. The method takes in the current song snapshot (`song: Song`), the params that are actually provided by the user or the DAW (`params`), and the read-only APIs (`readApis: ReadAPIs`).

## Examples

For a comprehensive of basic plugins that are used in TuneFlow's editor, check out https://www.github.com/tuneflow/tuneflow-plugin-basic


## Resources

[TuneFlow Website](https://tuneflow.com)

[Python SDK](https://www.github.com/tuneflow/tuneflow-py)
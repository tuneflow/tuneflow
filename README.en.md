# TuneFlow

[English](./README.en.md) | [中文](./README.md)

This is the plugin system of TuneFlow. It is in charge of running plugins and maintaining the states of a project. You can interpret it as the driving engine of TuneFlow's editor.


## What is TuneFlow?

[TuneFlow](https://www.tuneflow.com) is a next-gen, AI-driven, cross-platform DAW(Digital Audio Workstation)。To summarize TuneFlow's mission in one sentence: 
> Make music making accessible to everyone.`

TuneFlow consists of 3 parts：

- An AI-driven, cross-platform (Web, Win, macOS) DAW
- A powerful AI composition engine
- **An extensible and flexible plugin system (This repo)**


## Develop TuneFlow Plugins

TuneFlow provides the developers a powerful yet easy to implement plugin system. Unlike traditional VST or AU plugins that focus on single track processing, TuneFlow plugins can utilize the whole DAW's capabilities, empowering you to achieve unprecedent creativity.

# TuneFlow 插件系统

[English](./README.md) | [中文](./README.md)

这里是 TuneFlow 插件系统，负责运行插件和维护工程状态。你可以把它理解为 TuneFlow 编辑器的驱动引擎。

## 什么是 TuneFlow？

[TuneFlow](https://www.tuneflow.com) 是围绕 AI 能力打造的新一代，全功能，跨平台 DAW (数字音乐工作站)。一句话概括 TuneFlow 的核心目标：

> **用 AI 的力量帮助创作者更好更快地制作音乐**。

TuneFlow 的主体包括三个部分：

- 一个全平台互通 (网页，Windows，macOS) 的 DAW (数字音乐工作站)
- 一个强大的 AI 生成引擎
- **一个灵活可扩展的插件系统 （本仓库）**

## 开发 TuneFlow 插件

TuneFlow 为开发者提供了一个强大且易于实现的插件平台。不同于专注在单轨处理的传统 VST 和 AU 插件，TuneFlow 插件可以读取整个工程的数据，并调用整个 DAW 的底层能力。在这里，你可以从全局出发，开发更具系统性的插件，比如：

- 接入 AI 模型来为旋律续写或添加多轨道的和声；
- 生成贴合整首歌曲结构的鼓点；
- 你甚至可以操控每个轨道的 VST 并且用算法来生成每个参数的自动化。
- ......

访问[TuneFlow 开发者文档](https://help.tuneflow.com/zh/developer/)了解 TuneFlow 插件系统的运行原理，以及如何通过 TuneFlow DevKit 来快速将你的音乐构思变成可运行的 TuneFlow 插件。

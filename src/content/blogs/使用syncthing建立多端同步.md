---
title: 使用syncthing建立多端同步
date: 2026-07-26 10:00:00
tags:
 - Web
 - 多设备
categories:
 - 实用工具
---

## syncthing

syncthing是一个开源的多端文件同步工具，支持Windows、MacOS、Linux、Android等平台，基于局域网和syncthing的官方服务器实现连接，自己有公网服务器的话也可以自己建立服务器。据说和zerotier搭配使用有奇效。

syncthing本体主要用浏览器通过本地端口访问，但是也有很多项目为syncthing包装了前端界面，看个人喜好。

## 资源总览

本体：[syncthing/syncthing: Open Source Continuous File Synchronization](https://github.com/syncthing/syncthing)

官方macos客户端：[syncthing/syncthing-macos: Official frugal and native macOS Syncthing application bundle](https://github.com/syncthing/syncthing-macos)

第三方作者维护的Windows客户端：[GermanCoding/SyncTrayzor: Windows tray utility / launcher for Syncthing (v2 continued)](https://github.com/GermanCoding/SyncTrayzor)

第三方作者维护的安卓客户端：[researchxxl/syncthing-android: Syncthing-Fork - A Syncthing Wrapper for Android.](https://github.com/researchxxl/syncthing-android)

发现服务器（用于自己搭建发现服务）：[syncthing/discosrv: The Syncthing global discovery server](https://github.com/syncthing/discosrv)

中继服务器（用于自己搭建发现服务）：[syncthing/relaysrv: The Syncthing relay server](https://github.com/syncthing/relaysrv)


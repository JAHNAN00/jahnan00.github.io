---
title: Linux服务器性能排查入门
date: 2026/02/27
tags:
 - Linux
 - 性能优化
 - 排障
categories:
 - 知识笔记
---

当服务器出现“变慢、卡顿、响应超时”时，可按 CPU、内存、磁盘、网络四个维度逐步排查。

## 第一步：快速判断系统负载

```bash
uptime
top
```

重点看：

- `load average` 是否持续升高
- `CPU us/sy/wa` 是否异常（`wa` 高通常是磁盘 I/O 压力）

## 第二步：定位占用最高的进程

```bash
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head
```

如果是 Java、Node、Python 进程，再进入对应运行时继续分析（如 heap、线程数、GC）。

## 第三步：检查内存与 OOM

```bash
free -h
dmesg | grep -i oom | tail -n 20
```

如果有 OOM kill 记录，优先处理内存泄漏、缓存策略或容器限制配置。

## 第四步：检查磁盘 I/O

```bash
iostat -xz 1 3
df -h
du -sh /var/log/* | sort -h | tail
```

关注：

- 磁盘使用率是否接近 100%
- 某块盘 `await` 是否异常高
- 日志文件是否异常膨胀

## 第五步：检查网络连接状态

```bash
ss -s
ss -antp | head -n 30
```

常见问题：

- 短连接暴增
- TIME_WAIT 过多
- 上游依赖超时导致连接堆积

## 建议的排查顺序

1. 先判断是否为系统级资源瓶颈  
2. 再定位具体进程  
3. 最后回到代码与架构层优化

## 总结

性能问题不可怕，关键是有固定排查路径。先收集指标，再判断瓶颈，再做针对性优化，避免“凭感觉调参”。

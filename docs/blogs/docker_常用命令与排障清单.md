---
title: Docker常用命令与排障清单
date: 2026/02/27
tags:
 - Docker
 - 运维
 - 容器
categories:
 - 实用工具
---

这篇用于整理 Docker 日常高频命令和常见排障步骤，方便遇到问题时快速定位。

## 常用命令速查

查看容器：

```bash
docker ps
docker ps -a
```

查看镜像：

```bash
docker images
```

查看日志：

```bash
docker logs -f <container_name>
```

进入容器：

```bash
docker exec -it <container_name> /bin/sh
```

停止与删除：

```bash
docker stop <container_name>
docker rm <container_name>
```

## 典型问题1：容器反复重启

先看状态和退出码：

```bash
docker ps -a
docker inspect <container_name> --format '{{.State.ExitCode}}'
```

再看日志：

```bash
docker logs --tail=200 <container_name>
```

常见原因：

- 启动命令写错
- 配置文件缺失
- 环境变量未传入
- 依赖服务未就绪

## 典型问题2：端口映射后无法访问

先确认容器端口是否监听：

```bash
docker exec -it <container_name> sh -c "netstat -tlnp || ss -tlnp"
```

再确认映射是否正确：

```bash
docker port <container_name>
```

检查宿主机防火墙和安全组后，再从外部访问。

## 典型问题3：磁盘被 Docker 吃满

查看占用：

```bash
docker system df
```

清理无用资源：

```bash
docker container prune
docker image prune
docker volume prune
docker system prune -a
```

注意：清理命令有删除风险，生产环境先确认再执行。

## 总结

排障建议遵循固定顺序：先看状态，再看日志，然后逐项验证网络、配置、依赖。流程稳定后，处理速度会明显提升。

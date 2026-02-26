---
title: Git多人协作常用流程
date: 2026/02/27
tags:
 - Git
 - 团队协作
 - 开发流程
categories:
 - 开发效率
---

这篇整理一套团队协作中常用的 Git 流程，目标是减少冲突、降低回滚成本，并保证提交历史清晰可追踪。

## 分支策略

- `main`：只放可发布版本
- `docs`：站点内容开发分支（当前博客使用）
- `feature/*`：功能开发分支
- `fix/*`：线上问题修复分支

核心原则：每个分支只做一件事，避免“顺手改一堆”。

## 日常开发流程

1. 从目标基线分支拉最新代码

```bash
git checkout docs
git pull origin docs
```

2. 新建功能分支

```bash
git checkout -b feature/update-blog-structure
```

3. 开发完成后检查变更

```bash
git status
git diff
```

4. 提交（建议一次提交一个逻辑点）

```bash
git add -A
git commit -m "refactor blog folder structure"
```

5. 推送并发起 PR

```bash
git push origin feature/update-blog-structure
```

## 冲突处理建议

优先使用 rebase 保持提交历史线性：

```bash
git fetch origin
git rebase origin/docs
```

冲突后：

```bash
git add <resolved-files>
git rebase --continue
```

如果发现方向错了，及时退出：

```bash
git rebase --abort
```

## 提交信息建议

推荐格式：

- `feat: ...` 新功能
- `fix: ...` 缺陷修复
- `docs: ...` 文档改动
- `refactor: ...` 重构

示例：

```text
docs: add docker troubleshooting guide
```

## 总结

一套稳定的 Git 流程不复杂，关键是长期一致地执行。分支清晰、提交颗粒度合适、冲突处理及时，后续维护会轻松很多。

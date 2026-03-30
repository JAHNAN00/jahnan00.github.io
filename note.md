# 仓库说明

## 长期协作约定

以下约定适用于我自己，以及后续协助本仓库的 agent / 大模型。每次开始修改前，优先遵守这里的规则。

### Git 相关

- Git commit message 一律使用中文。
- 在执行 push 之前，优先检查远程分支是否有新提交；如果远程已更新，先说明情况再决定如何处理。
- 非明确要求时，不要擅自改写历史，不要使用高风险的强制覆盖操作。
- 如果只是恢复某个文件，优先做成单独提交，方便后续追踪。

### 博客内容相关

- 博客文章默认放在 `docs/blogs/` 下。
- 新文章优先参考 `docs/blogs/template.md` 的格式。
- 文章 front matter 默认包含：`title`、`date`、`tags`、`categories`。
- 如无特殊说明，不要随意改动既有文章的 `categories` 体系。
- `tags` 保持精简，避免一个站点出现过多零散标签。
- 文件名避免使用特殊字符，尤其是 `+`，以免影响 VuePress 生成后的访问路径。

### 写作风格相关

- 优先保留作者原本的表达风格，不要为了“更像教程”而改得过于生硬或模板化。
- 对旧文章进行润色时，除非明确要求，否则不要大幅改写作者原有语气。
- 如果文章需要给后续模型留说明，优先使用 HTML 注释，保证网页渲染时不可见。

### 与 agent 协作的使用建议

- 如果是在新会话中协作，任务开始时可明确要求：“先阅读 `note.md` 和 `docs/blogs/template.md` 后再开始修改。”
- 如果需求涉及博客写作、文章新建、批量整理，默认同时参考本文件和 `docs/blogs/template.md`。

## 仓库概览

- 这是一个基于 VuePress 和 `vuepress-theme-reco` 的个人博客仓库。
- 主要内容位于 `docs/`，博客文章默认在 `docs/blogs/`。
- 站点配置主要在 `docs/.vuepress/`。
- 自动部署流程定义在 `.github/workflows/deploy-docs.yml`。

## 工作模式

- 日常开发分支是 `docs`。
- 内容推送到 `docs` 分支后，会触发 GitHub Actions 自动构建。
- 构建产物会发布到 `main` 分支，用于 GitHub Pages 部署。

## 本地开发

- 安装依赖：`pnpm install`
- 本地预览：`pnpm dev` 或 `pnpm start`
- 生产构建：`pnpm build`

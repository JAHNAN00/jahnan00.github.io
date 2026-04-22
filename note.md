# 仓库说明

## 长期协作约定

以下约定适用于我自己，以及后续协助本仓库的 agent / 大模型。每次开始修改前，优先遵守这里的规则。

### Git 相关

- Git commit message 一律使用中文。
- 在执行 push 之前，优先检查远程分支是否有新提交；如果远程已更新，先说明情况再决定如何处理。
- 非明确要求时，不要擅自改写历史，不要使用高风险的强制覆盖操作。
- 如果只是恢复某个文件，优先做成单独提交，方便后续追踪。

### 内容与资源约定

- 博客文章默认放在 `src/content/blogs/` 下。
- 博客相关静态资源放在 `src/content/blogs/asset/` 下。
- 作品列表元数据放在 `src/content/works/works.json`。
- 作品详情正文默认放在 `src/content/works/<slug>.md`。
- 作品相关静态资源放在 `src/content/works/asset/` 下。
- 新文章优先参考 `src/content/blogs/template.md` 的格式。
- 文章 front matter 默认包含：`title`、`date`、`tags`、`categories`。
- 如无特殊说明，不要随意改动既有文章的 `categories` 体系。
- `tags` 保持精简，避免一个站点出现过多零散标签。
- 文件名避免使用特殊字符，尤其是 `+`，以免影响路由地址、资源链接与后续维护稳定性。
- 博客 Markdown 中如需引用文章图片，继续沿用 `![说明](/文件名.png)` 的写法即可，构建时会从 `src/content/blogs/asset/` 自动解析。
- 作品数据中的封面等资源可继续写成 `"/文件名.svg"` 形式，代码会从 `src/content/works/asset/` 自动解析。
- 作品 Markdown 中如需引用图片，也继续沿用 `![说明](/文件名.png)` 的写法即可，构建时会从 `src/content/works/asset/` 自动解析。
- 如果某个作品需要特殊交互或单独布局，可在 `src/content/works/custom/` 下新增 Vue 组件，并在 `works.json` 中为该作品配置 `detailComponent`；未配置时默认渲染同 slug 的 Markdown 正文。
- 仓库内提供了一个最小示例：`src/content/works/custom/FeaturedWorkExample.vue`，需要时可直接复制或重命名后使用。

### 写作风格相关

- 优先保留作者原本的表达风格，不要为了“更像教程”而改得过于生硬或模板化。
- 对旧文章进行润色时，除非明确要求，否则不要大幅改写作者原有语气。
- 如果文章需要给后续模型留说明，优先使用 HTML 注释，保证网页渲染时不可见。

### 与 agent 协作的使用建议

- 如果是在新会话中协作，任务开始时可明确要求：“先阅读 `note.md` 和 `src/content/blogs/template.md` 后再开始修改。”
- 如果需求涉及博客写作、文章新建、批量整理，默认同时参考本文件和 `src/content/blogs/template.md`。

## 仓库概览

- 这是一个基于 Vue + Vite 的个人门户站点仓库。
- 页面源码位于 `src/`。
- 博客文章位于 `src/content/blogs/`，作品列表元数据位于 `src/content/works/works.json`，作品详情正文位于 `src/content/works/*.md`。
- 博客资源位于 `src/content/blogs/asset/`，作品资源位于 `src/content/works/asset/`。
- 全站公共静态资源位于根目录 `public/`，当前主要保留站点级资源，如头像与 favicon。
- 自动部署流程定义在 `.github/workflows/deploy-docs.yml`。

## 工作模式

- 日常开发分支是 `docs`。
- 内容推送到 `docs` 分支后，会触发 GitHub Actions 自动构建。
- 构建产物会发布到 `main` 分支，用于 GitHub Pages 部署。

## 本地开发

- 安装依赖：`pnpm install`
- 本地预览：`pnpm dev` 或 `pnpm start`
- 生产构建：`pnpm build`

## 重构背景

### 目标

将原博客站重构为综合个人门户站，包含：

1. 首页（个人介绍）
2. 作品（卡片流 + 详情页）
3. 博客（列表 + 标签/分类筛选 + 详情页）

并保持现有 GitHub Actions 工作流不变（push `docs` 分支后构建并发布到 `main` 分支）。

### 约束

- 技术栈：Vue + Vite。
- 不兼容旧链接（`/blogs/*`、`/posts`、`/tags/*` 不做重定向）。
- 作品数据先采用 JSON。
- 博客内容迁移到 `src/content/blogs`。
- 保留深浅色切换，整体风格简约。

### 执行摘要

1. 建立 Vite 工程入口与基础脚本。
2. 先兼容旧 CI，再迁回 Vite 标准 `dist/` 输出目录。
3. 建立路由与三大页面骨架：首页、作品、博客。
4. 迁移博客 Markdown 到 `src/content/blogs`，实现 front matter 解析、列表、筛选、详情渲染。
5. 建立作品 JSON 数据与卡片、详情页展示。
6. 建立全局主题变量与深浅色切换。
7. 清理旧目录依赖并统一资源管理方式。

## 变更记录

### 2026-04-19

- 初始化记录文件并开始重构。
- 完成：将工程迁移为 Vue + Vite，新增 `index.html`、`vite.config.js`、`src/*` 应用结构。
- 完成：将构建输出目录固定为 `docs/.vuepress/dist`，以兼容当时的 GitHub Actions 发布链路。
- 完成：实现三栏站点结构（首页 / 作品 / 博客）及详情页路由。
- 完成：博客 Markdown 迁移至 `src/content/blogs/*.md`，并实现 front matter 解析、标签/分类筛选和详情渲染。
- 完成：作品数据改为 `src/content/works/works.json`，实现卡片流与详情页。
- 完成：实现全局深浅色主题切换（系统默认 + 手动切换持久化）。
- 完成：清理旧 VuePress 配置入口文件，避免运行链路混淆。
- 命令记录：
  - `pnpm install`：成功，锁文件已更新。
  - `pnpm build`：成功，输出目录为 `docs/.vuepress/dist`。
- 备注：构建期间出现 `gray-matter` 的 `eval` 警告，不影响当前构建结果。

### 2026-04-20

- 复查 `pnpm dev` 运行状态。
- 结论：开发服务器可正常启动，之前的“失败”是因为工具调用超时后强制终止了前台长期运行进程，不是项目启动报错。
- 已验证：
  - `pnpm dev --host 127.0.0.1` 可启动成功。
  - 本地地址 `http://127.0.0.1:5173` 返回 `200 OK`。
  - 入口模块 `/src/main.js` 返回 `200 OK`。
- 新增排查：页面白屏是因为客户端直接执行了 `gray-matter`，导致博客数据模块在浏览器端初始化时出错。
- 修复：将 `src/lib/blog.js` 改为仓库内的轻量 front matter 解析实现，不再依赖 `gray-matter` 在浏览器运行。
- 修复后验证：`pnpm build` 再次成功，dev server 已重启。
- UI 微调：
  - 右上角主题按钮改为 iOS 风格滑动开关。
  - 首页从纯堆叠方块改为主视觉 + 侧信息卡 + 下方多区块混排结构。
  - 作品卡片的“查看详情”改为独立按钮，拉开与正文的间距。
  - 博客页改为大搜索区 + 弱化标签/分类筛选，并为 `sticky` 文章增加带图标的“置顶”标识。
- 验证：UI 改动后再次执行 `pnpm build`，成功。
- 继续微调：
  - 主题切换开关左侧新增“主题”文字，降低理解成本。
  - 作品集封面从外链图片改为本地 SVG 资源，修复封面加载不稳定问题。
  - 博客搜索改为输入即实时筛选，移除单独搜索按钮。
  - 压缩博客页头纵向高度，并将标题与说明改为横向排列。
- 验证：本轮调整后再次执行 `pnpm build`，成功。
- 新一轮细化：
  - 主题切换文字改为显示当前模式：深色 / 浅色。
  - 作品卡片“查看详情”按钮改为右下角对齐。
  - 作品详情页与博客详情页新增右下角固定返回按钮。
- 验证：本轮调整后再次执行 `pnpm build`，成功。
- 按钮样式继续统一：
  - 作品卡片“查看详情”改为居中布局。
  - 作品详情、博客详情的固定返回按钮改为复用卡片按钮风格。
  - 首页“查看作品”改为与“查看详情”一致的按钮风格。
  - 作品页标题说明改为与博客页相同的横向排列方式。
- 验证：本轮调整后再次执行 `pnpm build`，成功。
- 返回按钮继续调整：
  - 作品详情页与博客详情页的固定返回按钮改为纯图标形式。
  - 增加页面底部安全留白，避免固定按钮在滚动到底部时遮挡页脚内容。
- 验证：本轮调整后再次执行 `pnpm build`，成功。
- 返回按钮重做：
  - 去掉全局底部安全留白，避免页面底部空白过大。
  - 新增 `FloatingBackButton.vue`，根据页脚进入视口的高度动态抬升返回按钮，避免遮挡页脚。
  - 图标改为更接近安卓返回风格的箭头。
- 验证：本轮调整后再次执行 `pnpm build`，成功。
- 按钮交互增强：
  - 首页“查看作品 / 阅读博客”统一为同一套按钮体系。
  - 为“查看作品 / 阅读博客 / 查看详情”等按钮增加悬停高亮、轻微上浮和放大反馈。
- 验证：本轮调整后再次执行 `pnpm build`，成功。

### 2026-04-23

- 完成：删除旧 `docs/` 目录，项目不再依赖 VuePress 目录结构。
- 完成：构建输出目录迁回标准 `dist/`，并同步更新 `.gitignore` 与 GitHub Actions 发布路径。
- 完成：将博客资源迁移到 `src/content/blogs/asset/`，保留 Markdown 中 `"/文件名"` 的旧写法习惯。
- 完成：将作品资源迁移到 `src/content/works/asset/`，保留 JSON 中 `"/文件名"` 的写法习惯。
- 完成：将 `plan.md`、`log.md` 的有效内容合并进本文件，减少仓库根目录 Markdown 文件数量。
- 完成：将作品详情默认切换为 `src/content/works/<slug>.md`，同时为少量重点作品预留 `detailComponent` 自定义组件扩展点。

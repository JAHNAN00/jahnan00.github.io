# AGENTS.md

## 回答语言
- 默认始终使用中文回复用户；只有当用户明确使用英语提问时，才改用英语回答。

## 仓库结构
- 这是一个单仓库下的单个 Vue + Vite 站点，不是 monorepo。
- 关键入口：
  - `index.html`：Vite 挂载入口。
  - `vite.config.js`：Vite 构建配置，使用标准 `public/` 静态资源目录与 `dist/` 输出目录。
  - `src/main.js`、`src/App.vue`、`src/router/index.js`：应用入口、布局、路由。
  - `src/pages/*`：首页、作品、博客与详情页。
  - `src/content/blogs/*.md`：博客正文源。
  - `src/content/blogs/asset/*`：博客文章图片等静态资源，Markdown 中继续使用 `"/文件名"` 引用。
  - `src/content/works/works.json`：作品列表卡片与基础元数据。
  - `src/content/works/*.md`：作品详情正文源，默认按与 `slug` 同名文件解析。
  - `src/content/works/asset/*`：作品封面与正文图片等静态资源，JSON/Markdown 中继续使用 `"/文件名"` 引用。
  - `src/content/works/custom/*.vue`：少量需要单独交互或特殊展示的作品详情组件，可通过 `detailComponent` 显式启用。
  - `src/content/profile.json`：首页个人信息。
  - `public/*`：站点级静态资源，如头像、favicon。
- `note.md` 是仓库约定、重构背景与变更记录的统一入口。

## 常用命令
- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`（与 `pnpm start` 等价）
- 生产构建：`pnpm build`
- 本地预览构建产物：`pnpm preview`
- `package.json` 中没有仓库级的 `test`、`lint`、`typecheck` 脚本，不要臆测存在这些命令。

## 内容约定
- 新博客文章放在 `src/content/blogs/`。
- front matter 使用：`title`、`date`、`tags`、`categories`（可选 `sticky`、`series`）。
- 作品列表元数据放在 `src/content/works/works.json`，详情正文默认写在 `src/content/works/<slug>.md`。
- 博客文章资源放在 `src/content/blogs/asset/`，作品资源放在 `src/content/works/asset/`。
- 如果某个作品需要单独逻辑，可在 `src/content/works/custom/` 下新增 Vue 组件，并在 `works.json` 里为该项配置 `detailComponent`。
- 写作模板参考 `src/content/blogs/template.md`，补充约定参考 `note.md`。

## 生成产物
- 不要手动编辑 `dist/`（构建输出目录），除非用户明确要求修改生成结果。

## Git 与部署
- 日常开发分支是 `docs`。
- `.github/workflows/deploy-docs.yml` 会在 push 到 `docs` 分支时触发，使用 Node 20 执行 `pnpm run build`，写入 `dist/.nojekyll`，再把 `dist` 发布到 `main` 分支。
- commit message 使用中文；这是 `note.md` 中明确写出的长期约定。

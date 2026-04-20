# AGENTS.md

## 回答语言
- 默认始终使用中文回复用户；只有当用户明确使用英语提问时，才改用英语回答。

## 仓库结构
- 这是一个单仓库下的单个 Vue + Vite 站点，不是 monorepo。
- 关键入口：
  - `index.html`：Vite 挂载入口。
  - `vite.config.js`：构建配置，输出目录固定为 `docs/.vuepress/dist`（用于兼容现有 CI 发布流程）。
  - `src/main.js`、`src/App.vue`、`src/router/index.js`：应用入口、布局、路由。
  - `src/pages/*`：首页、作品、博客与详情页。
  - `src/content/blog/*.md`：博客正文源。
  - `src/content/works/works.json`：作品卡片与详情数据源。
  - `src/content/profile.json`：首页个人信息。
- `plan.md` 是执行计划，`log.md` 是实验记录；二者位于仓库根目录，不属于网站页面。

## 常用命令
- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`（与 `pnpm start` 等价）
- 生产构建：`pnpm build`
- 本地预览构建产物：`pnpm preview`
- `package.json` 中没有仓库级的 `test`、`lint`、`typecheck` 脚本，不要臆测存在这些命令。

## 内容约定
- 新博客文章放在 `src/content/blog/`。
- front matter 使用：`title`、`date`、`tags`、`categories`（可选 `sticky`、`series`）。
- 作品数据放在 `src/content/works/works.json`，详情页内容通过 JSON 字段维护。
- 若继续沿用旧写作规范，可参考 `docs/blogs/template.md` 和 `note.md`。

## 生成产物
- 不要手动编辑 `docs/.vuepress/dist/`（构建输出目录），除非用户明确要求修改生成结果。

## Git 与部署
- 日常开发分支是 `docs`。
- `.github/workflows/deploy-docs.yml` 会在 push 到 `docs` 分支时触发，使用 Node 20 执行 `pnpm run build`，写入 `docs/.vuepress/dist/.nojekyll`，再把 `docs/.vuepress/dist` 发布到 `main` 分支。
- commit message 使用中文；这是 `note.md` 中明确写出的长期约定。

# 仓库说明

这是一个基于 [VuePress](https://vuepress.vuejs.org/zh/) 和 [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/zh/) 主题搭建的个人博客网站。

## 基本组件

- **`package.json`**: 定义了项目的依赖项（如 VuePress, vuepress-theme-reco）和脚本命令。
- **`docs` 目录**: 存放所有源文件的地方。
    - **Markdown 文件**: 博客文章和页面的主要内容，例如 `docs/blogs/` 目录下的文件。
    - **`.vuepress` 目录**: 存放 VuePress 的配置、组件、样式和公共文件。
        - **`config.ts`**: VuePress 的主要配置文件，定义了语言、标题、主题等。
        - **`config/index.ts`**: `vuepress-theme-reco` 主题的详细配置文件，包括导航栏、作者信息等。
        - **`public`**: 存放网站的静态资源，如图片（logo, head.png）。
- **`.github/workflows/deploy-docs.yml`**: 定义了 GitHub Actions 的自动化工作流程。

## 工作模式

该仓库采用了一种常见的 GitOps 工作流程，通过持续集成/持续部署 (CI/CD) 来实现自动化发布。

1.  **源码分支 (`docs`)**:
    - 这是仓库的主要开发分支。
    - 所有的 Markdown 文章、VuePress 配置修改等都在这个分支上进行。

2.  **自动化构建与部署**:
    - 当有新的提交被推送到 `docs` 分支时，会触发 `.github/workflows/deploy-docs.yml` 中定义的 GitHub Actions 工作流程。
    - 该工作流会自动执行以下操作：
        a. 拉取最新的 `docs` 分支代码。
        b. 安装 `pnpm` 依赖。
        c. 运行 `pnpm build` 命令，将 `docs` 目录下的 Markdown 和配置源文件构建成静态的 HTML, CSS, 和 JavaScript 文件。构建产物会输出到 `docs/.vuepress/dist` 目录。
        d. 将 `docs/.vuepress/dist` 目录下的所有静态文件强制推送到 `main` 分支。

3.  **发布分支 (`main`)**:
    - 这个分支只用于存放构建好的、可直接部署的静态网站文件。
    - GitHub Pages 被配置为从 `main` 分支读取文件并托管网站。

**总结**: 开发者只需要在 `docs` 分支上撰写和修改内容，然后推送到 GitHub。后续的构建和发布过程完全自动化，最终用户通过 GitHub Pages 访问到的始终是最新发布的网站内容。

## 本地开发

如果需要在本地进行开发或预览：

1.  克隆仓库。
2.  确保已安装 [Node.js](https://nodejs.org/en) 和 [pnpm](https://pnpm.io/installation)。
3.  在仓库根目录下运行 `pnpm install` 来安装依赖。
4.  运行 `pnpm dev` 或 `pnpm start` 来启动本地开发服务器，在浏览器中预览网站。

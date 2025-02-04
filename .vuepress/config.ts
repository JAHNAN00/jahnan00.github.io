import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { themeConfig } from './config/index'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "JAHNAN00's blog",
      description: "JAHNAN00的个人网站.",
    },
  },
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme(themeConfig),
  // debug: true,
});

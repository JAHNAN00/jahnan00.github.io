import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { themeConfig } from './config/index'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

// Node 22 exposes `navigator`, which can make some browser checks pass during SSR.
// Provide a minimal storage shim so build-time imports do not crash on `localStorage.getItem`.
if (typeof window === "undefined") {
  const globalObject = globalThis as typeof globalThis & {
    localStorage?: {
      getItem?: (key: string) => string | null;
      setItem?: (key: string, value: string) => void;
      removeItem?: (key: string) => void;
      clear?: () => void;
    };
  };

  if (
    typeof globalObject.localStorage === "undefined" ||
    typeof globalObject.localStorage?.getItem !== "function"
  ) {
    globalObject.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };
  }
}

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

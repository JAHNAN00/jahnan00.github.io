import {
  global_exports
} from "./chunk-D5J2K6VK.js";
import {
  h
} from "./chunk-JN5NFW2R.js";

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/resolveEditLink.js
import { isLinkHttp as isLinkHttp2, removeLeadingSlash, removeEndingSlash } from "vuepress/shared";

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/resolveRepoType.js
import { isLinkHttp } from "vuepress/shared";
var resolveRepoType = (repo) => {
  if (!isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
};

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/resolveEditLink.js
var editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
var resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  const repoType = resolveRepoType(docsRepo);
  let pattern;
  if (editLinkPattern) {
    pattern = editLinkPattern;
  } else if (repoType !== null) {
    pattern = editLinkPatterns[repoType];
  }
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp2(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/createOneColor.js
function createOneColor() {
  const tagColorArr = [
    "#e15b64",
    "#f47e60",
    "#f8b26a",
    "#abbd81",
    "#849b87",
    "#e15b64",
    "#f47e60",
    "#f8b26a",
    "#f26d6d",
    "#67cc86",
    "#fb9b5f",
    "#3498db"
  ];
  const index = Math.floor(Math.random() * tagColorArr.length);
  return tagColorArr[index];
}

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/registerGlobalComponents.js
function registerGlobalComponents(app) {
  Object.keys(global_exports).forEach((key) => {
    app.component(key, global_exports[key]);
  });
}

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/resolveSearchComponent.js
function resolveSearchComponent(app) {
  app.component("NavbarSearch", () => {
    const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
    return SearchComponent ? h(SearchComponent) : null;
  });
}

// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/throttle.js
var throttle = (func, wait = 500) => {
  let timer;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func.apply(func, args);
      timer = null;
    }, wait);
  };
};

export {
  resolveRepoType,
  editLinkPatterns,
  resolveEditLink,
  createOneColor,
  registerGlobalComponents,
  resolveSearchComponent,
  throttle
};
//# sourceMappingURL=chunk-SAYXV63K.js.map

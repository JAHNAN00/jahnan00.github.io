export const themeData = JSON.parse("{\"selectLanguageName\":\"简体中文\",\"lastUpdatedText\":\"最后更新时间\",\"catalogTitle\":\"页面导航\",\"tip\":\"提示\",\"info\":\"信息\",\"warning\":\"警告\",\"danger\":\"危险\",\"details\":\"详情\",\"editLinkText\":\"编辑当前页面\",\"notFound\":\"哇哦，没有发现这个页面！\",\"backToHome\":\"返回首页\",\"logo\":\"/logo.png\",\"author\":\"JAHNAN00\",\"authorAvatar\":\"/head.png\",\"docsRepo\":\"https://github.com/JAHNAN00/jahnan00.github.io\",\"docsBranch\":\"main\",\"docsDir\":\"/docs\",\"colorMode\":\"auto\",\"lastUpdated\":true,\"categoriesText\":\"分类\",\"tagsText\":\"标签\",\"navbar\":[{\"text\":\"主页\",\"link\":\"/\"},{\"text\":\"博客\",\"link\":\"/posts\"},{\"text\":\"分类\",\"link\":\"/categories/daohang/1.html\"},{\"text\":\"标签\",\"link\":\"/tags/daohang/1.html\"}]}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}

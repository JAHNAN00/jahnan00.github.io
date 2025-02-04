import comp from "/Users/an/Documents/personal_website/docs/.vuepress/.temp/pages/blogs/introduce.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/introduce.html\",\"title\":\"介绍！\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"介绍！\",\"date\":\"2025/02/04\",\"tags\":[\"导航\"],\"categories\":[\"导航\"],\"sticky\":1},\"headers\":[{\"level\":2,\"title\":\"这里是？\",\"slug\":\"这里是\",\"link\":\"#这里是\",\"children\":[]},{\"level\":2,\"title\":\"浏览本站\",\"slug\":\"浏览本站\",\"link\":\"#浏览本站\",\"children\":[]},{\"level\":2,\"title\":\"欢迎联系\",\"slug\":\"欢迎联系\",\"link\":\"#欢迎联系\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/introduce.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

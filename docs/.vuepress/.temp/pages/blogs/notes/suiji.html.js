import comp from "/Users/an/Documents/personal_website/docs/.vuepress/.temp/pages/blogs/notes/suiji.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/notes/suiji.html\",\"title\":\"随记\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"随记\",\"date\":\"长期\",\"tags\":[null],\"categories\":[\"笔记\"]},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/notes/随记.md\"}")
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

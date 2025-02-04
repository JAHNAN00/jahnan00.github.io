import comp from "/Users/an/Documents/personal_website/docs/.vuepress/.temp/pages/blogs/template.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/template.html\",\"title\":\"模板\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"模板\",\"date\":\"1970/01/01\",\"tags\":[\"其它\"],\"categories\":[\"其它\"]},\"headers\":[{\"level\":2,\"title\":\"注意事项\",\"slug\":\"注意事项\",\"link\":\"#注意事项\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/template.md\"}")
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

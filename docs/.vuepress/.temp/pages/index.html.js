import comp from "/Users/an/Documents/personal_website/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"modules\":[\"BannerBrand\",\"Blog\",\"MdContent\",\"Footer\"],\"bannerBrand\":{\"bgImage\":\"/bg.svg\",\"title\":\"Curiosity Fuels Innovation!\",\"description\":\"欢迎来到JAHNAN00的博客。\",\"tagline\":\"「 为什么登山？因为山就在那里。 」\",\"buttons\":[{\"text\":\"介绍\",\"link\":\"/blogs/introduce\"},{\"text\":\"Github\",\"icon\":\"IconGithub\",\"link\":\"https://github.com/JAHNAN00\",\"type\":\"plain\"}]},\"footer\":{\"startYear\":2025,\"showAccessNumber\":false}},\"headers\":[],\"git\":{\"createdTime\":1738258542000,\"updatedTime\":1738600793000,\"contributors\":[{\"name\":\"JAHNAN00\",\"email\":\"jahnan00@qq.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")
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

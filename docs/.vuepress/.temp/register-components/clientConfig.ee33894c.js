import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("IconGithub", defineAsyncComponent(() => import("/Users/an/Documents/personal_website/docs/.vuepress/components/IconGithub.vue")))
  },
}

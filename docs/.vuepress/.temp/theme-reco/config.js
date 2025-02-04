
  import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import { applyClientSetup } from '/Users/an/Documents/personal_website/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/clientSetup.js'
import { applyClientEnhance } from '/Users/an/Documents/personal_website/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/clientEnhance.js'

import * as layouts from '/Users/an/Documents/personal_website/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/layouts/index.js'

  const layoutsFromDir = {}
export default defineClientConfig({
  enhance(...args) {
    applyClientEnhance(...args)
  },
  setup() {
    applyClientSetup()
  },
  // @ts-ignore
  layouts: { ...layouts, ...layoutsFromDir },
})

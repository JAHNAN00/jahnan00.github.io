---
home: true
modules:
  - BannerBrand
  - Blog
  - MdContent
  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: Curiosity Fuels Innovation!
  description: 欢迎来到JAHNAN00的博客。
  tagline: 「 为什么登山？因为山就在那里。 」
  buttons:
    - { text: 介绍, link: '/blogs/introduce' }
    - { text: Github, link: 'https://github.com/JAHNAN00', type: 'plain' }
footer: # 底部模块的配置
  # record: 域名备案文案
  # recordLink: 域名备案地址
  # cyberSecurityRecord: 公安备案文案
  # cyberSecurityLink: 公安备案地址
  startYear: 2025
  showAccessNumber: false #用于控制评论和访问量的统计
---

这是图标的前面
<Xicons icon="IconUser" />
这是图标的后面

<Xicons :text="copyRight">
  <template #icon>
    <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"></path></g></svg>
  </template>
</Xicons>

这是自定义图标的后面
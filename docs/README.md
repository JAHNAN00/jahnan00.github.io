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
  description: 这里是JAHNAN00的个人博客。
  #tagline: 「 为什么登山？因为山就在那里。 」
  buttons:
    - { text: 介绍, link: '/blogs/introduce' }
    - { text: Github, icon: "IconGithub", link: 'https://github.com/JAHNAN00', type: 'plain' }
footer: # 底部模块的配置
  # record: 域名备案文案
  # recordLink: 域名备案地址
  # cyberSecurityRecord: 公安备案文案
  # cyberSecurityLink: 公安备案地址
  startYear: 2025
  showAccessNumber: false #用于控制评论和访问量的统计

# 待解决的bug
# vue组件无法正确注册
# vue组件需放在components根目录下，且docs目录必须设置正确
#  11111
---

<Xicons icon="IconGithub" />
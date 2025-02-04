import { RecoThemeData } from 'vuepress-theme-reco/lib/types'

export const themeConfig: RecoThemeData = {
    // 替换原本的英语文字，例如 On this page
    selectLanguageName: '简体中文',
    lastUpdatedText: '最后更新时间',
    catalogTitle: '页面导航',
    tip: '提示',
    info: '信息',
    warning: '警告',
    danger: '危险',
    details: '详情',
    editLinkText: '编辑当前页面',
    notFound: '哇哦，没有发现这个页面！',
    backToHome: '返回首页',

    // 基本信息
    logo: "/logo.png",
    author: "JAHNAN00",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/JAHNAN00/jahnan00.github.io",
    docsBranch: "main",
    docsDir: "docs",//感觉有点问题
    colorMode: "auto",
    lastUpdated: true,
    categoriesText:"分类",
    tagsText:"标签",
    

    // 导航栏
    navbar: [
        {text:"测试",icon:'IconSun',link:"/"},
        { text: "主页", link: "/" },
        { text: "博客", link: "/posts" },//所有blog类文档默认编译至posts
        { text: "分类", link: "/categories/daohang/1.html" },//按照分类筛选文章
        { text: "标签", link: "/tags/daohang/1.html" },//按照标签筛选文章
        // {
        //     //先占着，后续如果有系列教程想写，写在series里
        //     text: "文档",
        //     children: [
        //         { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
        //         { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        //     ],
            
        // },
    ],

    // series: {},
    // bulletin:{}, //弹窗

    // 用于设置评论，待学习
    // commentConfig: {
    //     type: 'valine',
    //     // options 与 1.x 的 valineConfig 配置一致
    //     options: {
    //         // appId: 'xxx',
    //         // appKey: 'xxx',
    //         // placeholder: '填写邮箱可以收到回复提醒哦！',
    //         // verify: true, // 验证码服务
    //         // notify: true,
    //         // recordIP: true,
    //         // hideComments: true // 隐藏评论
    //     },
    // },
};
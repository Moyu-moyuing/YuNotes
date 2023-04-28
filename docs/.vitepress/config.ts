import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { getSidebar, getNavData } from './navSidebarUtil'

// 解构defineConfig

export default defineConfig({
  title: 'YuNotes',
  titleTemplate: '凌晨三点的修狗的知识星球',
  description: '小雨的个人技术笔记',
  lang: 'zh-CN',
  base: '/YuNotes/',
  // 基础路由
  lastUpdated: true,
  // 最近更新时间
  appearance: true,
  // 主题配置
  ignoreDeadLinks: true,
  // 忽略死链接，即文档为空不跳转
  markdown: {
    theme: 'material-theme-palenight',
    // markdown代码板块主题
    lineNumbers: true
    // 代码行数标识
  },
  head: [['link', { rel: 'icon', href: '/YuNotes/img/notes.svg' }]],
  themeConfig: {
    siteTitle: 'YuNotes',
    logo: '/img/notes.svg',
    // nav: [
    //    { text: '指导', link: '/guide' },
    //    { text: '配置', link: '/config' },
    // ],
    // 扫描目录自动生成顶部导航
    nav: [
      {
        text: '导航',
        link: '/guide/阅读须知/'
      },
      {
        text: '博客',
        items: getNavData({ enableDirActiveMatch: true, dirName: 'blog' })
      },
      {
        text: '文档',
        items: getNavData({ enableDirActiveMatch: true, dirName: 'articles' })
      }
    ],

    // 扫描目录自动生成侧栏
    sidebar: getSidebar(),
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Moyu-moyuing'
      }
    ],
    footer: {
      message:
        '本站主要用于学术探讨，仅供学习交流，欢迎 ' +
        '<a href="https://github.com/Moyu-moyuing/YuNotes" >star ⭐</a>',
      copyright:
        '<a href="https://github.com/Moyu-moyuing/YuNotes/blob/main/LICENSE">MIT License</a>' +
        ' | 版权所有 © 2023 ' +
        '<a href="https://github.com/Moyu-moyuing/YuNotes">moyu & YuNotes contributors</a>'
    },

    // 文档页配置
    lastUpdatedText: '最后一次更新于',
    editLink: {
      pattern: 'https://github.com/Moyu-moyuing/YuNotes/tree/master/docs/:path',
      text: '为此页内容提供修改建议'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // 页面设置
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单栏',
    // 大纲标题以及大纲中要为页面显示的页眉级别
    outlineTitle: '大纲',
    outline: 'deep',
    // 主题设置
    darkModeSwitchLabel: '主题'
  },
  cleanUrls: true
  //搜索配置
  // vite: {
  //   plugins:[pagefindPlugin({
  //     btnPlaceholder: '搜索',
  //     placeholder: '搜索文档',

  //   })],
  // }
})

import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'YuNotes',
    description: '小雨的个人技术笔记',
    lang: 'zh-CN',
    base: '/YuNotes/',
    lastUpdated: true,
    head: [
      [
        'link', { rel: 'icon', href: '/img/notes.svg' }
    ],

    ],
    themeConfig: {
      siteTitle:'小雨的技术笔记',
      logo: '/img/notes.svg',
      
      nav: [
        { text: '指导', link: '/guide' },
        { text: '配置', link: '/config' },
        
      ],
      socialLinks:[
        {
          icon: 'github',
          link: 'https://github.com/Moyu-moyuing'
        }
      ],
      footer: {
        message:'本站主要用于学术探讨，仅供学习交流，欢迎 '
        +'<a href="https://github.com/Moyu-moyuing/YuNotes" >star ⭐</a>',
        copyright: '<a href="https://github.com/Moyu-moyuing/YuNotes/blob/main/LICENSE">MIT License</a>'
        +' | 版权所有 © 2023 '
        +'<a href="https://github.com/Moyu-moyuing/YuNotes">moyu & YuNotes contributors</a>'

      },
      
      // 文档页配置
      lastUpdatedText: '最后一次更新于',
      editLink:{
        pattern:'https://github.com/Moyu-moyuing/YuNotes/tree/master/docs/:path',
        text: '在GitHub上编辑此页'
      },
      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },
      // 页面设置
      returnToTopLabel:'返回顶部',
      sidebarMenuLabel: '菜单栏',
      // 大纲标题以及大纲中要为页面显示的页眉级别
      outlineTitle: '大纲',
      outline:'deep',
      // 主题设置
      darkModeSwitchLabel:'主题',
      
    }
  })
  
import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'YuNotes',
    description: '小雨的个人技术笔记',
    lang: 'zh-CN',
    base: '/YuNotes/',
    themeConfig: {
      
      siteTitle:'小雨的技术笔记',
      logo: '/img/greenNav.svg',
      
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

      }
    }
  })
  
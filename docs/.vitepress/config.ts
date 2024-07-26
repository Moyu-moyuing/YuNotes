import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-katex'
// import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { getSidebar, getNavData } from './navSidebarUtil'
import algolia from './algolia'

const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
  'mjx-container',
  'mjx-assistive-mml'
]

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
    lineNumbers: true,
    // 代码行数标识
    config: md => {
      md.use(mathjax3)
    }
    //使用mathjax3渲染LaTeX公式
  },
  head: [
    ['link', { rel: 'icon', href: '/YuNotes/img/imge.svg' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css',
        crossorigin: ''
      }
    ]
  ],
  themeConfig: {
    siteTitle: 'YuNotes',
    logo: '/img/imge.svg',
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
    algolia,
    // 扫描目录自动生成侧栏
    sidebar: getSidebar(),
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Moyu-moyuing'
      },
      {
        icon: {
          svg: ` <svg
                t="1692784900643"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1553"
                width="200"
                height="200"
                >
                  <path
                    d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 
                    794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 
                    9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 
                    11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 
                    18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 
                    94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 
                    138.464-6.432 166.336-16z"
                    fill="currentColor"
                    p-id="1554"
                    data-spm-anchor-id="a313x.search_index.0.i0.68503a814wTmDy"
                    class="selected"
                  ></path>
                </svg>`
        },
        link: 'https://blog.csdn.net/weixin_43837483?spm=1011.2421.3001.5343',
        ariaLabel: 'csdn'
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
    outline: [1, 6],
    // 主题设置
    darkModeSwitchLabel: '主题'
    // externalLinkIcon: true
  },
  cleanUrls: true,
  //搜索配置
  // vite: {
  //   plugins:[pagefindPlugin({
  //     btnPlaceholder: '搜索',
  //     placeholder: '搜索文档',

  //   })],
  // }
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => customElements.includes(tag)
      }
    }
  }

  // transformHtml: (code, id, _) => {
  //   if (id.endsWith('.md')) {
  //     const [filename, i] = id.split('/').slice(-2)
  //     // 是首页的 index.md直接跳过
  //     if (!(filename === 'docs' && i === 'index.md'))
  //       // 在正文末尾插入“Contributors”标题以及贡献者组件
  //       code += '\n## 贡献者\n<Contributors/>'
  //   }
  // }
})

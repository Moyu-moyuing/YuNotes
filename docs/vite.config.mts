//vite.config.ts
// import { SearchPlugin } from "vitepress-plugin-search";
// import { defineConfig } from "vite";
// import flexSearchIndexOptions from 'flexsearch'
// //default options
// var options = {
//   ...flexSearchIndexOptions,
//   previewLength: 100,
//   buttonLabel: "搜索",
//   placeholder: "请输入关键词",
//   allow: [],
//   ignore: [],
// };

// export default defineConfig({
//   plugins: [SearchPlugin(options)],
// });
/**
 * 记录：使用flexsearch无法支持中文搜索，UI很丑
 * 需要添加语言支持，需要配置分词器等等设置
 * 大坑
 *
 * 改用vitepress-plugin-pagefind
 */

/**
 * vitepress-plugin-pagefind的配置如下
 */
// import {
//   chineseSearchOptimize,
//   pagefindPlugin
// } from 'vitepress-plugin-pagefind'
// import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { MDPreprocessor } from './.vitepress/plugins/mdPreprocessor'

export default defineConfig({
  plugins: [
    MDPreprocessor(),
    // pagefindPlugin({
    //   // 自定义搜索框
    //   btnPlaceholder: '搜索',
    //   placeholder: '请输入关键词',
    //   emptyText: '没有找到您想要的内容...',
    //   heading: '共：{{searchResult}} 条结果',
    //   showDate: false,

    //   /**
    //    * 搜索排除配置
    //    * 避免检索时检索到页面的公共部分
    //    * 通过HTML元素名实现
    //    * img:图片
    //    * div.aside:侧栏
    //    * a.header-anchor:头部导航
    //    */
    //   //excludeSelector:['img','a.header-anchor','div.aside'],
    //   // 检索语言配置
    //   //forceLanguage: 'zh-cn',
    //   //搜索优化：中文自动分词
    //   customSearchQuery(input) {
    //     //将搜索每个中文单字两侧加空格
    //     return input
    //       .replace(/[\u4e00-\u9fa5]/g, ' $& ')
    //       .replace(/\s+/g, ' ')
    //       .trim()
    //   }
    // }),
    vueJsx(),
    Icons({
      compiler: 'vue3',
      autoInstall: true
      // defaultStyle: 'display: inline-block'
      //统一设置浮动布局
    }),
    Components({
      // dirs: resolve(__dirname, '.vitepress/theme/components'),
      // include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon'
        })
      ],
      dts: './.vitepress/components.d.ts'
    })
  ]
})

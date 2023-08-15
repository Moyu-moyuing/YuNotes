import { resolve } from 'node:path'
import { defineConfig } from 'vite'
// import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { MDPreprocessor } from './.vitepress/plugins/mdPreprocessor'

export default defineConfig({
  plugins: [
    MDPreprocessor(),
    vueJsx(),
    Icons({
      compiler: 'vue3',
      autoInstall: true
      // defaultStyle: 'display: inline-block'
      //统一设置浮动布局
    }),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon'
        })
      ],
      dts: './.vitepress/components.d.ts'
    })
  ]
})

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
//@ts-ignore
import CopyRight from './components/copyRight.vue'
// import './styles/var.css'
// import './styles/pagefind.css'
import './styles/tailwind.css'
//

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(CopyRight)
    })
  }
}

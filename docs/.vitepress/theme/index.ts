import { h, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
//@ts-ignore
import CopyRight from './components/copyRight.vue'
import './styles/rainbow.css'
import './styles/var.css'
import './styles/overRides.css'
import './styles/tailwind.css'

let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(CopyRight)
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/YuNotes/'),
      { immediate: true }
    )
  }
}

function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

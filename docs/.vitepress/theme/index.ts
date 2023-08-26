import { h, watch } from 'vue'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'

import DefaultTheme from 'vitepress/theme'
import CopyRight from './components/copyRight.vue'
import TeamPage from './components/teamPage.vue'
import Contributors from './components/contributors.vue'
import AccessData from './components/accessData.vue'
import './styles/rainbow.css'
import './styles/var.css'
import './styles/overRides.css'
import './styles/tailwind.css'

let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => [h(AccessData), h(TeamPage)],
      'doc-footer-before': () => h(CopyRight)
    })
  },
  enhanceApp({ app, router }) {
    app.component('Contributors', Contributors)
    if (typeof window === 'undefined') return

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
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

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'

import './styles/tokens.css'
import './styles/base.css'

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

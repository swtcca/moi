import { createApp } from "vue";
import { pinia } from "./stores"
import { anu } from "anu-vue"

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'anu-vue/dist/style.css'
import '@anu-vue/preset-theme-default/dist/style.scss'
import "./gun-vue/styles/index.css"
import './styles/styles.css'

import { createRouter, createWebHashHistory } from "vue-router"
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import routes_static from './routes'
import { isDark } from "./composables/dark"

// polyfill start
import { Buffer } from 'buffer'
if (!globalThis.hasOwnProperty("global")) globalThis.global = globalThis
if (!globalThis.hasOwnProperty("Buffer")) globalThis.Buffer = Buffer
if (!globalThis.hasOwnProperty("setImmediate")) globalThis.setImmediate = setTimeout
// polyfill end

import { GunVuePlugin } from './gun-vue/components'

import App from "./App.vue"

const routes = setupLayouts([...generatedRoutes, ...routes_static])
// import routes from "~pages"
console.dir(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
})

const app = createApp(App);
app.use(anu)
app.use(GunVuePlugin)
app.use(router)
app.use(pinia)
// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes }))

router.isReady().then(async () => {
  app.mount("#app");
})

// const primary = useCssVar("--a-primary-vue")
// primary.value = 1
// watch(primary, () => {
//     console.log(primary.value)
//   }
// )
// setInterval(() => { primary.value += 1 }, 300)

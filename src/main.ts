import { createApp, ref } from "vue";
import { pinia } from "./stores"
import { globalState } from "./stores/globalState"

import '@unocss/reset/tailwind.css'
import 'uno.css'
import "./gun-vue/styles/index.css";
// import "./styles/styles.scss";

import { createRouter, createWebHashHistory } from "vue-router"
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// polyfill start
import { Buffer } from 'buffer'
if (!globalThis.hasOwnProperty("global")) globalThis.global = globalThis
if (!globalThis.hasOwnProperty("Buffer")) globalThis.Buffer = Buffer
if (!globalThis.hasOwnProperty("setImmediate")) globalThis.setImmediate = setTimeout
// polyfill end

import { GunVuePlugin } from '#components'
import { peer } from "#composables"
peer.value = globalState.gunPeer || "https://relay.bcapps.ca/gun"
import { currentRoom } from '#composables';

import App from "./App.vue"

const routes = setupLayouts(generatedRoutes)
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
});

const app = createApp(App);
app.use(GunVuePlugin)
app.use(router)
app.use(pinia)
// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes }))

router.isReady().then(async () => {
  app.mount("#app");
})

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});

// router.afterEach((to, from, failure) => {
//   console.dir(from.query)
// })
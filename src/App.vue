<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
// import { useCssVar } from "@vueuse/core"
import config from "./gun.config.json"
// config.relay = "https://relay.129.153.59.37.nip.io/gun"
import { useGun, currentRoom, rootRoom, useBackground, useUser, setPeer, relay } from "./gun-vue/composables";
import { initChannels } from "./composables/useVideos"
const router = useRouter()
const route = useRoute();
const location_origin = ref(location.origin)

globalThis.gun = useGun()
onBeforeMount(() => {
  if (/localhost|127.0.0.1/.test(location_origin.value)) {
    const {cref, gchannels, tvideos, tref} = initChannels()
    const { user } = useUser()
    globalThis.gchannels = gchannels
    globalThis.cref = cref
    globalThis.tvideos = tvideos
    globalThis.tref = tref
    globalThis.user = user
    globalThis.room = currentRoom
  }
})
onMounted(() => {
  console.log(`on app mount`)
  const languages = usePreferredLanguages()
  const { locale } = useI18n()
  const language = languages.value[0]
  if (language.startsWith("zh")) {
    locale.value = "zh-CN"
  } else if (language.startsWith("ru")) {
  } else {}
  console.log(`app mounted`)
})

watchEffect(() => {
  if (route.query?.room) {
    currentRoom.pub = String(route.query.room)
  }
})

watch(() => route.fullPath, () => {
  let rel = route.query?.relay
  if ((rel && rel != relay.peer)) {
    setPeer(String(rel))
  }
  // if (!rel && relay.peer != config.relay) {
  //   setPeer(String(config.relay))
  // }
}, { immediate: true })

watch(() => relay.peer, peer => {
  if (peer === config.relay) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { relay: peer } })
  }
})

watch(() => currentRoom.pub, (pub) => {
  if (pub === rootRoom.pub) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { room: pub } })
  }
})

router.beforeEach((to, from) => {
  const { user } = useUser()
  if (to.meta.requiresAuth && !user.pub) {
    return {
      path: '/auth/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }

  if (!currentRoom.isRoot && !to.query?.room) {
    return { ...to, query: { ...to.query, room: currentRoom.pub, } }
  }

  if (relay.peer != config.relay && !to.query?.relay) {
    return { ...to, query: { ...to.query, relay: relay.peer } }
  }

  return true
})

// router.afterEach((to, from, failure) => {
//   console.dir(from.query)
// })

//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

</script>

<template lang="pug">
router-view(v-slot="{ Component }")
  keep-alive
    component(:is="Component")
</template>

<style lang="postcss">
body {
  @apply bg-gray-200 dark:bg-gray-600;
  touch-action: pan-x pan-y;
}
#app {
  @apply h-full w-full;
}
</style>

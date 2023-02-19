<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { useGun, currentRoom, rootRoom, useBackground, useUser } from "./gun-vue/composables";
import { initChannels } from "./composables/useVideos"
import { globalState } from './stores/globalState'
import { onLongPress } from '@vueuse/core'
onLongPress(
  document.body,
  () => { console.log(`on long press`); globalState.show_top = !globalState.show_top },
  { delay: 2000, modifiers: { prevent: true } }
)

const router = useRouter()
const route = useRoute();
const location_origin = ref(location.origin)

globalThis.gun = useGun()
onBeforeMount(() => {
  if (/localhost|127.0.0.1/.test(location_origin.value)) {
    const {vref, cref, gvideos, gchannels, pref, pvideos, tvideos, tref} = initChannels()
    const { user } = useUser()
    globalThis.pvideos = pvideos
    globalThis.pref = pref
    globalThis.gvideos = gvideos
    globalThis.vref = vref
    globalThis.gchannels = gchannels
    globalThis.cref = cref
    globalThis.tvideos = tvideos
    globalThis.tref = tref
    globalThis.user = user
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
    currentRoom.pub = route.query.room
  }
});

watch(() => currentRoom.pub, (pub) => {
  if (pub == rootRoom.pub) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { room: pub } })
  }
})


//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

</script>

<template lang="pug">
router-view(v-slot="{ Component }")
  transition(
    name="fade"
    mode="out-in")
    keep-alive
      component(:is="Component")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-600 dark-bg-dark-200;
  touch-action: pan-x pan-y;
}
#app {
  @apply h-full w-full;
}
</style>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { useGun, currentRoom, rootRoom, useBackground, useUser } from "./gun-vue/composables";
import { initChannels } from "./composables/useVideos"
import { useAnu } from 'anu-vue';
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
  const { themes, activeThemeName, activeTheme } = useAnu()
  console.log(activeThemeName.value)
  // setInterval(() => {
  //   if (activeThemeName.value === "light") {
  //     activeThemeName.value = "dark"
  //   } else {
  //     activeThemeName.value = "light"
  //   }
  //   console.log(activeTheme.value.theme.colors)
  //   for (const themeName in themes.value) {
  //     const theme = themes.value[themeName]
  //     theme.colors.primary = '235, 97.7%, 66.3%'
  //   }
  // }, 5000)
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
  keep-alive
    component(:is="Component")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-600 dark-bg-dark-200 text-gray-800 dark-text-light-800;
  touch-action: pan-x pan-y;
}
#app {
  @apply h-full w-full;
}
</style>

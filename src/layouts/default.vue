<template>
  <main class="h-screen">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-95">
      <NavBottom v-if="globalState.show_top" />
      <Navier v-if="globalState.show_tools" />
      <ReloadPrompt />
    </div>
    <div class="h-screen" :class="globalState.nav_classes">
      <router-view />
    </div>
    <div ref="navbar" class="fixed left-0 bottom-0 z-400 inset-x-0 opacity-95">
      <NavBottom v-if="!globalState.show_top" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { globalState } from '../stores/globalState'
const { top } = useScreenSafeArea()
const navbar = ref(null)
const navier = ref(null)
const { height: heightwindow } = useWindowSize()
const { height: heightNavBottom } = useElementSize(navbar)
const { height: heightNavTop } = useElementSize(navier)
globalState.nav_styles = computed(() => `padding-top: ${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,""))}px; padding-bottom: ${Math.floor(heightNavBottom.value)}px;`)
globalState.nav_classes = computed(() => `mt-${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,""))}px mb-${Math.floor(heightNavBottom.value)}px`)
globalState.nav_top = computed(() => `${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,""))}px`)
globalState.nav_bottom = computed(() => `${Math.floor(heightNavBottom.value)}px`)
globalState.nav_router = computed(() => `h-${heightwindow.value - Math.floor(heightNavBottom.value) - Math.floor(heightNavTop.value || 0) - parseInt(top.value.replace(/px/,""))}px`)
</script>

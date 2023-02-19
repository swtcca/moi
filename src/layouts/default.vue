<template>
  <main class="h-screen">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <ReloadPrompt />
    </div>
    <div class="h-screen" :class="globalState.nav_classes">
      <router-view />
    </div>
    <!--
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <NavBottom v-if="globalState.show_top" />
      <ReloadPrompt />
    </div>
    <div ref="navbar" class="fixed left-0 bottom-0 z-400 inset-x-0 opacity-90">
      <NavBottom v-if="!globalState.show_top" />
    </div>
    -->
    <div class="fixed left-1 bottom-0 z-400">
      <RouterLink class="link" to="/">
        <div class="bg-transparent font-bold pt-2 text-left text-6xl text-green-700 text-opacity-10 text-stroke-sm text-stroke-blue-700">
          M
        </div>
      </RouterLink>
    </div>
    <div class="fixed right-1 bottom-1 z-400">
      <UserIcon
        :size="48"
        :showName="false"
        @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
        @post="$router.push(`/posts/${$event}`)"
        @chat="$router.push(`/my/chat/${$event}`)">
      </UserIcon>
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
globalState.nav_classes = computed(() => `mt-${top.value}`)
// globalState.nav_classes = computed(() => globalState.show_top ? `mt-${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,"") || "0")}px` : `mb-${Math.floor(heightNavBottom.value)}px`)
</script>

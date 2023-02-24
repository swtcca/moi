<template>
  <main class="h-screen">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <ReloadPrompt />
    </div>
    <div class="h-screen" :class="globalState.layout_classes">
      <router-view />
      <div class="py-16" v-if="$route.path === '/'">
        <Navier />
      </div>
    </div>
    <!--
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <NavBottom v-if="globalState.show_top" />
      <ReloadPrompt />
    </div>
    <div ref="navbar" class="fixed left-0 bottom-0 z-400 inset-x-0 opacity-90">
      <NavBottom v-if="!globalState.show_top" />
    </div>
        <div class="bg-transparent font-bold text-left text-6xl text-green-700 text-opacity-10 text-stroke-sm text-stroke-blue-700">
    -->
    <div ref="home_ref" class="fixed z-400 left-1" :style="home_classes">
      <RouterLink class="link" to="/">
        <div class="i-la-home text-6xl  text-green-700 text-opacity-90 text-stroke-sm text-stroke-blue-700"></div>
      </RouterLink>
    </div>
    <div ref="user_ref" class="fixed z-400 right-2" :style="home_classes">
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
const navier = ref(null)
const home_ref = ref(null)
const user_ref = ref(null)
const { height, width } = useWindowSize()
const { x, y, style } = useDraggable(home_ref, {initialValue: {x: 10, y: (height.value || 640) - 54 }})
console.log(`${width.value} x ${height.value}`)
console.log(style.value)
globalState.layout_classes = computed(() => `mt-${top.value}`)
const home_classes = computed(() => `top:${y.value}px`)
// globalState.nav_classes = computed(() => globalState.show_top ? `mt-${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,"") || "0")}px` : `mb-${Math.floor(heightNavBottom.value)}px`)
</script>

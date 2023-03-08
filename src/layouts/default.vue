<script setup lang="ts">
import { globalState } from '../stores/globalState'
import { class_font } from '../composables/useFont'
import { useUser } from '../gun-vue/composables'
const { top } = useScreenSafeArea()
const { user } = useUser()
const navier = ref(null)
const move_ref = ref(null)
const home_ref = ref(null)
const user_ref = ref(null)
const { height, width } = useWindowSize()
const { x, y, style } = useDraggable(move_ref, {initialValue: {x: 0, y:0 }})
console.log(`${width.value} x ${height.value}`)
console.log(style.value)
globalState.layout_classes = computed(() => `mt-${top.value}`)
const home_classes = computed(() => `left:${x.value}px;bottom:${y.value}px`)
const user_classes = computed(() => `right:${x.value}px;bottom:${y.value}px`)
// globalState.nav_classes = computed(() => globalState.show_top ? `mt-${Math.floor(heightNavTop.value || 0) + parseInt(top.value.replace(/px/,"") || "0")}px` : `mb-${Math.floor(heightNavBottom.value)}px`)
//      <div class="pb-16" v-if="$route.path === '/'">
</script>

<template>
  <main class="h-screen" :class="class_font">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <ReloadPrompt />
    </div>
    <div class="h-screen" :class="globalState.layout_classes">
      <router-view />
      <div class="pb-20" v-show="$route.path === '/'">
        <Navier />
      </div>
    </div>
    <div ref="move_ref" v-show="$route.path !== '/'" class="fixed z-401" :style="style">
      <div class="i-carbon-router text-4xl  text-blue-700 text-opacity-90 text-stroke-sm text-stroke-green-700"></div>
    </div>
    <div ref="home_ref" v-show="$route.path !== '/'" class="fixed z-400" :style="home_classes">
      <RouterLink class="link" to="/">
        <div class="i-la-home text-6xl  text-blue-700 text-opacity-90 text-stroke-sm text-stroke-green-700"></div>
      </RouterLink>
    </div>
    <div ref="user_ref" v-show="$route.path === '/' || !user.is " class="fixed z-400" :style="user_classes">
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
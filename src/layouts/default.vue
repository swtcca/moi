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
const { x, y, style } = useDraggable(move_ref, {initialValue: {x: -35, y: 0 }})
console.log(`${width.value} x ${height.value}`)
console.log(style.value)
globalState.layout_classes = computed(() => `mt-${top.value}`)
const home_classes = computed(() => `left:0px;bottom:${y.value}px`)
const user_classes = computed(() => `right:${x.value}px;bottom:${y.value}px`)
</script>

<template>
  <main class="h-screen w-screen" :class="class_font">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-90">
      <ReloadPrompt />
    </div>
    <div class="h-screen" :class="globalState.layout_classes">
      <router-view />
      <div class="pb-20" v-show="$route.path === '/'">
        <Navier />
      </div>
    </div>
    <div ref="move_ref" class="fixed z-401" :style="style">
      <div v-if="$route.path !== '/'" class="i-bx-move-vertical text-6xl text-opacity-90 text-stroke-sm"></div>
    </div>
    <div ref="home_ref" class="fixed z-400" :style="home_classes">
      <div v-show="!user.is" >
      <UserIcon
        :size="48"
        :showName="false"
        @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
        @post="$router.push(`/posts/${$event}`)"
        @chat="$router.push(`/my/chat/${$event}`)">
      </UserIcon>
      </div>
      <div v-if="$route.path !== '/'"  class="text-6xl text-opacity-90 text-stroke-sm">
        <RouterLink class="link" to="/">
          <div class="i-la-home"></div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { globalState } from '../stores/globalState'
import { currentRoom, useBackground, useColor } from '../gun-vue/composables';
// import { useFullscreen, onLongPress } from '@vueuse/core'
// const { toggle } = useFullscreen(document.body)
const navbottom = ref(null)
// onLongPress(
//   navbottom,
//   () => toggle(),
//   { delay: 1000, modifiers: { prevent: true } }
// )
const { t } = useI18n()
onMounted(() => {
  // const { x, y, top, right, bottom, left, width, height } = useElementBounding(language)
  // globalState.language = { x, y, top, right, bottom, left, width, height }
})

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')

</script>

<template lang="pug">
.min-h-2vh.justify-around.flex.flex-wrap.items-center.bg-light-900.shadow-lg.z-30.text-xl.w-full(ref="navbottom")
  router-link.link(to="/")
    .bg-transparent.font-bold.py-2.text-left.write-vertical-right.text-4xl.text-green-700.text-opacity-10.text-stroke-sm.text-stroke-blue-700 M
  button.text-4xl(:title="t('button.tools')" @click="globalState.show_tools=!globalState.show_tools")
    .i-la-times(v-if="globalState.show_tools")
    .i-ph-list(v-else)
  button.text-4xl(:title="t('button.tools')" @click="globalState.show_top=!globalState.show_top")
    .i-ph-arrow-line-down(v-if="globalState.show_top")
    .i-ph-arrow-line-up(v-else)
  user-icon(
    :size="32"
    :showName="false"
    @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
    @post="$router.push(`/posts/${$event}`)"
    @chat="$router.push(`/my/chat/${$event}`)"
    )
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>


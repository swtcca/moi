<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUser, createRoom, SEA, enterRoom, recreateRoom } from '#composables';
import { RoomCard } from '../components'

const emit = defineEmits(['browse'])

const { user } = useUser()

const rooms = computed(() => {
  let list = user.safe?.rooms
  if (!list) return {}
  delete list['_']
  return list
})

const open = ref(false)


const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col(v-if="Object.keys(rooms).length > 0")
  .flex.p-4.bg-light-900.dark-bg-dark-700.rounded-xl.mb-2.items-center.cursor-pointer.shadow-sm.hover-shadow-md.transition(@click="open = !open")
    .text-lg.font-bold {{ t('gunvue.my_rooms') }}
    .flex-1 
    .text-md.font-bold.mr-2 {{ Object.keys(rooms).length }}
    .i-la-angle-down(v-if="!open")
    .i-la-angle-up(v-else)
  transition(
    name="fade" 
    mode="out-in")
    .flex.flex-wrap.gap-2.mb-8(v-if="open" )
      room-card(
        v-for="( enc, room ) in rooms" 
        :key="room" 
        style="flex: 1 1 200px"
        :pub="room"
        )
          .p-4.flex.flex-wrap.gap-1
            button.button(@click="$emit('browse', room)")
              .i-la-eye
              .ml-2 {{ t('gunvue.view') }}
            button.button(@click="enterRoom(room)")
              .i-ion-enter-outline
              .ml-2 {{ t('gunvue.enter') }}
            button.button(@click="recreateRoom(enc)")
              .i-la-tools
              .ml-2 {{ t('gunvue.renew') }}
</template>
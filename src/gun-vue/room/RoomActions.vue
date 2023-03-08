<script setup>
import { useRoom, currentRoom, rootRoom, recreateRoom, useUser, downloadFile, SEA } from '#composables';
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  pub: { type: String, default: currentRoom.pub }
})

const { user } = useUser()

const { room, leaveRoom, enterRoom } = useRoom(props.pub)


const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

async function download(enc) {
  const dec = await SEA.decrypt(enc, user.pair());
  downloadFile(JSON.stringify(dec), 'application/json', `room-${room.profile?.name}.json`)
}

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-wrap.items-center.gap-2
  button.button(
    v-if="room.hosts?.[user.pub]" 
    @click="recreateRoom(room.hosts?.[user.pub]?.enc)"
    )
    .i-la-tools
    .ml-2 {{ t('gunvue.renew') }}
  button.button(
    v-if="room.hosts?.[user.pub]" 
    @click="download(room.hosts?.[user.pub]?.enc)"
    )
    .i-la-download
    .ml-2 {{ t('gunvue.keys') }}
  .flex.flex-wrap.py-4(v-if="roomPub != rootRoom.pub")
    button.button(
      v-if="currentRoom.pub !== roomPub" 
      @click="enterRoom(roomPub)"
      )
      .i-ion-enter-outline
      .ml-2 {{ t('gunvue.enter') }}
    button.button(
      v-else 
      @click="leaveRoom()"
      )
      .i-ion-exit-outline
      .ml-2 {{ t('gunvue.leave') }}
</template>
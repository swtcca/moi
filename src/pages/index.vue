<script setup lang="ts">
import { useGun, currentRoom, rootRoom } from '../gun-vue/composables'
import { initChannels } from "../composables/useVideos"

globalThis.gun = useGun()
// import * as GunComposable from '../gun-vue/composables'
// globalThis.GunComposable = GunComposable

onBeforeMount(() => {
  const {vref, cref, gvideos, gchannels, pref, pvideos, tref} = initChannels()
  globalThis.pvideos = pvideos
  globalThis.pref = pref
  globalThis.gvideos = gvideos
  globalThis.vref = vref
  globalThis.gchannels = gchannels
  globalThis.cref = cref
  globalThis.tref = tref
})
const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)" 
    )

</template>

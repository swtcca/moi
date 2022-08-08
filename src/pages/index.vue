<script setup lang="ts">
// import { useGun, currentRoom } from './gun-vue/composables'
// const gun = useGun()
// globalThis.gun = gun
import * as GunComposable from '../gun-vue/composables'
import { initChannels } from "../composables/useVideos"

globalThis.gun = GunComposable.useGun()
globalThis.GunComposable = GunComposable

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
    @browse="$router.push(`/${$event}/`)" 
    :key="GunComposable.currentRoom.pub"
    )

</template>

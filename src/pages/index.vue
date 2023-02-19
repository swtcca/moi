<script setup lang="ts">
import { currentRoom, rootRoom } from '#composables';
</script>

<template>
  <div class="flex flex-col">
    <RoomPage
      :key="currentRoom.pub" 
      @browse="$router.push(`/${$event}/`)">
    </RoomPage>
  </div>
  <div class="w-full mt-10">
    <Navier />
  </div>
</template>
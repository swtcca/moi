<script setup lang="ts">
import { currentRoom, rootRoom } from '#composables';
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    )
  .w-full.my-10
    navier()

</template>

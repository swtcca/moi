<script setup lang="ts">
import { currentRoom, rootRoom } from './composables';

import { RoomPage, UiComponents } from './components'
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    )
</template>

//TODO - ECOCOIN
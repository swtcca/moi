<script setup lang="ts">

</script>

<template lang="pug">
.flex.relative.items-stretch.bg-dark-50.dark-bg-dark-200.bg-opacity-40.w-full.h-full
  chat-topics(@topic="$router.push(`/chat/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")
</template>
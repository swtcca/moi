<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: "1" },
})
const blog = computed(() =>props.id.trim())
</script>

<template>
  <div class="flex items-center h-100vh">
    <Blog class="w-full" :id="blog" />
  </div>
</template>
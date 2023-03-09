<script setup lang="ts">
import { blogs } from "../../composables/useBlog"

const props = defineProps({
  id: { type: String, default: "1" },
})

const blog = computed(() =>props.id.trim())
</script>

<template>
  <div>
    <Blog :id="blog" />
  </div>
</template>
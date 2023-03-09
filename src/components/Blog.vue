<script setup lang="ts">
import { blogs } from "../composables/useBlog"

const props = defineProps({
  id: { type: String, default: "1" },
})

const blog = computed(() => blogs.value.find(post => post.id === props.id))
</script>
<template>
  <div>
    <h1>{{ blog.title }}</h1>
    <p>{{ blog.content }}</p>
    <p>By {{ blog.author }} on {{ blog.date }}</p>
  </div>
</template>
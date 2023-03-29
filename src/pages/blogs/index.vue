<script setup lang="ts">
import { blogs } from "../../composables/useBlog"

const selected = ref(null)

watch(selected, (value, old_value) => {
  console.log(value)
  console.log(old_value)
})

</script>
<template>
  <div class="grid gap-12 place-items-center text-2xl">
    <h1 class="text-6xl">Blog|博客</h1>
    <div v-for="blog of blogs" :key="blog.id">
      <ACard
        :title="blog.title"
        :subtitle="blog.author + ' ' + blog.date"
        class="w-100vw rounded-0"
        @click="$router.push(`/blogs/${blog.id}`)"
      >
      </ACard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { blogs } from "../composables/useBlog"
import { useMd } from '../gun-vue/file/useMd';
const md = useMd()

const props = defineProps({
  id: { type: String, default: "1" },
})

const blog = computed(() => blogs.value.find(post => post.id === props.id))
</script>
<template>
  <div class="sm:p-4 md:p-8 lg:p-16 xl:p32">
    <h1>{{ blog.title }}</h1>
    <div class="markdown-body prose" v-html="md.render(blog.content)"></div>
    <p>By {{ blog.author }} on {{ blog.date }}</p>
  </div>
</template>
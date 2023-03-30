<script setup lang="ts">
import { blogs } from "../composables/useBlog"
import { useMd } from '../gun-vue/file/useMd';
const md = useMd()
const edit = ref(false)

const props = defineProps({
  id: { type: String, default: "1" },
})

const blog = computed(() => blogs.value.find(post => post.id === props.id))
</script>
<template>
  <div class="sm:p-4 md:p-8 lg:p-16 xl:p32 bg-light-200 dark:bg-dark-500">
    <h1>{{ blog.title }}</h1>
    <div v-if="!edit" class="markdown-body prose dark:prose-invert" v-html="md.render(blog.content)"></div>
    <div v-if="edit"  class="bg-light-200 dark:bg-dark-500">
      <textarea class="w-full h-75vh  bg-light-200 dark:bg-dark-500" v-model="blog.content" />
    </div>
    <p>By {{ blog.author }} on {{ blog.date }}</p>
    <button v-if="edit" class="i-ph-floppy-disk text-4xl" @click.prevent="edit=!edit"></button>
    <button v-if="!edit" class="i-ph-pencil-circle text-4xl" @click.prevent="edit=!edit"></button>
  </div>
</template>
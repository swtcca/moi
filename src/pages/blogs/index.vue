<script setup lang="ts">
import { blogs, newBlog } from "../../composables/useBlog"
import { useUser } from "../../gun-vue/user/useUser"
const { user } = useUser()
</script>
<template>
  <div class="grid gap-12 place-items-center text-2xl">
    <h1 class="text-6xl">Blog|博客</h1>
    <div v-if="user.is" v-for="(blog, key) in user.safe.moiapp.blogs || {}" :key="key">
      <ACard
        :title="blog.title"
        :subtitle="blog?.author + ' ' + blog?.date"
        class="w-100vw rounded-0"
        @click="$router.push(`/blogs/${blog.id}`)"
      >
      </ACard>
    </div>
    <div v-for="blog of blogs" :key="blog.id">
      <ACard
        :title="blog.title"
        :subtitle="blog?.author + ' ' + blog?.date"
        class="w-100vw rounded-0"
        @click="$router.push(`/blogs/${blog.id}`)"
      >
      </ACard>
    </div>
    <ABtn v-if="user.is" class="w-full" @click="newBlog">new blog</ABtn>
  </div>
</template>
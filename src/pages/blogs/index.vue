<script setup lang="ts">
import { blogs } from "../../composables/useBlog"
</script>
<template>
  <div>
    <h1>My Blog</h1>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        <router-link :to="`/blogs/${blog.id}`">
          {{ blog.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
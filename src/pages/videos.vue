<script setup lang="ts">
import { prefers } from "../stores"
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <div>
    <div v-if="prefers.youtubeAccess" class="px-0 md:px-12 lg:px-24 xl:px-48 bg-black min-w-xs">
      <YoutubePlayer />
    </div>
    <div v-else class="bg-black min-w-xs px-0 md:px-12 lg:px-24 xl:px-48">
      <IpfsPlayer />
    </div>
    <div class="bg-white dark:bg-gray-800 text-center text-gray-700 dark:text-gray-200 grid grid-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-0 sm:px-2 md:px-4 min-w-xs place-content-center">
      <YoutubeVideos />
    </div>
    <div class="text-center text-blue-500 dark:text-gray-300">Built {{ timeAgo }}</div>
  </div>
</template>

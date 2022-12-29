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
    <div v-if="prefers.youtubeAccess" class="bg-black min-w-xs md:px-12 lg:px-24 xl:px-48">
      <YoutubePlayer />
    </div>
    <div v-else class="bg-black min-w-xs md:px-12 lg:px-24 xl:px-48">
      <IpfsPlayer />
    </div>
    <div class="bg-white dark:bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm:px-2 sm:gap-4 md:px-4 md:gap-6 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 xl:grid-cols-4 text-center text-gray-700 dark:text-gray-200">
      <YoutubeVideos />
    </div>
    <div class="text-center text-blue-500">Built {{ timeAgo }}</div>
  </div>
</template>

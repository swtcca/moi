<script setup lang="ts">
import YoutubeVideo from './YoutubeVideo.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
import useVideoSearch from "../composables/useVideoSearch"
import { prefers } from "../stores"
const { getYoutubeVideos  } = useYoutubeVideos()
const { videosMatchingSearchQuery  } = useVideoSearch()
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
setInterval(() => getYoutubeVideos(), 1000 * 60 * 60)
getYoutubeVideos()
</script>

<template>
  <div>
    <div v-if="prefers.youtubeAccess" class="px-0 md:px-12 lg:px-24 xl:px-48 bg-black min-w-xs">
      <YoutubePlayer />
    </div>
    <div v-else class="bg-black min-w-xs px-0 md:px-12 lg:px-24 xl:px-48">
      <IpfsPlayer />
    </div>
    <div class="bg-white dark:bg-gray-800 text-center grid grid-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-0 sm:px-2 md:px-4 min-w-xs place-content-center">
      <div v-for="video in videosMatchingSearchQuery" :key="video.videoId" class="mx-auto">
        <YoutubeVideo :video="video" />
      </div>
    </div>
    <div class="text-center">Built {{ timeAgo }}</div>
  </div>
</template>

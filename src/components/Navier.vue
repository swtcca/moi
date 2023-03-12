<script setup lang="ts">
import { prefers, playlist } from "../stores"
import { useRoute } from 'vue-router'
import { toggleDark } from '../composables/dark'
import { useFullscreen } from '@vueuse/core'
import { class_font, toggleFonts } from '../composables/useFont'
// const { toggle } = useFullscreen(document.body)
const navier = ref<HTMLElement | null>(null)
const { toggle } = useFullscreen(navier.value?.parentNode)
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const route = useRoute()
const location_origin = ref(location.origin)
const flag_playlist = ref(false)
const togglePlayList = useToggle(flag_playlist)
const route_videos = computed(() => /videos/.test(route.path))
const show = reactive({
  graph: false,
  log: false,
  share: false,
  info: false,
  settings: false,
})
watch(show, (value, old_value) => {
  if (value.settings && !old_value.settings) {
    prefers.save()
  } else {
    console.log(`not settings`)
  }
})
watch(class_font, () => console.log(class_font.value))
//    <button :title="t('button.info')" @click="show.info = !show.info">
//      <ph-info />
//    </button>
//  <UiLayer :open="show.info" @close="show.info=false">
//    <ShowInfo />
//  </UiLayer>
//    <button class="i-ph-playlist" v-if="route_videos" :title="t('button.playlist')" @click="() => togglePlayList()">
//    </button>

//  <nav ref="navier" class="grid-row grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 text-4xl place-items-center bg-light-300 dark-bg-dark-400">
//    <button class="i-ph-sun dark:i-ph-moon" :title="t('button.toggle_dark')" @click="() => toggleDark()">
//    </button>
//    <button class="i-mdi-fullscreen" :title="t('button.toggle_fullscreen')" @click="() => toggle()">
//    </button>
//    <button ref="language" class="i-ph-translate" :title="t('button.toggle_langs')" @click="toggleLocales">
//    </button>
//    <button ref="font" class="i-carbon-text-font" :title="t('button.toggle_fonts')" @click="toggleFonts">
//    </button>
//    <button class="i-ph-gear" :title="t('button.settings')" @click="show.settings = !show.settings">
//    </button>
//    <router-link to="/videos/" class="i-ph-video-camera"></router-link>
//    <router-link to="/openai/" class="i-logos-openai-icon"></router-link>
//    <button class="i-mdi-graph-outline" v-if="/localhost|127.0.0.1/.test(location_origin)" :title="t('button.graph')" @click="show.graph = !show.graph">
//    </button>
//    <button :title="t('button.relays')">
//      <GunRelay />
//    </button>
//    <router-link to="/upload/" v-if="false" class="i-simple-icons-ipfs">
//    </router-link>
//    <router-link to="/wallets/" class="i-ph-wallet">
//    </router-link>
//    <router-link to="/nfts/">
//      NFT
//    </router-link>
//  </nav>
</script>

<template>
  <nav ref="navier" class="flex flex-col items-center bg-light-300 dark-bg-dark-400">
    <div class="flex flex-wrap items-center gap-2 p-4">
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.toggle_dark')" @click="() => toggleDark()">
        <div class="text-2xl">
          <div class="i-ph-sun"></div>
        </div>
      </div>
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.toggle_fullscreen')" @click="() => toggle()">
        <div class="text-2xl">
          <div class="i-mdi-fullscreen"></div>
        </div>
      </div>
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.toggle_langs')" @click="toggleLocales">
        <div class="text-2xl">
          <div class="i-ph-translate"></div>
        </div>
      </div>
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.toggle_fonts')" @click="toggleFonts">
        <div class="text-2xl">
          <div class="i-carbon-text-font"></div>
        </div>
      </div>
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.settings')" @click="show.settings = !show.settings">
        <div class="text-2xl">
          <div class="i-ph-gear"></div>
        </div>
      </div>
      <router-link to="/file/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg">
        <div class="text-2xl">
          <div class="i-ph-file"></div>
        </div>
      </router-link>
      <router-link to="/my/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg">
        <div class="text-2xl">
          <div class="i-ph-user"></div>
        </div>
      </router-link>
      <router-link to="/users/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg">
        <div class="text-2xl">
          <div class="i-ph-users"></div>
        </div>
      </router-link>
      <router-link to="/videos/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" >
        <div class="text-2xl">
          <div class="i-ph-video-camera"></div>
        </div>
      </router-link>
      <router-link to="/openai/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" >
        <div class="text-2xl">
          <div class="i-logos-openai-icon"></div>
        </div>
      </router-link>
      <div v-if="/localhost|127.0.0.1/.test(location_origin)" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.graph')" @click="show.graph = !show.graph">
        <div class="text-2xl">
          <div class="i-mdi-graph-outline"></div>
        </div>
      </div>
      <div class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" :title="t('button.relays')">
        <div class="text-2xl">
          <GunRelay />
        </div>
      </div>
      <router-link to="/upload/" v-if="false" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg" >
        <div class="text-2xl">
          <div class="i-simple-icons-ipfs"></div>
        </div>
      </router-link>
      <router-link to="/wallets/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg">
        <div class="text-2xl">
          <div class="i-ph-wallet"></div>
        </div>
      </router-link>
      <router-link to="/nfts/" class="cursor-pointer flex-1 flex flex-col items-center p-4 relative dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg">
        <div class="text-2xl">
        NFT
        </div>
      </router-link>
    </div>
  </nav>
  <UiLayer :open="show.graph" @close="show.graph=false">
    <GunGraph />
  </UiLayer>
  <UiLayer :open="show.settings" @close="show.settings=false">
    <Settings />
  </UiLayer>
  <div class="grid grid-col place-content-center" v-if="flag_playlist">
    <div class="mt-8 max-w-lg">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark-text-gray-500">
        <ol class="list-decimal">
          <li v-for="video of playlist.playlist" :key="video.videoId">
            {{ video.videoId }} {{ video?.channel?.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply text-2xl
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

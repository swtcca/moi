
<script setup lang="ts">
import { prefers } from "../stores"
// import { SwitchGroup, SwitchLabel, Switch } from '@headlessui/vue'
import { ASwitch, ARadio, AInput } from "anu-vue"
const playback_rates = [1, 1.25, 1.5, 1.75, 2]
const { t } = useI18n()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 text-gray-700 dark-text-gray-500">
    <label>
      <ASwitch
        v-model="prefers.youtubeAccess"
        on-icon="i-bx-check"
        off-icon="i-bx-x"
        color="success"
        class="rounded-full"
        :label="t('pages.youtube_access')"
      />
    </label>
    <label class="block">
      <span class="i-ph-video-camera" /><span>{{ t('pages.youtube_playback_rate') }} {{ prefers.youtube_playback_rate }}</span>
      <div class="flex justify-between">
        <ARadio
          v-model="prefers.youtube_playback_rate"
          name="playrate"
          value="1"
        />
        <ARadio
          v-model="prefers.youtube_playback_rate"
          name="playrate"
          value="1.25"
        />
        <ARadio
          v-model="prefers.youtube_playback_rate"
          name="playrate"
          value="1.5"
        />
        <ARadio
          v-model="prefers.youtube_playback_rate"
          name="playrate"
          value="1.75"
        />
        <ARadio
          v-model="prefers.youtube_playback_rate"
          name="playrate"
          value="2"
        />
      </div>
    </label>
    <label v-show="prefers.youtubeAccess" class="block">
      <span class="i-logos-youtube-icon" /><span>{{ t('pages.youtube_per_query') }} </span>
      <AInput type="number" input-wrapper-classes="px-0" v-model="prefers.maxResults" />
    </label>
    <label class="block">
      <span class="i-simple-icons-ipfs" /><span> {{ t('pages.ipfs_gateway') }}</span>
      <AInput v-model="prefers.ipfsGateway" />
    </label>
  </div>
</template>

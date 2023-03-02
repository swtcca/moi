
<script setup lang="ts">
import { prefers } from "../stores"
import { SwitchGroup, SwitchLabel, Switch } from '@headlessui/vue'
// import { ASwitch, ABtn } from "anu-vue"
//   <label>
//     <ASwitch
//       v-model="prefers.youtubeAccess"
//       on-icon="i-bx-check"
//       off-icon="i-bx-x"
//       color="success"
//       class="rounded-full"
//     />
//   </label>
const { t } = useI18n()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 text-gray-700 dark-text-gray-500">
     <label class="block">
       <SwitchGroup>
         <div class="flex items-center">
           <SwitchLabel class="mr-4">{{ t('pages.youtube_access') }}</SwitchLabel>
           <Switch
         v-model="prefers.youtubeAccess"
         :class="prefers.youtubeAccess ? 'bg-teal-700' : 'bg-teal-200'"
         class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
       >
         <span class="sr-only">Use setting</span>
         <span
           aria-hidden="true"
           :class="prefers.youtubeAccess ? 'translate-x-9' : 'translate-x-0'"
           class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
         />
       </Switch>
         </div>
       </SwitchGroup>
     </label>
    <label v-show="prefers.youtubeAccess" class="block">
      <span> {{ t('pages.youtube_per_query') }} </span>
      <input type="text" v-model.number="prefers.maxResults" class="mt-1 block w-full" :placeholder="t('pages.youtube_per_query')" />
    </label>
    <label class="block">
      <span>{{ t('pages.ipfs_gateway') }}</span>
      <input type="text" v-model.lazy="prefers.ipfsGateway" class="mt-1 block w-full" placeholder="ipfs gateway url" />
    </label>
    <label class="block">
      <span>{{ t('pages.youtube_playback_rate') }}</span>
      <input type="number" v-model.number="prefers.playbackRate"  class="mt-1 block w-full" placeholder="0.5 0.75 1.0 1.25 1.5 1.75 2.0" />
    </label>
  </div>
</template>

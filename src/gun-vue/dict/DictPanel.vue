<script setup>
import { dictLang, languages, useDictLangs } from '#composables'

const langs = useDictLangs()

defineEmits(['home', 'my', 'authors'])
const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-wrap.w-full.items-center.bg-light-900.dark-bg-dark-600.gap-1
  .p-2.cursor-pointer.font-bold(@click="$emit('home')") {{ t('customize.dict_dictionary') }}
  slot
  .flex-1
  .flex.flex-wrap.gap-2.m-1
    button.button.uppercase.cursor-pointer.text-sm.flex(
      v-for="(num, lang) in langs"
      :key="lang" 
      :style="{ order: -num }"
      :class="{ active: lang == dictLang }"
      @click="dictLang = lang"
      ) 
        .font-bold {{ lang }} 
        .ml-1 {{ num }}
  select.m-2.p-2.w-30.rounded-lg.dark-bg-dark-200(v-model="dictLang")
    option(
      v-for="lang in languages" 
      :key="lang"
      :value="lang.code"
      ) {{ lang.native }}
</template>
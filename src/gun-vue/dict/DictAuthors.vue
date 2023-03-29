<script setup>
import { useDictAuthors } from '#composables'
const authors = useDictAuthors()

defineEmits(['author'])
const { t } = useI18n()
</script>

<template lang="pug">
.p-4
  .text-xl  {{ t('customize.dict_authors') }}
  .flex.flex-wrap 
    .p-2(
      v-for="(words, author) in authors"
      :key="author" 
      @click="$emit('author', author)"
    )
      account-badge(:pub="author")
        .pr-2.font-bold {{ Object.keys(words).length }}
</template>
<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-col
  .text-xl.p-4 {{ t('gunvue.my_wallets') }}
  gift-wallets(:pub="user.pub")
</template>
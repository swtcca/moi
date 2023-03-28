<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
const { t } = useI18n()
</script>

<template lang="pug">
.flex.items-center.relative.flex-col.w-full
  .flex.flex-wrap.justify-around.bg-light-800.w-full.dark-bg-dark-500
    router-link.link(to="/my/") {{ t('customize.my_home') }}
    router-link.link(to="/my/profile/") {{ t('customize.my_profile') }}
    router-link.link(to="/my/mates/") {{ t('customize.my_mates') }}
    router-link.link(to="/my/wallets/") {{ t('customize.my_wallets') }}
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component(:is="Component")
</template> 

<style lang="postcss" scoped>
.link {
  @apply bg-light-900 p-2 transition dark-bg-dark-200
}

.link:hover {
  @apply bg-light-400 dark-bg-dark-600
}

.link.router-link-exact-active {
  @apply font-bold bg-light-400 dark-bg-dark-900
}
</style>
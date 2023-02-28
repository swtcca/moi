
<script setup lang="ts">
import Preferences from "./Preferences.vue"
import TokenManager from "./TokenManager.vue"
const { t } = useI18n()
</script>

<template>
  <div class="grid grid-col place-content-center p-8">
    <Preferences />
    <TokenManager />
  </div>
</template>

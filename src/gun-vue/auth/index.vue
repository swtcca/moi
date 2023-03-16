<script setup>
import { useUser } from '#composables';

const { user } = useUser()
const { t } = useI18n()
</script>

<template lang="pug">
.p-4(v-if="user?.pub") 
  .text-2xl {{ t('gunvue.auth_authed') }} 
    span.font-bold {{ user.name }}
  router-link(to="/my/") {{ t('gunvue.auth_goprofile') }}
.p-4(v-else)
  auth-form
</template>

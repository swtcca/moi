<script setup lang="ts">
import { ref } from "vue"
import { useUser } from "../gun-vue/composables"
import { tokens, save_tokens, get_tokens } from "../composables/tokenManager"
// import { AInput } from "anu-vue"

const { user } = useUser()
const { t } = useI18n()

const input_type = ref("password")
const toggle_type = () => {
  if (input_type.value === "password") {
    input_type.value = "text"
  } else {
    input_type.value = "password"
  }
}
onBeforeMount(() => { if (user.is) { get_tokens() } })
</script>

<template>
  <div v-if="user.is" class="py-8 grid grid-cols-1 gap-6 text-gray-700 dark-text-gray-500">
    <h3 class="text-xl">
      <div class="i-mdi-encryption-secure-outline"></div>
      Token Manager
      <div class="i-carbon-save text-2xl text-blue-500" @click="save_tokens"></div>
      <div :class="input_type === 'password' ? 'i-ph-eye-light' : 'i-ph-eye-slash'" class="text-2xl" @click="toggle_type"></div>
    </h3>
    <div v-for="token of Object.keys(tokens)" :key="token">
      <div class="w-full">
        <label>{{ token }}</label>
        <AInput :spacing="0" :type="input_type" v-model="tokens[token]" input-wrapper-classes="px-0" />
      </div>
    </div>
  </div>
</template>

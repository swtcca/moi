<script setup>
import { ref, watch } from "vue"
import { apiKey, openai_create_completion, openai_create_image } from "../composables/openai"
import { read_user_safe, save_user_safe } from "../composables/userSafe"
import { useTextareaAutosize } from '@vueuse/core'

const api_in_gun = ref(false)
watch(apiKey, () => {
  console.log(`openai token changed`)
  api_in_gun.value = false
})

const get_token = async () => {
  const key = await read_user_safe(["moiapp", "tokens", "openai"], {encrypt: true})
  if (key) {
    if (!api_in_gun.value) {
      apiKey.value = key 
      // api_in_gun.value = true
    }
  }
}
const save_token = async () => {
  save_user_safe(apiKey, ["moiapp", "tokens", "openai"], {encrypt: true})
  api_in_gun.value = true
}
const { textarea: textarea_ask, input: ask } = useTextareaAutosize()
const { input: answer } = useTextareaAutosize()
const show_chat = ref(true)
const show_draw = ref(true)
const image = ref('')
// const image = ref('https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg')
const openai_chat = async () => {
  get_token()
  try {
    const completion = await openai_create_completion(ask.value)
    answer.value = completion.data.choices[0].text.trim()
    show_chat.value = true
    show_draw.value = false
    if (!api_in_gun.value) save_token()
  } catch (e) {}
}
const openai_draw = async () => {
  get_token()
  try {
    const response = await openai_create_image(ask.value)
    image.value = response.data.data[0].url
    show_chat.value = false
    show_draw.value = true
    if (!api_in_gun.value) save_token()
  } catch (e) {}
}
get_token()
const { t } = useI18n()
//      <svg v-else width="500" height="210" class="absolute">
//        <polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:red;stroke:red;stroke-width:5;fill-rule:nonzero;" />
//      </svg>
</script>

<template>
  <div class="container mx-auto pt-12 px-1 md:px-4 lg:px-12">
    <div v-if="!api_in_gun">
      <label>OPENAI {{ t('token') }}</label>
      <AInput placeholder="t('placeholder.openai_token')" input-wrapper-classes="px-0" type="password" v-model="apiKey" />
    </div>
    <div class="my-4">
      <label>{{ t('ask') }} OPENAI</label>
      <ATextarea ref="textarea_ask" v-model="ask" :placeholder="t('placeholder.openai_input')"></ATextarea>
    </div>
    <div class="flex justify-around my-4">
      <ABtn @click="openai_chat">{{ t('button.openai_chat') }}</ABtn>
      <ABtn @click="openai_draw">{{ t('button.openai_draw') }}</ABtn>
    </div>
    <div v-if="show_chat">
      <ATextarea v-model="answer" :placeholder="t('placeholder.openai_output')"></ATextarea>
    </div>
    <div v-if="show_draw" class="flex place-content-center">
      <img v-if="image" class="mx-auto ring-1 absolute z-200" :src="image" />
    </div>
  </div>
</template>
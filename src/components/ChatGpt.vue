<script setup>
import { ref } from "vue"
import { apiKey, openai_create_completion, openai_create_image } from "../composables/openai"
import { useTextareaAutosize } from '@vueuse/core'
import { currentRoom, useUser, useGun, SEA } from "#composables" // current room

const { user } = useUser()
const api_in_gun = ref(false)
let pair
try {
  pair = user.pair()
  // console.log(user.db)
  if (user.safe?.moiapp_tokens_openai) {
    SEA.decrypt(user.safe.moiapp_tokens_openai, pair.epriv).then(decrypted => {
      api_in_gun.value = true
      apiKey.value = decrypted
    })
  } 
} catch (e) {}
const save_token = async () => {
  if (user.initiated) {
    const encrypted = await SEA.encrypt(apiKey.value, pair)
    user.db.get('safe').get(["moiapp", "tokens", "openai"].join("_")).put(encrypted)
  }
}
const { textarea: textarea_ask, input: ask } = useTextareaAutosize()
const { textarea: textarea_answer, input: answer } = useTextareaAutosize()
ask.value = 'tell me something about amoxicillian'
answer.value = 'openai answers will show here'
const show_chat = ref(true)
const show_draw = ref(true)
const image = ref('')
// const image = ref('https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg')
const openai_chat = async () => {
  try {
    const completion = await openai_create_completion(ask.value)
    answer.value = completion.data.choices[0].text
    show_chat.value = true
    show_draw.value = false
    if (!api_in_gun.value) save_token()
  } catch (e) {}
}
const openai_draw = async () => {
  try {
    const response = await openai_create_image(ask.value)
    image.value = response.data.data[0].url
    show_chat.value = false
    show_draw.value = true
    if (!api_in_gun.value) save_token()
  } catch (e) {}
}
//      <svg v-else width="500" height="210" class="absolute">
//        <polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:red;stroke:red;stroke-width:5;fill-rule:nonzero;" />
//      </svg>
</script>

<template>
  <div class="container mx-auto pt-12">
    <div v-if="!api_in_gun">
      <label>OPENAPI TOKEN</label>
      <input placeholder="openai token here, required" class="w-full ring-1" type="password" v-model="apiKey" />
    </div>
    <div class="my-4">
      <label>ASK OPENAI</label>
      <textarea ref="textarea_ask" class="w-full ring-1" v-model="ask"></textarea>
    </div>
    <div class="flex items-between my-4">
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_chat">CHAT</button>
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_draw">DRAW</button>
    </div>
    <div v-if="show_chat">
      <textarea rows="6" class="w-full ring-1" v-model="answer"></textarea>
    </div>
    <div v-if="show_draw" class="flex place-content-center">
      <img v-if="image" class="mx-auto ring-1 absolute z-200" :src="image" />
      <div v-else>openai images will show here</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { apiKey, openai_create_completion, openai_create_image } from "../composables/openai"

const ask = ref('tell me something about amoxicillian')
const answer = ref('openai answered')
const draw = ref('https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg')
const openai_chat = async () => {
  try {
    const completion = await openai_create_completion(ask.value)
    answer.value = completion.data.choices[0].text
  } catch (e) {}
}
const openai_draw = async () => {
  try {
    const response = await openai_create_image(ask.value)
    draw.value = response.data.data[0].url
  } catch (e) {}
}
</script>

<template>
  <div class="flex flex-col place-content-center pt-10">
    <div>
      <input placeholder="openai token here, required" class="w-full ring-1" type="password" v-model="apiKey" />
    </div>
    <div>
      <textarea class="w-full ring-1" v-model="ask"></textarea>
    </div>
    <div class="flex items-between">
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_chat">chat</button>
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_draw">draw</button>
    </div>
    <div>
      <textarea class="w-full ring-1" v-model="answer"></textarea>
    </div>
    <div>
      <img class="mx-auto ring-1 w-512px h-512px" :src="draw" />
    </div>
  </div>
</template>
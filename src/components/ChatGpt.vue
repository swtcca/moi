<script setup>
import { ref } from "vue"
import { apiKey, openai_create_completion, openai_create_image } from "../composables/openai"
import { useTextareaAutosize } from '@vueuse/core'
import { currentRoom } from "#composables" // current room

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
  } catch (e) {}
}
const openai_draw = async () => {
  try {
    const response = await openai_create_image(ask.value)
    image.value = response.data.data[0].url
    show_chat.value = false
    show_draw.value = true
  } catch (e) {}
}
//      <svg v-else width="500" height="210" class="absolute">
//        <polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:red;stroke:red;stroke-width:5;fill-rule:nonzero;" />
//      </svg>
</script>

<template>
  <div class="container mx-auto pt-10">
    <div>
      <input placeholder="openai token here, required" class="w-full ring-1" type="password" v-model="apiKey" />
    </div>
    <div>
      <textarea ref="textarea_ask" class="w-full ring-1" v-model="ask"></textarea>
    </div>
    <div class="flex items-between">
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_chat">chat</button>
      <button class="mx-auto p-2 rounded ring-2 text-right" @click="openai_draw">draw</button>
    </div>
    <div v-if="show_chat">
      <textarea rows="10" class="w-full ring-1" v-model="answer"></textarea>
    </div>
    <div v-if="show_draw">
      <img v-if="image" class="mx-auto ring-1 absolute z-200" :src="image" />
      <div v-else>openai images will show here</div>
    </div>
  </div>
</template>
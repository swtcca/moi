<script setup>
import { useUser, SEA, createRoom, useBackground, enterRoom } from '#composables';
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['room'])

const { user } = useUser()

const enabled = computed(() => Object.keys(user.safe?.rooms).length < 2 || user.safe?.wallets?.jingtum?.activated && Object.keys(user.safe?.rooms).length < 5)

const create = reactive({
  pair: null,
  name: ''
})

async function genPair() {
  let pair = await SEA.pair()
  create.pair = pair
}

function reset() {
  // emit('room', create.pair.pub)
  // enterRoom(create.pair.pub)
  create.pair = null
  create.name = ''
}

function createIt() {
  createRoom(create);
  reset()
}

const bg = computed(() => useBackground({ pub: create.pair?.pub, size: 620 }))

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.bg-cover.rounded-2xl.p-8.max-w-620px.bg-light-800.dark-bg-dark-500.justify-center(
  v-if="user.pub" 
  :style="{ ...bg }"
  )
  .flex
    button.button.m-2.flex-1(@click="genPair()", :disabled="!enabled" ) {{ t('gunvue.room_generate') }}
    button.button.m-2(
      v-if="create.pair" 
      @click="reset()" 
      ) {{ t('gunvue.reset') }}
  input.p-2.m-2.rounded-xl.dark-bg-dark-200(
    v-if="create.pair" 
    v-model="create.name" 
    type="text" 
    :placeholder="t('gunvue.room_new_name')"
    )
  transition(name="fade")
    button.button.m-2.flex-1(
      v-if="create.pair && create.name" 
      @click="createIt()" 
      ) {{ t('gunvue.room_add') }}

</template> 
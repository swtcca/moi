<script setup lang="ts">
import { watchDebounced, } from '@vueuse/core';
import { ref, watch, nextTick } from 'vue'
import VirtualList from 'vue3-virtual-scroll-list';
import ChatMessage from './ChatMessage.vue';
import type { Message } from './useChat';


const props = defineProps<{
  messages?: Message[]
}>()


const list = ref();

watchDebounced(() => props.messages, () => {
  nextTick(() => {
    list.value.scrollToBottom()
  });
}, { deep: true, debounce: 300 });

</script>

<template lang="pug">
virtual-list.flex.flex-col.bg-opacity-80.p-2.gap-1.overflow-y-scroll.scroll-smooth.flex-auto(
  ref="list"
  :data-key="'timestamp'"
  :data-sources="messages"
  :data-component="ChatMessage"
  )
</template>
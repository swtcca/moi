<script setup>
const props = defineProps({
  icon: {
    default: 'space',
    type: String
  }
})
</script>

<template lang="pug">
.i-ph-house-simple(v-if="icon.toLowerCase().includes('home') || icon == '/'")
.i-ph-hands-clapping(v-if="icon.toLowerCase().includes('space')")
.i-ph-newspaper(v-if="icon.toLowerCase().includes('posts')")
.i-ph-house(v-if="icon.toLowerCase().includes('rooms')")
.i-la-broadcast-tower(v-if="icon.toLowerCase().includes('topics')")
.i-ph-users(v-if="icon.toLowerCase().includes('users')")
.i-ph-books(v-if="icon.toLowerCase().includes('dict')")
.i-la-toolbox(v-if="icon.toLowerCase().includes('projects')")
.i-la-sun(v-if="icon.toLowerCase().includes('gifts')")
</template>
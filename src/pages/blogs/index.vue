<script setup lang="ts">
import { blogs } from "../../composables/useBlog"

const selected = ref(null)

watch(selected, (value, old_value) => {
  console.log(value)
  console.log(old_value)
})

setTimeout(() => blogs.value.unshift(
  {
    id: "4",
    title: "My Forth Blog Post",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "John Doe",
    date: "2023-03-06"
  })
, 3000)

</script>
<template>
  <div class="grid gap-12 place-items-center text-2xl">
    <h1 class="text-6xl">My Blog</h1>
    <ACard>
      <AList
        v-model="selected"
        :items="blogs"
        variant="light"
        class="a-list-items-pill"
      >
        <template #after>
           {{ selected }} 
        </template>
      </AList>
    </Acard>
  </div>
</template>
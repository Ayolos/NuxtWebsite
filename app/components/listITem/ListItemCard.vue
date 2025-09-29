<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: false,
  }
})

</script>

<template>
  <div class="flex bg-[#080E21] flex-col gap-3 shadow-xl border border-slate-800 rounded-md p-5">
    <p class="text-purple-500 text-xs">
      <slot name="date"></slot>
    </p>
    <h2 class="text-white text-sm">
      <slot name="title"></slot>
    </h2>
    <ul v-if="props.type === 'list'" class="list-disc list-outside pl-3.5 text-gray-500  text-sm marker:text-purple-500">
      <slot name="lists"></slot>
    </ul>
    <p v-else class="text-slate-400 text-sm">
      <slot name="description"></slot>
    </p>
    <slot name="extra"></slot>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {computed} from "vue";

const props = defineProps({
  border: Boolean,
});

const borderClass = computed(() => {
  return props.border ? 'border-b border-slate-800' : '';
});

</script>

<template>
  <div :class="borderClass" class="flex sm:flex-row flex-col items-center gap-6 py-6 px-12">
    <label class="text-gray-400 text-sm">
      <slot name="label"></slot>
    </label>
    <p class="text-white">
      <slot name="content"></slot>
    </p>
  </div>
</template>

<style scoped>

</style>
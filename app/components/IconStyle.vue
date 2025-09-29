<script setup>
import {computed} from "vue";

const props = defineProps({
  padding: {
    type: Number,
  },
});

const paddingClass = computed(() => {
  return props.padding ? `p-${props.padding}` : 'p-2';
});


</script>

<template>
  <div
      :class="paddingClass"
      class="bg-background-light flex lg:rounded-r-xl rounded-xl shadow-xl border border-neutral-700">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
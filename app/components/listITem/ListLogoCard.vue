<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  icon: String,
  text: String
});

</script>

<template>
  <div class="bg-background-light border border-neutral-700 shadow-xl p-8 rounded-md w-full h-full aspect-square relative group transition duration-500 hover:scale-110">
    <!-- Div qui s'affiche au hover -->
    <div class="absolute flex justify-center items-center rounded-md inset-0 bg-black/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <p class="text-white text-xl">{{ props.text }}</p>
    </div>
    <!-- Icône -->
    <iconify-icon :icon="props.icon" class="text-white h-full w-full"></iconify-icon>
  </div>
</template>

<style scoped>

</style>
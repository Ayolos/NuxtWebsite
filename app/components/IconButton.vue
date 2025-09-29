<script setup>
import { defineProps } from 'vue';
import {Icon as IconifyIcon} from "@iconify/vue";

const props = defineProps(
    {
      href: {
        type: String,
        required: false,
      },
      icon: {
        type: String,
        required: true,
      }
    }
);
</script>

<template>
  <a :href="props.href" class="flex items-center justify-center rounded-lg text-item border border-border text-test hover:bg-slate-900 aspect-square p-2">
    <iconify-icon :icon="props.icon" class="text-2xl"></iconify-icon>
  </a>
</template>

<style scoped>

</style>
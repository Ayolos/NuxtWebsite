<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps(
    {
        text: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 'sm'
        }
    }
);

const sizeClass = computed(() => {
    if (props.size === 'sm') {
        return 'text-sm';
    } else if (props.size === 'md') {
        return 'text-md';
    } else if (props.size === 'lg') {
        return 'text-lg';
    }else {
        return 'text-sm';
    }
});
</script>

<template>
  <NuxtLink
      active-class="pb-1 text-purple-500"
      :to="props.path"
      :class="sizeClass"
      class="hover:text-white text-test"
  >{{ props.text }}</NuxtLink>
</template>

<style scoped>

</style>
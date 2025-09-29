<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  typeComponent: String,
  bgColor: String,
  rounded: String,
  borderSize: String,
  href: String,
  download: String
})

const roundedClass = computed(() => {
  return props.rounded ? 'rounded-' + props.rounded : 'rounded-lg';
})

const borderSizeClass = computed(() => {
  return props.borderSize ? `p-${props.borderSize}` : 'p-[1px]';
})

</script>

<template>
  <component :is="typeComponent"
             :href="props.href" download="download"
             :class="[roundedClass, borderSizeClass]"
             class="my-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
    <span
        :class="[props.bgColor, roundedClass]"
        class="border-1 border-transparent bg-clip-padding flex flex-row justify-center gap-2 text-sm py-3 px-8 transition-all duration-300 ease-in-out hover:bg-item hover:text-background">
      <span class="flex flex-row gap-4 items-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <slot></slot>
      </span>
    </span>
  </component>
</template>

<style scoped>

</style>
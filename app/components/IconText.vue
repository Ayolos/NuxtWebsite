<script setup>
import IconStyle from "@/components/IconStyle.vue";

const props = defineProps({
  icon: String
})
</script>

<template>
  <div class="flex flex-row gap-6 items-center text-xl">
    <icon-style :padding="2">
      <UIcon class="md:h-8 md:w-8 w-4 h-4 text-purple-500" :name="props.icon"></UIcon>
    </icon-style>
    <div class="flex flex-col gap-1 w-max">
      <label class="lg:text-sm text-xs text-gray-500">
        <slot name="label"></slot>
      </label>
      <p class="text-white lg:text-lg text-base">
        <slot name="content"></slot>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">

const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: 'mdi:language-html5'
  }
})

</script>

<template>
  <div>
    <div class="mb-2">
      <slot name="icon">
      </slot>
    </div>
    <h4 class="text-white font-semibold truncate">
      <slot name="title"></slot>
    </h4>
    <p class="text-slate-500 text-[15px] text-pretty text-muted mt-1">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<style scoped>

</style>
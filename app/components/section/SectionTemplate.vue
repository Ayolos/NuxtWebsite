<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bordered: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <section :id="props.id" class="px-10 border-b border-slate-800 isolate bg-gradient-to-b from-slate-900/40 to-slate-950">
    <div class="w-full lg:gap-18 2xl:w-[1500px] 2xl:mx-auto py-30"
          :class="props.bordered ? 'border-x border-slate-800' : ''"
    >
      <h1 class="text-white text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">
        <slot name="title"></slot>
      </h1>
      <p class="text-slate-400 text-base sm:text-lg text-muted text-balance mt-3 text-center">
        <slot name="description"></slot>
      </p>
      <slot></slot>
    </div>

  </section>
</template>

<style scoped>

</style>
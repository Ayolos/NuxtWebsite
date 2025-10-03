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
  <section :id="props.id" class="px-10 border-b dark:border-slate-800 border-slate-200 isolate bg-gradient-to-b dark:from-slate-900/40 from-slate-200/40 dark:to-slate-950 to-slate-100">
    <div class="w-full lg:gap-18 2xl:w-[1500px] 2xl:mx-auto py-30"
          :class="props.bordered ? 'border-x dark:border-slate-800 border-slate-300' : ''"
    >
      <h1 class="dark:text-white text-black text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">
        <slot name="title"></slot>
      </h1>
      <p class="dark:text-slate-400 text-slate-500 text-base sm:text-lg text-muted text-balance mt-3 text-center">
        <slot name="description"></slot>
      </p>
      <slot></slot>
    </div>

  </section>
</template>

<style scoped>

</style>
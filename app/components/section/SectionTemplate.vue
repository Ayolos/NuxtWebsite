<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'col',
    validator: (value: string) => ['col', 'row', 'reverse-row'].includes(value),
  },
  basis: {
    type: String,
    required: false,
    default: '1/2',
  },
  bordered: {
    type: Boolean,
    required: false,
    default: false,
  },
  bottomBorder: {
    type: Boolean,
    required: false,
    default: true,
  },
  align: {
    type: String,
    required: false,
    default: 'center',
    validator: (value: string) => ['left', 'center', 'right'].includes(value),
  },
});

const alignClass = computed(() => {
  switch (props.align) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
    default:
      return 'text-center';
  }
});

const basisClass = computed(() => {
  // Utiliser un objet de mapping avec les classes complètes
  const basisMap: Record<string, string> = {
    '1/2': 'lg:w-1/2',
    '1/3': 'lg:w-1/3',
    '2/3': 'lg:w-2/3',
    '1/4': 'lg:w-1/4',
    '3/4': 'lg:w-3/4',
    'full': 'lg:w-full',
    'auto': 'lg:w-auto',
  };

  return basisMap[props.basis] || 'basis-2/3';
});

const typeClass = computed(() => {
  switch (props.type) {
    case 'col':
      return 'flex flex-col items-center';
    case 'row':
      return 'flex lg:flex-row flex-col items-center';
    case 'reverse-row':
      return 'flex flex-row-reverse items-center';
    default:
      return '';
  }
});

</script>

<template>
  <section :id="props.id"
           class="px-5 sm:px-10 dark:border-slate-800 border-slate-200 isolate bg-gradient-to-b dark:from-slate-900/40 to-40% from-slate-200/40 dark:to-slate-950 to-slate-50"
           :class="props.bottomBorder ? 'border-b' : ''"
  >
    <div class="w-full gap-18 2xl:w-[1500px] 2xl:mx-auto py-30"
          :class="[props.bordered ? 'border-x dark:border-slate-800 border-slate-200' : '', typeClass]"
    >
      <div class="w-full px-4" :class="[basisClass, alignClass]">
        <h1 class="dark:text-white text-black text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted">
          <slot name="title"></slot>
        </h1>
        <p class="dark:text-slate-400 text-slate-500 text-base sm:text-lg text-muted mt-6">
          <slot name="description"></slot>
        </p>
        <slot name="extra"></slot>
      </div>
      <slot class="w-full"></slot>
    </div>

  </section>
</template>

<style scoped>

</style>
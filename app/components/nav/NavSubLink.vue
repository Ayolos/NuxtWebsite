<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: 'i-heroicons-home-solid',
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

</script>

<template>
  <NuxtLink :to="props.to" class="flex group transition-colors duration-200 flex-row items-start gap-2 hover:bg-slate-900 py-3 px-2 rounded-md"
     :class="props.active ? 'bg-slate-900' : ''"
  >
    <div class="">
      <UIcon
          :name="props.icon"
          class="size-6 text-slate-400 group-hover:text-white transition-colors duration-200"
          :class="props.active ? 'text-white' : ''"
      />
    </div>
    <div>
      <h4 class="block text-sm text-white font-medium">{{ props.label }}</h4>
      <p class="text-sm text-slate-400">{{ props.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>
<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: String,
  modelValue: String // Update prop name for v-model
});

const emit = defineEmits(['update:modelValue']); // Define emit for v-model

const typeClass = computed(() => {
  if (props.type === 'textarea') {
    return 'h-48';
  }
  return '';
});

// Function to handle input change
const handleInput = (event) => {
  emit('update:modelValue', event.target.value); // Emit updated value
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label :for="props.value" class="dark:text-white text-black text-sm">
      <slot></slot>
    </label>
    <component
        :is="props.type === 'textarea' ? 'textarea' : 'input'"
        :class="typeClass"
        class="bg-transparent resize-none text-gray-400 border dark:border-slate-700 border-slate-300 focus:outline-none focus:ring-0 focus:border-purple-500 rounded-lg py-2 px-4"
        :type="props.type"
        :id="props.value"
        :value="props.modelValue"
        @input="handleInput"
    required
    />
  </div>
</template>

<style scoped>

</style>

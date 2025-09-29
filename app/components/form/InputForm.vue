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
    <label :for="props.value" class="text-white text-sm">
      <slot></slot>
    </label>
    <component
        :is="props.type === 'textarea' ? 'textarea' : 'input'"
        :class="typeClass"
        class="bg-transparent resize-none text-gray-400 border border-slate-700 focus:outline-none focus:ring-0 focus:border-purple-500 rounded-lg py-2 px-4"
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

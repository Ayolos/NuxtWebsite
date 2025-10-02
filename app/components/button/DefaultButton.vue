<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const props = defineProps({
  is: {
    type: String,
    default: 'button',
    validator: (value: string) => {
      return ['button', 'a', 'NuxtLink'].includes(value)
    },
  },
  href: String,
  to: [String, Object],
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'main',
    validator: (value: string) => {
      return ['main', 'secondary', 'danger'].includes(value)
    },
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => {
      return ['sm', 'md', 'lg'].includes(value)
    },
  },
})

const emit = defineEmits(['click'])

// Résoudre le composant NuxtLink si nécessaire
const componentType = computed(() => {
  if (props.is === 'NuxtLink') {
    return resolveComponent('NuxtLink')
  }
  return props.is
})

const componentProps = computed(() => {
  switch (props.is) {
    case 'a':
      return { href: props.href }
    case 'NuxtLink':
      return { to: props.to }
    case 'button':
      return { type: props.type }
    default:
      return {}
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'main':
      return 'bg-purple-950 hover:bg-purple-900 text-purple-400 border-purple-500'
    case 'secondary':
      return 'bg-transparent hover:bg-slate-800 text-slate-500 border-slate-800'
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return isIconOnly.value ? 'p-1.5' : 'px-3 py-1.5 text-sm'
    case 'md':
      return isIconOnly.value ? 'p-2' : 'px-4 py-2 text-base'
    case 'lg':
      return isIconOnly.value ? 'p-3' : 'px-5 py-3 text-lg'
    default:
      return ''
  }
})

const borderClass = computed(() => {
  return props.bordered ? 'border' : ''
})

const slots = useSlots()

// Détection bouton "icon-only"
const isIconOnly = computed(() => {
  return !slots.default && !!slots.icon
})

</script>

<template>
  <component
      :is="componentType"
      v-bind="componentProps"
      @click="emit('click')"
      :class="[colorClass, borderClass, sizeClass]"
      class="rounded-lg"
  >
    <div class="flex flex-row items-center gap-2">
      <slot />
      <slot name="icon" />
    </div>
  </component>
</template>
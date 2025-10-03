<script setup>
import {defineProps, onMounted, ref} from 'vue';
// import { gsap } from 'gsap';

const props = defineProps(
    {
        number: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        align: {
            type: String,
            default: 'center'
        }
    }
);

const numberElement = ref(null);

// onMounted(() => {
//   gsap.from(numberElement.value, {
//     innerText: 0,
//     duration: 1.5,
//     snap: {
//       innerText: 1
//     }
//   });
// });
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-start gap-4 items-center">
    <p ref="numberElement" class="text-6xl font-bold dark:text-white text-black number-animation">
      {{ props.number }}
    </p>
    <p class="text-md dark:text-gray-400 text-slate-500">
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped>

</style>
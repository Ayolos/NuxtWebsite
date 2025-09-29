
<template>

  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>

</template>

<script setup>
import { ref, nextTick } from "vue";

const isTransitioning = ref(false);
const tiles = ref(Array.from({ length: 5 }, (_, i) => i));

</script>

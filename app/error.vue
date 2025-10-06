<script setup lang="ts">
import type { NuxtError } from '#app'
import DefaultButton from "~/components/button/DefaultButton.vue";

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

// Désactive le layout
definePageMeta({
  layout: false
})

// --- synchronisation du mode clair/sombre sans module ---
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.classList.toggle('dark', savedTheme === 'dark')
})
</script>

<template>
  <Html>
  <Head>
    <Title>Erreur {{ error?.statusCode }}</Title>
  </Head>
  <Body>
  <div class="bg-slate-50 dark:bg-slate-950 h-screen flex justify-center items-center text-center text-slate-900 dark:text-slate-100">
    <div v-if="error">
      <h1 class="text-9xl font-bold">{{ error.statusCode }}</h1>
      <p class="text-lg text-slate-500 dark:text-slate-400">{{ error.message }}</p>
      <DefaultButton class="mt-6" @click="handleError" bordered>
        Retour à l'accueil
      </DefaultButton>
    </div>
  </div>
  </Body>
  </Html>
</template>

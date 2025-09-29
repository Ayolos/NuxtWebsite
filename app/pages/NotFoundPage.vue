<script setup>

import MainLayout from "@/layout/default.vue";
</script>

<template>
<main-layout>
  <div class="flex flex-col gap-2 justify-center items-center mx-auto my-auto bg-background-light border border-neutral-700 rounded-xl lg:px-20 sm:px-10 px-4 p-14 sm:p-28">
    <div class="-z-50 absolute left-20 top-0 h-20 w-56 bg-blue-500 blur-3xl"></div>
    <div class="-z-50 absolute left-0 bottom-0 h-32 w-[70%] bg-purple-500 blur-3xl"></div>
    <div class="-z-50 absolute right-0 top-1/2 h-48 w-20 bg-pink-500 blur-3xl"></div>
    <div class="-z-40 absolute inset-0 bg-background-light/60 backdrop-blur"></div>
    <h1 class="lg:text-9xl text-9xl lg:text-start text-center font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      404
    </h1>
    <p class="text-gray-400 text-xl text-center">Oops ! Page non trouvé</p>
  </div>
</main-layout>
</template>

<style scoped>

</style>
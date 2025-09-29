<script setup>
</script>

<template>
  <div class="w-full h-full flex flex-col gap-7">
    <div>
      <h1 class="text-3xl text-white font-semibold lg:text-start text-center">
        <slot name="title"></slot>
      </h1>
      <p class="text-gray-400 mt-2 text-sm lg:text-start text-center">
        <slot name="description"></slot>
      </p>
    </div>
    <div class="overflow-y-auto scrollbar-hide">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE, Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>
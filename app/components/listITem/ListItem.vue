<script setup>

import ListItemButton from "@/components/listITem/ListItemButton.vue";
import {ref, defineProps, computed} from "vue";

const props = defineProps({
  buttons: {
    type: Array,
    required: true
  }
})
const showTab = ref(props.buttons[0].value);
const changeTab = (tab) => {
  showTab.value = tab;
}

const filteredButtons = computed(() => {
  return props.buttons.filter(button => button.value === showTab.value);
})

</script>

<template>
  <div class="flex lg:flex-row flex-col gap-14 justify-center h-full">
    <div class="flex flex-col gap-10 basis-2/6 w-full">
      <div class="flex flex-col gap-5">
        <h1 class="text-4xl font-bold text-white text-center lg:text-start">
          <slot name="title"></slot>
        </h1>
        <p class="text-gray-400 text-center lg:text-start">
          <slot name="description"></slot>
        </p>
      </div>
      <div class="flex flex-col gap-4 lg:w-full w-full items-center">
        <div v-for="button in props.buttons" :key="button.value" class="sm:w-96 w-full lg:w-full">
          <ListItemButton @click="changeTab(button.value)" :active="showTab === button.value">{{
              button.label
            }}
          </ListItemButton>
        </div>
      </div>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="basis-4/6" v-if="filteredButtons.length > 0" :key="showTab">
        <slot v-for="button in filteredButtons" :name="button.value"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
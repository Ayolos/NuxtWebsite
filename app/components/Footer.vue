<script setup lang="ts">

import DefaultButton from "~/components/button/DefaultButton.vue";

const { t } = useI18n()

const CONTACT_BUTTONS = [
  {name: 'LinkedIn', href: 'https://www.linkedin.com/in/antoine-andre-465121196/', icon: 'mdi:linkedin'},
  {name: 'Github', href: 'https://github.com/Ayolos', icon: 'mdi:github'},
]
</script>

<template>
  <footer class="px-10 border-t dark:border-slate-800 border-slate-200">
    <div class="py-6 w-full 2xl:w-[1500px] 2xl:mx-auto flex flex-row justify-between items-center">
      <p class="text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} {{ $t('footer.text') }}
      </p>
      <div class="flex flex-row gap-2">
        <default-button
            v-for="(button, index) in CONTACT_BUTTONS"
            is="a"
            color="ghost"
            size="sm"
            :href="button.href">
          <template #icon>
            <UIcon class="size-6" :name="button.icon" />
          </template>
        </default-button>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
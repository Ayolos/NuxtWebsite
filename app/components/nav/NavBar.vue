<script setup lang="ts">
import NavSubLink from "~/components/nav/NavSubLink.vue";
import { useRoute } from "vue-router";
import { onMounted, watch, nextTick, ref, computed } from "vue";
import antoine from '@/assets/images/antoine.png';
import DefaultButton from "~/components/button/DefaultButton.vue";

const { t, locale, locales, setLocale } = useI18n()

const activeSection = ref<string>("");
const route = useRoute();
const isMobileMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);

const menu = computed(() => [
  {
    label: t('nav.home'),
    to: '/',
    children: [
      { label: t('nav.subNav.collaborations.title'), hash: '#collaborations', description: t('nav.subNav.collaborations.description'), icon: "material-symbols-light:handshake-rounded" },
      { label: t('nav.subNav.aboutMe.title'), hash: '#aboutMe', description: t('nav.subNav.aboutMe.description'), icon: "majesticons:lightbulb-shine-line" },
      { label: t('nav.subNav.skills.title'), hash: '#competences', description: t('nav.subNav.skills.description'), icon: "mdi:account-circle-outline" },
      { label: t('nav.subNav.technologies.title'), hash: '#technologies', description: t('nav.subNav.technologies.description'), icon: "hugeicons:nano-technology" },
      { label: t('nav.subNav.projects.title'), hash: '#projets', description: t('nav.subNav.projects.description'), icon: "ix:projects" },
    ]
  },
  { label: t('nav.resume'), to: '/resume' },
  { label: t('nav.passion'), to: '/passion' },
  { label: t('nav.contact'), to: '/contact' }
]);

const openMenus = ref<{ [key: string]: boolean }>({});
const timers = ref<{ [key: string]: NodeJS.Timeout | null }>({});

watch(menu, (newMenu) => {
  newMenu.forEach(item => {
    if (item.children?.length) openMenus.value[item.label] = false;
  });
}, { immediate: true });

function openMenu(label: string) {
  if (openMenus.value[label] !== undefined) {
    if (timers.value[label]) clearTimeout(timers.value[label]!);
    openMenus.value[label] = true;
  }
}

function closeMenu(label: string) {
  if (openMenus.value[label] !== undefined) {
    timers.value[label] = setTimeout(() => {
      openMenus.value[label] = false;
      timers.value[label] = null;
    }, 150);
  }
}

function isActiveLink(path: string) {
  return route.path === path;
}

function isActive(hash: string) {
  if (!activeSection.value && hash === "/") return true;
  return activeSection.value === hash;
}

function initScrollSpy() {
  if (typeof document === "undefined") return;
  const sections = document.querySelectorAll("section[id]");

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const newHash = `#${entry.target.id}`;
        activeSection.value = newHash;
      }
    });
  }, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    rootMargin: '-20% 0px -35% 0px'
  });

  sections.forEach((s) => observer.observe(s));
}

function changeLanguage(localeCode: string) {
  setLocale(localeCode);
  isLanguageMenuOpen.value = false;
}

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value);
});

watch(isMobileMenuOpen, (open) => {
  if (typeof document !== "undefined") {
    document.body.classList.toggle("overflow-hidden", open);
  }
});

const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.theme = isDark.value ? "dark" : "light";
  document.documentElement.classList.toggle("dark", isDark.value);
}

onMounted(() => {
  isDark.value = localStorage.theme === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);

  watch(
      () => route.path,
      async (path) => {
        if (path === "/") {
          await nextTick();
          initScrollSpy();
        } else {
          activeSection.value = "";
        }
      },
      { immediate: true }
  );

  watch(
      () => route.hash,
      (hash) => {
        if (hash) activeSection.value = hash;
      },
      { immediate: true }
  );
});
</script>

<template>
  <header class="w-full px-6 py-3.5 sticky top-0 dark:bg-slate-950/90 bg-slate-50/90 backdrop-blur z-50 border-b dark:border-slate-800 border-slate-200">
    <div class="grid md:grid-cols-3 grid-cols-2 items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img :src="antoine" class="h-6">
      </NuxtLink>

      <!-- Menu Desktop -->
      <nav class="hidden md:flex items-center justify-center">
        <ul class="flex flex-row items-center gap-4">
          <li
              v-for="item in menu"
              :key="item.label"
              class="relative"
              @mouseenter="openMenu(item.label)"
              @mouseleave="closeMenu(item.label)"
          >
            <NuxtLink
                :to="item.to"
                class="text-sm flex items-center gap-1 group subpixel-antialiased font-medium"
                :class="[
                isActiveLink(item.to)
                  ? 'text-purple-500'
                  : 'dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-black'
              ]"
            >
              {{ item.label }}
              <UIcon
                  v-if="item.children?.length"
                  name="ic:round-keyboard-arrow-down"
                  class="size-5 transition-transform duration-200 group-hover:rotate-180"
              />
            </NuxtLink>

            <!-- Sous-menu Desktop -->
            <Transition
                name="fade"
                enter-from-class="opacity-0 scale-90"
                enter-to-class="opacity-100 scale-100"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-90"
            >
              <ul
                  v-if="item.children?.length"
                  v-show="openMenus[item.label]"
                  class="absolute w-[300px] p-2 mt-2 dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg shadow-lg"
              >
                <li v-for="child in item.children" :key="child.hash">
                  <NavSubLink
                      :icon="child.icon"
                      :label="child.label"
                      :to="'/' + child.hash"
                      :description="child.description"
                      :active="isActive(child.hash)"
                  />
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </nav>

      <!-- Zone de droite : Sélecteur de langue + GitHub + Burger -->
      <div class="flex items-center gap-2 justify-end">
        <!-- Sélecteur de langue -->
        <div class="relative">
          <button
              @click="isLanguageMenuOpen = !isLanguageMenuOpen"
              class="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 dark:hover:text-white hover:text-black border dark:border-slate-800 border-slate-300 rounded-md dark:hover:border-slate-700 hover:border-slate-400 transition-colors"
          >
            <UIcon :name="currentLocale?.flag" class="size-4" />
            <!-- icon arrow with anim open and close -->
            <UIcon
                name="ic:round-keyboard-arrow-down"
                class="size-4 transition-transform duration-200"
                :class="isLanguageMenuOpen ? 'rotate-180' : ''"
            />
          </button>

          <!-- Menu déroulant des langues -->
          <Transition
              name="fade"
              enter-from-class="opacity-0 scale-90"
              enter-to-class="opacity-100 scale-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-90"
          >
            <ul
                v-show="isLanguageMenuOpen"
                class="z-50 absolute right-0 mt-2 w-max dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-md shadow-lg overflow-hidden"
            >
              <li
                  v-for="loc in locales"
                  :key="loc.code"
                  @click="changeLanguage(loc.code)"
                  class="flex flex-row gap-2 items-center px-4 py-2 text-sm cursor-pointer transition-colors"
                  :class="locale === loc.code
                    ? ''
                    : 'text-slate-500 dark:hover:bg-slate-900 hover:bg-slate-200/50'"
              >
                <UIcon :name="loc.flag" class="size-4 inline-block mr-2"/>
                {{ loc.name }}
                <UIcon
                    v-if="locale === loc.code"
                    name="material-symbols:check"
                    class="size-4 ml-auto text-slate-500"
                />
              </li>
            </ul>
          </Transition>
        </div>

        <default-button
            size="sm"
            color="ghost"
            @click="toggleTheme"
        >
          <template #icon>
            <UIcon
                :name="!isDark ? 'material-symbols:light-mode-outline-rounded' : 'material-symbols:dark-mode-outline-rounded'"
                class="size-5 text-slate-500 cursor-pointer"
            />
          </template>
        </default-button>

        <!-- Lien GitHub -->
        <default-button
          is="NuxtLink"
          color="ghost"
          size="sm"
          to="https://github.com/Ayolos"
          >
          <template #icon>
            <UIcon name="i-simple-icons-github" class="size-5 text-slate-500 cursor-pointer" />
          </template>
        </default-button>

        <!-- Burger Button Mobile -->
        <default-button
            is="button"
            color="ghost"
            size="sm"
            class="md:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <template #icon>
            <UIcon
                :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
                class="size-5 text-slate-500 cursor-pointer"
            />
          </template>
        </default-button>
      </div>
    </div>

    <!-- Menu Mobile -->
    <Transition name="fade">
      <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute left-0 top-full h-screen w-full dark:bg-slate-950 bg-slate-50 border-t dark:border-slate-800 border-slate-300 p-6 flex flex-col gap-4"
      >
        <ul class="flex flex-col gap-3">
          <li v-for="item in menu" :key="item.label">
            <NuxtLink
                :to="item.to"
                @click="isMobileMenuOpen = false"
                class="block text-slate-500 font-medium px-2.5 py-1.5 text-xs uppercase"
                :class="isActiveLink(item.to) ? 'text-purple-500' : 'hover:text-white' "
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Sous-menu mobile -->
            <ul v-if="item.children?.length" class="flex flex-col list-none ml-5">
              <li v-for="child in item.children" :key="child.hash" class="pl-2 border-l"
                  :class="isActive(child.hash) ? 'border-purple-500' : 'dark:border-slate-700 border-slate-300'"
              >
                <NuxtLink
                    :to="'/' + child.hash"
                    @click="isMobileMenuOpen = false"
                    class="flex gap-2 items-center text-sm transition-colors px-2.5 py-1.5"
                    :class="isActive(child.hash) ? 'text-purple-500' : 'hover:text-white text-slate-500' "
                >
                  <UIcon :name="child.icon" class="size-5" :class="isActive(child.hash) ? '' : 'dark:text-slate-700 text-slate-400'"></UIcon>
                  {{ child.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
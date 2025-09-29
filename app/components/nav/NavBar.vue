<script setup lang="ts">
import NavSubLink from "~/components/nav/NavSubLink.vue";
import { useRoute } from "vue-router";
import { onMounted, watch, nextTick, ref } from "vue";
import antoine from '@/assets/images/antoine.png';

const activeSection = ref<string>("");
const route = useRoute();
const isMobileMenuOpen = ref(false); // ✅ Burger menu ouvert/fermé

const menu = [
  {
    label: 'Accueil',
    to: '/',
    children: [
      { label: 'Collaborations', hash: '#collaborations', description: "Voici les entreprises avec lesquelles j'ai collaboré.", icon: "material-symbols-light:handshake-rounded" },
      { label: 'Compétences', hash: '#competences', description: "Voici un aperçu de mes compétences techniques et professionnelles.", icon: "majesticons:lightbulb-shine-line" },
      { label: 'Technologies', hash: '#technologies', description: "Voici les technologies et outils que j'utilise.", icon: "hugeicons:nano-technology" },
      { label: 'Projets', hash: '#projets', description: "Voici quelques projets personnels que j'ai réalisés.", icon: "ix:projects" },
    ]
  },
  { label: 'Parcours', to: '/resume' },
  { label: 'Contact', to: '/contact' }
];

const openMenus = ref<{ [key: string]: boolean }>({});
const timers = ref<{ [key: string]: NodeJS.Timeout | null }>({});

menu.forEach(item => {
  if (item.children?.length) openMenus.value[item.label] = false;
});

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
    rootMargin: '-20% 0px -35% 0px' // ✅ Active quand la section est dans le tiers supérieur
  });

  sections.forEach((s) => observer.observe(s));
}

watch(isMobileMenuOpen, (open) => {
  if (typeof document !== "undefined") {
    document.body.classList.toggle("overflow-hidden", open);
  }
});

onMounted(() => {
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

  // ✅ Écouter aussi les changements de hash
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
  <header class="w-full px-6 py-4 sticky top-0 bg-slate-950/90 backdrop-blur z-50 border-b border-slate-800">
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img :src="antoine" class="h-6">
      </NuxtLink>

      <!-- 🌐 Menu Desktop -->
      <nav class="hidden md:block">
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
                class="text-sm flex items-center gap-1 group"
                :class="[
                isActiveLink(item.to)
                  ? 'text-purple-500'
                  : 'text-slate-400 hover:text-white font-medium'
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
                  class="absolute w-[260px] p-2 mt-2 bg-slate-950 border border-slate-800 rounded-md shadow-lg"
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

      <!-- ✅ Zone de droite : GitHub + Burger -->
      <div class="flex items-center gap-4">
        <!-- Lien GitHub toujours visible -->
        <NuxtLink
            to="https://github.com/nuxt/ui"
            target="_blank"
            class="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <UIcon name="i-simple-icons-github" class="size-5" />
        </NuxtLink>

        <!-- ✅ Burger Button Mobile -->
        <button
            class="md:hidden flex items-center justify-center text-gray-300 hover:text-white"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <UIcon
              :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
              class="size-6"
          />
        </button>
      </div>
    </div>

    <!-- ✅ Menu Mobile -->
    <Transition name="fade">
      <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute left-0 top-full h-screen w-full bg-slate-950 border-t border-slate-800 p-6 flex flex-col gap-4"
      >
        <ul class="flex flex-col gap-3">
          <li v-for="item in menu" :key="item.label">
            <NuxtLink
                :to="item.to"
                @click="isMobileMenuOpen = false"
                class="block text-gray-300 font-medium px-2.5 py-1.5 text-xs uppercase"
                :class="isActiveLink(item.to) ? 'text-purple-500' : 'hover:text-white' "
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Sous-menu mobile -->
            <ul v-if="item.children?.length" class="flex flex-col list-none ml-5">
              <li v-for="child in item.children" :key="child.hash" class="pl-2 border-l"
                  :class="isActive(child.hash) ? 'border-purple-500' : 'border-slate-700'"
              >
                <NuxtLink
                    :to="'/' + child.hash"
                    @click="isMobileMenuOpen = false"
                    class="flex gap-2 items-center text-sm text-gray-400 transition-colors px-2.5 py-1.5"
                    :class="isActive(child.hash) ? 'text-purple-500' : 'hover:text-white' "
                >
                  <UIcon :name="child.icon" class="size-5"></UIcon>
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
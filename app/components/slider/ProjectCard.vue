<template>
  <div
      :class="cardClasses"
      class="relative border h-full border-neutral-700 cursor-pointer text-white transition-all duration-700 ease-in-out overflow-hidden z-0"
      @click="handleToggleExpand"
      ref="projectCard"
  >
    <div class="flex items-center h-full">
      <!-- Backgrounds -->
      <div
          class="-z-50 absolute left-0 top-0 h-20 w-56"
          :class="bgColor + ' rounded-full blur-3xl'"
          style="transform: translate3d(0, 0, 0)"
      ></div>
      <div
          class="-z-50 absolute left-0 bottom-0 h-32 w-56"
          :class="bgColor + ' rounded-full blur-3xl'"
          style="transform: translate3d(0, 0, 0)"
      ></div>
      <div
          class="-z-50 absolute right-0 top-1/2 h-48 w-20"
          :class="bgColor + ' rounded-full blur-3xl'"
          style="transform: translate3d(0, 0, 0)"
      ></div>
      <div class="-z-40 absolute inset-0 rounded-2xl bg-background-light/50 backdrop-blur"></div>

      <!-- Titre affiché lorsque la carte n'est pas étendue -->
      <h2
          v-if="!isExpanded && isLgScreen"
          class="absolute p-2 inset-0 transition-opacity text-center h-full text-2xl flex items-center justify-center duration-500"
      >
        {{ title }}
      </h2>

      <!-- Contenu affiché uniquement après la transition d'entrée -->
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="isExpanded" class="flex h-full flex-col justify-center items-center absolute inset-0 overflow-auto">
          <div class="sm:p-8 p-5 flex flex-col gap-8 justify-center items-center">
            <div class="flex flex-col gap-4 items-center">
              <h2 class="text-white text-2xl text-center">{{ title }}</h2>
              <p class="sm:text-sm text-xs text-gray-500 text-center">{{ description }}</p>
            </div>
            <a
                v-if="githubLink"
                :href="githubLink"
                class="flex text-pink-500 transition duration-500 ease-in-out hover:scale-105 flex-row gap-2 items-center border rounded-full w-max p-1 border-pink-500 pr-4 pl-2 py-1"
            >
              <iconify-icon icon="mdi:github" class="text-3xl"></iconify-icon>
              <p>Github</p>
            </a>
            <div class="flex flex-row gap-4 lg:flex-nowrap flex-wrap justify-center">
              <BadgeItem v-for="(badge, index) in badges" :key="index">{{ badge }}</BadgeItem>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, onMounted } from 'vue';
import BadgeItem from "@/components/BadgeItem.vue";

// Props pour passer les données du projet
const props = defineProps({
  cardIndex: Number,
  expandedCard: Number,
  toggleExpand: Function,
  title: String,
  description: String,
  badges: Array,
  githubLink: String,
  bgColor: String,
});

// Référence pour l'élément de la carte
const projectCard = ref(null);

// Etat pour déterminer la taille de l'écran
const isLgScreen = ref(window.innerWidth >= 1024);

// Mettre à jour la taille de l'écran en cas de redimensionnement
const updateScreenSize = () => {
  isLgScreen.value = window.innerWidth >= 1024;
};

// Attacher un écouteur d'événements pour suivre la taille de l'écran
onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

// Calcul de la classe dynamique pour le style
const isExpanded = computed(() => (isLgScreen.value ? props.expandedCard === props.cardIndex : true)); // Always expanded on smaller screens

// Modifier les classes pour gérer les cartes expandables dans un carrousel horizontal
const cardClasses = computed(() => [
  'rounded-2xl transition-all duration-700 ease-in-out',
  isExpanded.value ? 'w-full' : 'w-1/2', // largeur spécifique en fonction de l'état expandé ou non
  isLgScreen.value ? 'flex-grow' : '', // Ajustement pour garder les cartes flexibles sur grands écrans
]);

// Modified toggleExpand function
const handleToggleExpand = () => {
  if (isLgScreen.value && (props.expandedCard !== props.cardIndex || props.expandedCard === null)) {
    props.toggleExpand(props.cardIndex);
  }
};

// Hooks de transition
const beforeEnter = (el) => {
  el.style.opacity = 0; // Assure que l'élément commence invisible avant la transition
};

const enter = (el, done) => {
  el.offsetHeight; // déclenche le reflow
  el.style.opacity = 1; // commence à apparaître
  done(); // termine la transition
};

const leave = (el, done) => {
  el.style.opacity = 0; // commence à disparaître
  setTimeout(done, 300); // durée de la transition
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

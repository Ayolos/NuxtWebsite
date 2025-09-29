<script setup>
import {computed, onMounted, ref} from 'vue';
import MainLayout from "@/layouts/default.vue";
import ProjectCard from "@/components/slider/ProjectCard.vue";

// Suivi de la carte développée
const expandedCard = ref(1);
const currentSlide = ref(0);
const nbrPerSlide = computed(() => isLgScreen.value ? 2 : 1);
const direction = ref('right'); // Propriété pour suivre la direction
const isNextDisabled = computed(() => currentSlide.value >= Math.ceil(projects.value.length / nbrPerSlide.value) - 1);
const isPrevDisabled = computed(() => currentSlide.value <= 0);
const isLgScreen = ref(window.innerWidth >= 1024);

const updateScreenSize = () => {
  isLgScreen.value = window.innerWidth >= 1024;
};

// Attacher un écouteur d'événements pour suivre la taille de l'écran
onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});



// Projets réactifs
const projects = ref([
  {
    cardIndex: 1,
    title: "NorthBotanica",
    description: "J'ai réalisé un site web vitrine pour promouvoir les services de Northbotanica, ce qui m'a permis de renforcer mes compétences en Vue.js. J'ai également appris à installer un serveur via CloudPanel, à configurer et à mettre en production le site. En utilisant Google Search Console, j'ai optimisé le référencement pour améliorer la visibilité en ligne.",
    badges: ["VueJS", "Laravel", "InertiaJS"],
    githubLink: "https://github.com/Ayolos/NorthBotanica.git",
    bgColor: "bg-blue-500"
  },
  {
    cardIndex: 2,
    title: "NEF Bâtiment",
    description: "Dans le cadre de ce second projet, j'ai développé un site web vitrine pour une entreprise du bâtiment. J'ai consolidé mes compétences en Vue.js et géré l'hébergement via CloudPanel. Cependant, ce projet m'a également permis d'implémenter un système de messagerie en utilisant Mailcow, facilitant ainsi la communication entre l'entreprise et ses clients. J'ai également optimisé le site pour le référencement avec Google Search Console.",
    badges: ["VueJS", "Laravel", "InertiaJS"],
    githubLink: "https://github.com/Ayolos/SiteProBatiment.git",
    bgColor: "bg-purple-500"
  },
  {
    cardIndex: 3,
    title: "Symphony App",
    description: "Dans le cadre de mon projet de fin d'études en master, j'ai développé Symphony, un réseau social centré sur la musique, conçu avec le framework Laravel. Ce réseau permet aux utilisateurs de partager des posts, de commenter, de liker et de recevoir des notifications, tout en offrant une gestion complète des profils utilisateurs. Un système d'authentification robuste est également mis en place, comprenant l'inscription, la connexion, et la réinitialisation de mot de passe.",
    badges: ["VueJS", "Laravel", "InertiaJS"],
    githubLink: "https://github.com/Ayolos/SymphonyApp.git",
    bgColor: "bg-blue-500"
  },
  {
    cardIndex: 4,
    title: "Laravel Nova TMS",
    description: "Lors de mon stage, j'ai eu l'opportunité de développer de A à Z un projet de TMS, en utilisant Laravel Nova. Ce système permet de suivre les différentes commandes de transport, de gérer la facturation, ainsi que la gestion des salariés et des clients. J'ai amélioré mes compétences avec les outils Laravel et appris à définir les besoins d'un client en rédigeant un cahier des charges détaillé, ce qui a contribué à la réussite du projet. (par soucis de confidentialité, le code n'est pas disponible en public sur Github)",
    badges: ["VueJS", "Laravel", "Laravel nova"],
    bgColor: "bg-pink-500"
  },
  // Ajoute d'autres projets ici...
]);

const visibleCards = computed(() => {
  const start = currentSlide.value * nbrPerSlide.value;
  return projects.value.slice(start, start + nbrPerSlide.value);
});

// Gestion du changement de slide
const nextSlide = () => {
  if (currentSlide.value < Math.ceil(projects.value.length / nbrPerSlide.value) - 1) {
    direction.value = 'right'; // Définir la direction à droite
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    direction.value = 'left'; // Définir la direction à gauche

    currentSlide.value--;
  }
};

const toggleExpand = (cardIndex) => {
  expandedCard.value = cardIndex;
};
</script>

<template>
  <main-layout>
    <div class="lg:pt-24 pt-20 pb-10 w-full 2xl:w-[1500px] 2xl:mx-auto flex flex-col gap-10 items-center lg:px-10 sm:px-10 px-4">
      <div class="flex flex-col gap-4 text-center sm:w-2/3 w-full">
        <h1 class="text-4xl text-white">Mes projets</h1>
        <p class="text-gray-500 text-sm">Découvrez une sélection de mes réalisations, où je mets en avant mes compétences en développement web. Chaque projet illustre ma créativité et mon souci du détail dans la conception de solutions uniques.</p>
      </div>

      <div class="relative h-full w-full">
        <div class="absolute flex flex-row justify-between inset-0 mx-0 sm:-mx-5 inset-y-1/2 h-max z-50">
          <button @click="prevSlide" :class="!isPrevDisabled ? '' : 'invisible'">
            <iconify-icon icon="bx:bx-chevron-left" class="text-white text-4xl bg-background border border-neutral-500 transition ease-in-out duration-300 hover:scale-110 rounded-full"></iconify-icon>
          </button>
          <button @click.prevent="nextSlide" :class="!isNextDisabled ? '' : 'invisible'">
            <iconify-icon icon="bx:bx-chevron-right" class="text-white text-4xl bg-background border border-neutral-500 transition ease-in-out duration-300 hover:scale-110 rounded-full"></iconify-icon>
          </button>
        </div>

        <div class="flex flex-row min-h-full sm:h-full h-[500px] gap-4 overflow-hidden">
          <transition :name="direction === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
            <div class="flex flex-row h-full gap-4 w-full" :key="currentSlide">
              <ProjectCard
                  v-for="project in visibleCards"
                  :key="project.cardIndex"
                  :cardIndex="project.cardIndex"
                  :expandedCard="expandedCard"
                  :toggleExpand="toggleExpand"
                  :title="project.title"
                  :description="project.description"
                  :badges="project.badges"
                  :githubLink="project.githubLink"
                  :bgColor="project.bgColor"
              />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<style scoped>
/* Transitions for going right */
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s ease-in-out;
}

.slide-right-enter-from {
  transform: translateX(100%); /* Entrée depuis la droite */
}

.slide-right-enter-to {
  transform: translateX(0); /* Rétablir la position */
}

.slide-right-leave-from {
  transform: translateX(0); /* Rétablir la position */
}

.slide-right-leave-to {
  transform: translateX(-100%); /* Sortie vers la gauche */
}

/* Transitions for going left */
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.4s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(-100%); /* Entrée depuis la gauche */
}

.slide-left-enter-to {
  transform: translateX(0); /* Rétablir la position */
}

.slide-left-leave-from {
  transform: translateX(0); /* Rétablir la position */
}

.slide-left-leave-to {
  transform: translateX(100%); /* Sortie vers la droite */
}
</style>
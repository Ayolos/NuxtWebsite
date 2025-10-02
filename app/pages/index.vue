<script setup>
import {onMounted, ref} from 'vue';
import KPIText from "@/components/KPIText.vue";
//import { gsap } from 'gsap';
import antoine1 from '@/assets/images/antoine.png';
import vallourec from '@/assets/images/vallourec.png';
import laRedoute from '@/assets/images/laredoute.png';
import ultimex from '@/assets/images/ultimex.png';

import nef from '@/assets/images/nef.png'
import northbotanica from '@/assets/images/northbotanica.png'
import symphonyapp from '@/assets/images/symphonyapp.png'
import topsecret from '@/assets/images/topsecret.png'
import portfolio from '@/assets/images/portfolio.png'

import {useScrollAnimations} from '@/composables/useScrollAnimations'
import DefaultButton from "~/components/button/DefaultButton.vue";
import DefaultBadge from "~/components/badge/DefaultBadge.vue";

// Image state
const imageLoaded = ref(false);

// SVG circle ref
const circleRef = ref(null);

const { createFadeUpAnimation } = useScrollAnimations()

const customSection = ref(null)

// Function to handle image load event
const handleImageLoad = () => {
  imageLoaded.value = true;
};

const items = [
  {
    image: northbotanica,
    description: 'Un site web vitrine développé pour promouvoir les services de Northbotanica, qui m’a permis d’approfondir Vue.js et la mise en production.',
    title: 'NorthBotanica',
    github: 'https://github.com/Ayolos/NorthBotanica',
    list: [
      'Développement avec Vue.js',
      'Installation et configuration serveur (CloudPanel)',
      'Mise en production du site',
      'Optimisation SEO (Google Search Console)'
    ],
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: nef,
    description: 'Création d’un site vitrine pour une entreprise du bâtiment, avec gestion de l’hébergement et mise en place d’un système de messagerie.',
    title: 'NEF Bâtiment',
    github: 'https://github.com/Ayolos/SiteProBatiment',
    list: [
      'Développement avec Vue.js',
      'Installation et configuration serveur (CloudPanel)',
      'Mise en production du site',
      'Implémentation de la messagerie avec Mailcow',
      'Optimisation SEO avec Google Search Console'
    ],
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: symphonyapp,
    description: 'Projet de fin d’études : un réseau social autour de la musique conçu avec Laravel, offrant des fonctionnalités complètes d’interaction entre utilisateurs.',
    title: 'Symphony App',
    github: 'https://github.com/Ayolos/SymphonyApp',
    list: [
      'Partage de posts, commentaires, likes et notifications',
      'Gestion complète des profils utilisateurs',
      'Authentification (inscription, connexion, reset mot de passe)',
      'Développement back-end avec Laravel'
    ],
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: topsecret,
    description: 'Développement d’un TMS complet en alternance, avec gestion des commandes, de la facturation et des utilisateurs, via Laravel Nova.',
    title: 'TMS',
    list: [
      'Conception et développement complet du projet',
      'Utilisation de Laravel Nova pour l’interface d’administration',
      'Gestion des commandes, clients, salariés et facturation',
      'Rédaction d’un cahier des charges détaillé'
    ],
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: portfolio,
    description: 'Mon portfolio est une vitrine de mon savoir-faire en développement web fullstack. Il met en avant mes compétences techniques, mes projets réalisés et mon parcours professionnel.',
    title: 'Portfolio',
    github: 'https://github.com/Ayolos/my-website-front',
    url: 'https://ayolos.vercel.app/',
    list: [
      'Point Uno',
      'Point Dos',
      'Point Tres'
    ],
    techno: ['VueJS', 'Nuxtjs', 'ExpressJS', 'Tailwindcss']
  },
]

const companyItems = [
  {name: 'Vallourec', logo: vallourec},
  {name: 'La Redoute', logo: laRedoute},
  {name: 'Ultimex', logo: ultimex},
]

const skillsItems = [
  {
    color: 'green',
    title: 'Front-end',
    description: 'Maîtrise des principaux frameworks JavaScript, React et Vue.js, pour créer des interfaces modernes, réactives et ergonomiques.',
    icons: ['devicon:vuejs', 'devicon:react', 'devicon:tailwindcss'],
    badges: ['react', 'vuejs', 'tailwindcss', 'html5', 'css3', 'javascript', 'typescript']
  },
  {
    color: 'red',
    title: 'Back-end',
    description: 'Conception d’architectures robustes et scalables avec Laravel, Node.js et Java, permettant de développer des applications fiables et performantes.',
    icons: ['devicon:laravel', 'devicon:nodejs', 'devicon:java'],
    badges: ['laravel', 'nodejs', 'java (spring)', 'expressjs', 'nestjs', 'springboot']
  },
  {
    color: 'blue',
    title: 'Bases de données',
    description: 'Gestion et optimisation de MySQL et PostgreSQL pour garantir des systèmes rapides et efficaces.',
    icons: ['devicon:mysql', 'devicon:postgresql'],
    badges: ['mysql', 'postgresql', 'mongodb', 'redis']
  }
]

const technoItems = [
  {
    title: 'développement web',
    techno: [
      {name: 'JavaScript', icon: 'devicon:javascript'},
      {name: 'TypeScript', icon: 'devicon:typescript'},
      {name: 'React', icon: 'devicon:react'},
      {name: 'NuxtJs', icon: 'devicon:nuxtjs'},
      {name: 'NodeJs', icon: 'devicon:nodejs'},
      {name: 'Laravel', icon: 'devicon:laravel'},
      {name: 'Vuejs', icon: 'devicon:vuejs'},
      {name: 'Java', icon: 'devicon:java'},
      {name: 'Tailwindcss', icon: 'devicon:tailwindcss'},
      {name: 'Postgresql', icon: 'devicon:postgresql'},
      {name: 'MySQL', icon: 'devicon:mysql'},
      {name: 'Flutter', icon: 'devicon:flutter'}
    ]
  },
  {
    title: 'design',
    techno: [
      {name: 'Figma', icon: 'devicon:figma'},
      {name: 'UI / UX', icon: 'devicon:html5'},
      {name: 'Responsive', icon: 'devicon:html5'}
    ]
  },
  {
    title: 'outils',
    techno: [
      {name: 'Git', icon: 'devicon:git'},
      {name: 'Github', icon: 'devicon:github'},
      {name: 'Gitlab', icon: 'devicon:gitlab'},
      {name: 'Docker', icon: 'devicon:docker'},
      {name: 'Jetbrains', icon: 'devicon:jetbrains'},
      {name: 'VSCode', icon: 'devicon:vscode'}
    ]
  }
]

onMounted(() => {
  if (customSection.value) {
    createFadeUpAnimation(customSection.value.querySelector('.custom-content'), {
      y: 100,
      duration: 1.5,
      ease: "back.out(1.7)",
      start: "top 60%"
    })
  }
})

const downloadCV = () => {
  const link = document.createElement('a');
  link.href = '/cvAntoine.pdf';
  link.download = 'CV-Antoine.pdf';
  link.click();
};

</script>

<template>
  <section id="home"
           class="box flex min-h-[calc(100vh-3.5rem)] border-b border-slate-800 flex-col justify-between w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto pt-20 pb-16 sm:px-10 px-4 gap-16">
      <div class="flex lg:flex-row flex-grow flex-col-reverse justify-between lg:gap-16 gap-10 items-center h-full">
        <div class="basis-3/5">
          <div class="flex flex-col items-center lg:items-start h-full gap-4">
            <default-badge>Développeur</default-badge>
            <div class="font-bold">
              <h1 class="lg:text-6xl text-5xl lg:text-start text-center text-white">Hello je suis</h1>
              <h1 class="lg:text-6xl text-5xl lg:text-start text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Antoine André
              </h1>
            </div>
            <p class="text-xl lg:text-start text-center text-gray-400 font-thin">
              Développeur web fullstack, Je transforme des idées en applications web performantes et esthétiques.
            </p>
            <div class="flex lg:flex-row flex-col gap-8 items-center w-full h-full pt-6">
              <default-button is="button" bordered @click="downloadCV">
                Télécharger le CV
                <template #icon>
                  <UIcon class="size-5" name="material-symbols:download"/>
                </template>
              </default-button>
              <div class="flex flex-row gap-4">
                <default-button is="a" bordered color="secondary" href="https://github.com/Ayolos">
                  <template #icon>
                    <UIcon class="size-6" name="mdi:github"/>
                  </template>
                </default-button>
                <default-button is="a" bordered color="secondary"
                                href="https://www.linkedin.com/in/antoine-andre-465121196/">
                  <template #icon>
                    <UIcon class="size-6" name="mdi:linkedin"/>
                  </template>
                </default-button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-2/5">
          <div class="relative overflow-hidden flex items-center justify-end">
            <img
                :src="antoine1"
                alt="Antoine"
                class="max-w-[300px] lg:min-w-[400px] lg:max-w-[600px] lg:w-full aspect-square bg-cover p-1 mix-blend-lighten"/>
            <svg ref="circleRef" class="absolute inset-y-0 right-0 max-w-[300px] lg:min-w-[400px] lg:max-w-[600px] lg:w-full h-full overflow-visible">
              <circle
                  class="neon-circle"
                  cx="50%"
                  cy="50%"
                  fill="none"
                  r="49%"
                  stroke="#ec4899"
                  stroke-dasharray="15, 120, 25, 25"
                  stroke-linecap="round"
                  stroke-width="3"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="rounded-3xl shadow-2xl">
        <div class="hero hero-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 bg-background/90 justify-between items-center rounded-3xl">
          <k-p-i-text class="hero-content" number="5" text="Années d'expérience"></k-p-i-text>
          <k-p-i-text class="hero-content" number="6" text="Projets complétés"></k-p-i-text>
          <k-p-i-text class="hero-content" number="9" text="Technologies maîtrisées"></k-p-i-text>
          <k-p-i-text class="hero-content" number="5" text="Années d'études"></k-p-i-text>
        </div>
      </div>
    </section>
  <section-template id="collaborations">
    <template #title>Collaborations</template>
    <template #description>Un aperçu des entreprises qui ont marqué mon parcours et enrichi mon expertise technique
    </template>
    <div class="flex justify-center mt-6">
      <default-button is="NuxtLink" bordered size="sm" to="/resume">
        En savoir plus
        <UIcon class="size-5" name="material-symbols:arrow-right-alt"/>
      </default-button>
    </div>
    <div class="flex section-content fade-up flex-row justify-center sm:gap-20 gap-2 mt-20">
      <div class="flex flex-row gap-6 card-item">
        <div v-for="companyItem in companyItems">
            <div class="bg-slate-800/50 border border-slate-800 rounded-lg sm:p-6 p-3 flex items-center">
              <img :alt="companyItem.name" :src="companyItem.logo" class="h-16"/>
            </div>
          <span
              class="block mt-2 bg-slate-900 text-sm text-white rounded border border-slate-800 font-semibold py-0.5 text-center">{{
              companyItem.name
            }}</span>
          </div>
        </div>
      </div>
  </section-template>
  <section-template id="competences">
    <template #title>Compétences</template>
    <template #description>Voici les domaines dans lesquels je construis la plupart de mes projets, alliant performance
      et qualité.
    </template>
    <div class="grid md:grid-cols-3 grid-cols-1 mt-20">
      <div
          v-for="(skillsItem, index) in skillsItems"
          :key="index"
          :class="[
                `bg-gradient-to-br from-${skillsItem.color}-500/10 from-5% via-transparent via-50% to-transparent`,
                {
                    'border-t rounded-t-xl': index === 0,
                    'md:border-l md:rounded-l-xl md:rounded-t-none': index === 0,

                    'rounded-b-xl': index === skillsItems.length - 1,
                    'md:rounded-r-xl md:rounded-bl-none': index === skillsItems.length - 1
                }
            ]"
          class="p-10 border-slate-800 border-x border-b md:border-x-0 md:border-t md:border-b md:border-r"
      >
        <div class="mb-2 flex gap-2 text-purple-500">
          <UIcon v-for="icon in skillsItem.icons" :name="icon" class="size-7"/>
        </div>
        <h4 class="text-white font-semibold truncate">
          {{ skillsItem.title }}
        </h4>
        <p class="text-slate-500 text-[15px] text-pretty text-muted mt-1">
          {{ skillsItem.description }}
        </p>
        <div class="flex flex-wrap gap-2 mt-6">
          <default-badge v-for="badge in skillsItem.badges">{{ badge }}</default-badge>
          </div>
        </div>
      </div>
  </section-template>
  <section-template id="technologies">
    <template #title>Technologies</template>
    <template #description>Un aperçu des technologies que j'utilise régulièrement pour créer des applications web
      performantes et esthétiques.
    </template>
    <div v-for="technoItem in technoItems" class="flex flex-col mt-20">
      <div class="text-xs bg-slate-900 border border-slate-700 w-max px-2 py-1 rounded-lg">
        {{ technoItem.title }}
      </div>
      <div class="grid mt-2 grid-cols-4 rounded-lg border border-slate-800">
        <div
            v-for="techno in technoItem.techno"
            :class="{
                'border-r': technoItem.techno.indexOf(techno) % 4 !== 3,
                'border-b': Math.floor(technoItem.techno.indexOf(techno) / 4) < Math.floor((technoItem.techno.length - 1) / 4)
              }"
            class="flex flex-row gap-2 border-slate-800 items-center justify-center h-28"
        >
          <UIcon :name="techno.icon" class="size-10 text-purple-500"/>
          <p class="hidden md:block">{{ techno.name }}</p>
        </div>
      </div>
    </div>
  </section-template>
  <section-template id="projets" bordered>
    <template #title>Projets</template>
    <template #description>Une sélection de projets personnels et professionnels qui illustrent mon expertise en
      développement web fullstack.
    </template>
    <UCarousel
        v-slot="{ item, index }"
        :autoplay="{ delay: 600000 }"
        :items="items"
        :ui="{ item: 'md:basis-1/2' }"
        class="w-full mt-10"
        dots
        loop
    >
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col-reverse gap-8 items-center h-full">
        <div class="sm:h-[250px] h-[300px]">
          <h4 class="font-bold">{{ item.title }}</h4>
          <p class="text-sm text-gray-400 mb-4">{{ item.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <default-badge v-for="(tech, idx) in item.techno" :key="idx">{{ tech }}</default-badge>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <default-button is="a" v-if="item.github" :href="item.github" bordered class="h-fit" color="secondary"
                            size="sm">
              <template #icon>
                <UIcon class="size-6" name="mdi:github"/>
              </template>
            </default-button>
            <default-button is="a" v-if="item.url" :href="item.url" bordered class="h-fit" size="sm">
              Voir le projet
              <template #icon>
                <UIcon class="size-5" name="material-symbols:open-in-new"/>
              </template>
            </default-button>
          </div>
        </div>
        <img :src="item.image" alt="Carousel Image"
             class="w-full h-[300px] object-cover object-center object-top rounded"/>
      </div>
    </UCarousel>
  </section-template>
</template>

<style scoped>
.neon-circle {
  filter: drop-shadow(0 0 5px #ec4899);

}
</style>

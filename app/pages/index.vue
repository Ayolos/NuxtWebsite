<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from "~/layouts/default.vue";
import Antoine from "~/assets/images/antoine.png";
import KPIText from "@/components/KPIText.vue";
import IconButton from "@/components/IconButton.vue";
//import { gsap } from 'gsap';
import GradientButton from "@/components/GradientButton.vue";

import antoine from '@/assets/images/antoine.png';
import antoine1 from '@/assets/images/antoine.png';
import vallourec from '@/assets/images/vallourec.png';
import laRedoute from '@/assets/images/laredoute.png';
import ultimex from '@/assets/images/ultimex.png';

import nef from '@/assets/images/nef.png'
import northbotanica from '@/assets/images/northbotanica.png'
import symphonyapp from  '@/assets/images/symphonyapp.png'
import topsecret from '@/assets/images/topsecret.png'
import portfolio from '@/assets/images/portfolio.png'

import ItemText from "~/components/listITem/ItemText.vue";

import { useScrollAnimations } from '@/composables/useScrollAnimations'

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

// GSAP animation functions
// const animateCircle = (element) => {
//   gsap.to(element, {
//     rotation: 360,
//     transformOrigin: "50% 50%",
//     repeat: -1,
//     duration: 11,
//     ease: "linear",
//   });
//
//   gsap.to(element.querySelector('.neon-circle'), {
//     strokeDasharray: [
//       "15, 120, 25, 25",
//       "16, 25, 92, 72",
//       "4, 250, 22, 22",
//     ],
//     strokeDashoffset: 100,
//     duration: 20,
//     repeat: -1,
//     yoyo: true,
//     ease: "linear",
//     keyframes: [
//       { strokeDasharray: "15, 120, 25, 25", duration: 2 },
//       { strokeDasharray: "16, 25, 92, 72", duration: 5 },
//       { strokeDasharray: "4, 250, 22, 22", duration: 5 },
//     ]
//   });
// };
//
// // Trigger animations when component is mounted
// onMounted(() => {
//   if (circleRef.value) {
//     animateCircle(circleRef.value);
//   }
// });

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

</script>

<template>
  <div>
    <section id="home" class="box flex min-h-[calc(100vh-3.5rem)] border-b border-border flex-col justify-between w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto pt-20 pb-16 sm:px-10 px-4 gap-16">
      <div class="flex lg:flex-row flex-grow flex-col-reverse justify-between lg:gap-16 gap-10 items-center h-full">
        <div class="basis-3/5">
          <div class="flex flex-col items-center lg:items-start h-full gap-4">
            <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">Développeur</span>
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
              <button class="flex border border-purple-500 items-center text-purple-400 rounded-lg px-4 gap-1 py-2 bg-purple-950 hover:bg-purple-900">
                Télécharger le CV
                <UIcon name="material-symbols:download" class="size-5 ml-2"/>
              </button>
              <div class="flex flex-row gap-4">
                <icon-button icon="bx:bxl-github"
                             href="https://github.com/Ayolos"></icon-button>
                <icon-button icon="bx:bxl-linkedin"
                             href="https://www.linkedin.com/in/antoine-andre-465121196/"></icon-button>
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
    <section id="collaborations" class="px-10 py-30 border-b border-slate-800 isolate bg-gradient-to-b from-slate-900/40 to-slate-950">
      <div class="w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto">
        <h1 class="text-white text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">Collaborations</h1>
        <p class="text-slate-400 text-base sm:text-lg text-muted text-balance mt-3 text-center">Un aperçu des entreprises qui ont marqué mon parcours et enrichi mon expertise technique</p>
        <div class="w-full flex justify-center pt-6">
          <NuxtLink to="/resume" class="text-sm flex items-center text-purple-400 rounded-lg px-4 py-1.5 bg-purple-950 hover:bg-purple-900">
            En savoir plus
          </NuxtLink>
        </div>
        <div class="flex section-content fade-up flex-row justify-center sm:gap-20 gap-2 mt-20">
          <div class="flex flex-col gap-2 card-item">
            <div class="bg-slate-800/50 border border-slate-800 rounded-lg sm:p-6 p-3 flex items-center">
              <img :src="vallourec" alt="Vallourec" class="h-16"/>
            </div>
            <span class="bg-slate-900 text-sm rounded-lg border border-slate-800 w-full font-semibold py-0.5 text-center">Vallourec</span>
          </div>
          <div class="flex flex-col gap-2 card-item">
            <div class="bg-slate-800/50 border border-slate-800 rounded-lg sm:p-6 p-3 flex items-center">
              <img :src="laRedoute" alt="La Redoute" class="h-16"/>
            </div>
            <span class="bg-slate-900 text-sm rounded-lg border border-slate-800 w-full font-semibold py-0.5 text-center">La Redoute</span>
          </div>
          <div class="flex flex-col gap-2 card-item">
            <div class="bg-slate-800/50 border border-slate-800 rounded-lg sm:p-6 p-3 flex items-center">
              <img :src="ultimex" alt="Ultimex" class="h-16"/>
            </div>
            <span class="bg-slate-900 text-sm rounded-lg border border-slate-800 w-full font-semibold py-0.5 text-center">Ultimex</span>
          </div>
        </div>
      </div>

    </section>
    <section id="competences" class="text-white px-10 py-30 border-b border-slate-800 isolate bg-gradient-to-b from-slate-900/40 to-slate-950">
      <div class="w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">Mes compétences</h1>
        <p class="text-slate-400 text-base sm:text-lg text-muted text-balance mt-3 text-center">Voici les domaines dans lesquels je construis la plupart de mes projets, alliant performance et qualité.</p>
        <div class="grid md:grid-cols-3 grid-cols-1 mt-20">
          <div class="p-10 rounded-t-xl md:rounded-t-none md:rounded-l-xl md:border-y md:border-l border-t border-x border-slate-800 bg-gradient-to-br from-green-500/10 from-5% via-transparent via-50% to-transparent">
            <ItemText>
              <template #icon>
                <div class="flex gap-2">
                  <UIcon name="devicon:vuejs" class="size-7 text-purple-500" />
                  <UIcon name="devicon:react" class="size-7 text-purple-500" />
                  <UIcon name="devicon:tailwindcss" class="size-7 text-purple-500" />
                </div>
              </template>
              <template #title>
                Front-end
              </template>
              <template #description>
                Maîtrise des principaux frameworks JavaScript, React et Vue.js, pour créer des interfaces modernes, réactives et ergonomiques.
              </template>
            </ItemText>
            <div class="flex flex-wrap gap-2 mt-6">
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">react</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">vuejs</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">tailwindcss</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">javascript</span>
            </div>
          </div>
          <div class="p-10 border-y border-x md:border-x-0 border-slate-800 bg-gradient-to-br from-red-500/10 from-5% via-transparent via-50% to-transparent">
            <ItemText>
              <template #icon>
                <div class="flex gap-2">
                  <UIcon name="devicon:laravel" class="size-7 text-purple-500" />
                  <UIcon name="devicon:nodejs" class="size-7 text-purple-500" />
                  <UIcon name="devicon:java" class="size-7 text-purple-500" />
                </div>
              </template>
              <template #title>
                Back-end
              </template>
              <template #description>
                Conception d’architectures robustes et scalables avec Laravel, Node.js et Java, permettant de développer des applications fiables et performantes.
              </template>
            </ItemText>
            <div class="flex flex-wrap gap-2 mt-6">
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">laravel</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">java (spring)</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">nodejs</span>
            </div>
          </div>
          <div class="p-10 md:rounded-r-xl rounded-b-xl md:rounded-bl-none md:border-y border-b border-slate-800 border-x bg-gradient-to-br from-blue-500/10 from-5% via-transparent via-50% to-transparent">
            <ItemText>
              <template #icon>
                <div class="flex gap-2">
                  <UIcon name="devicon:mysql" class="size-7 text-purple-500" />
                  <UIcon name="devicon:postgresql" class="size-7 text-purple-500" />
                </div>
              </template>
              <template #title>
                Bases de données
              </template>
              <template #description>
                Gestion et optimisation de MySQL et PostgreSQL pour garantir des systèmes rapides et efficaces.
              </template>
            </ItemText>
            <div class="flex flex-wrap gap-2 mt-6">
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">mysql</span>
              <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">postgresql</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="technologies" class="text-white px-10 py-30 border-b border-slate-800 isolate bg-gradient-to-b from-slate-900/40 to-slate-950">
      <div class="w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">Mes technologies</h1>
        <p class="text-slate-400 text-base sm:text-lg text-muted text-balance mt-3 text-center">Voici les technologies que j’utilise au quotidien et que je maitrise pour créer des applications</p>
        <div class="flex flex-col mt-20">
          <div class="text-xs bg-slate-900 border border-slate-700 w-max px-2 py-1 rounded-lg">
            Développement Web
          </div>
          <div class="grid mt-2 grid-cols-4 rounded-lg border border-slate-800">
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:javascript" class="size-10 text-purple-500" />
              <p class="hidden md:block">JavaScript</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:typescript" class="size-10 text-purple-500" />
              <p class="hidden md:block">TypeScript</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:react" class="size-10 text-purple-500" />
              <p class="hidden md:block">React</p>
            </div>
            <div class="flex flex-row gap-2 items-center border-b border-slate-800 justify-center h-28">
              <UIcon name="devicon:nuxtjs" class="size-10 text-purple-500" />
              <p class="hidden md:block">NuxtJs</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:nodejs" class="size-10 text-purple-500" />
              <p class="hidden md:block">NodeJs</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:laravel" class="size-10 text-purple-500" />
              <p class="hidden md:block">Laravel</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:vuejs" class="size-10 text-purple-500" />
              <p class="hidden md:block">Vuejs</p>
            </div>
            <div class="flex flex-row gap-2 border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:java" class="size-10 text-purple-500" />
              <p class="hidden md:block">Java</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:tailwindcss" class="size-10 text-purple-500" />
              <p class="hidden md:block">Tailwindcss</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:postgresql" class="size-10 text-purple-500" />
              <p class="hidden md:block">Postgresql</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:mysql" class="size-10 text-purple-500" />
              <p class="hidden md:block">MySQL</p>
            </div>
            <div class="flex flex-row gap-2 items-center justify-center h-28">
              <UIcon name="devicon:flutter" class="size-10 text-purple-500" />
              <p class="hidden md:block">Flutter</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-20">
          <div class="text-xs bg-slate-900 border border-slate-700 w-max px-2 py-1 rounded-lg">
            Design
          </div>
          <div class="grid mt-2 grid-cols-4 rounded-lg border border-slate-800">
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:figma" class="size-10 text-purple-500" />
              <p class="hidden md:block">Figma</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:html5" class="size-10 text-purple-500" />
              <p class="hidden md:block">UI / UX</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:html5" class="size-10 text-purple-500" />
              <p class="hidden md:block">Responsive</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-20">
          <div class="text-xs bg-slate-900 border border-slate-700 w-max px-2 py-1 rounded-lg">
            Outils
          </div>
          <div class="grid mt-2 grid-cols-4 rounded-lg border border-slate-800">
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:git" class="size-10 text-purple-500" />
              <p class="hidden md:block">Git</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:github" class="size-10 text-purple-500" />
              <p class="hidden md:block">Github</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-b border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:gitlab" class="size-10 text-purple-500" />
              <p class="hidden md:block">Gitlab</p>
            </div>
            <div class="flex flex-row gap-2 items-center border-b border-slate-800 justify-center h-28">
              <UIcon name="devicon:docker" class="size-10 text-purple-500" />
              <p class="hidden md:block">Docker</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:jetbrains" class="size-10 text-purple-500" />
              <p class="hidden md:block">Jetbrains</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
              <UIcon name="devicon:vscode" class="size-10 text-purple-500" />
              <p class="hidden md:block">VSCode</p>
            </div>
            <div class="flex flex-row gap-2 border-r border-slate-800 items-center justify-center h-28">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="projets" class="mx-10 lg:gap-18 2xl:mx-auto 2xl:w-[1500px] isolate bg-gradient-to-b from-slate-900/40 to-slate-950">
      <div class="flex flex-col gap-20 w-full border-slate-800 py-30 border-x">
        <div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center text-highlighted">Mes projets</h1>
          <p class="text-slate-400 text-base sm:text-lg text-muted text-balance mt-6 text-center">Découvrez une sélection de mes réalisations, où je mets en avant mes compétences en développement web. Chaque projet illustre ma créativité et mon souci du détail dans la conception de solutions uniques.</p>
        </div>
        <UCarousel
            dots
            loop
            :autoplay="{ delay: 600000 }"
            v-slot="{ item, index }"
            :items="items"
            :ui="{ item: 'md:basis-1/2' }"
            class="w-full"
        >
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col-reverse gap-8 items-center h-full">
            <div class="h-[200px]">
              <h4 class="font-bold">{{ item.title }}</h4>
              <p class="text-sm text-gray-400 mb-4">{{ item.description }}</p>
<!--              <ul class="list-disc list-inside text-sm text-gray-400 mb-4">-->
<!--                <li v-for="(point, idx) in item.list" :key="idx">{{ point }}</li>-->
<!--              </ul>-->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(tech, idx) in item.techno" :key="idx" class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">{{ tech }}</span>
              </div>
              <div class="flex flex-row gap-4 item-center pt-4">
                <a v-if="item.github" :href="item.github" class="bg-slate-900 hover:bg-slate-800 border rounded-lg p-2 flex items-center border-slate-700">
                  <UIcon name="mdi:github" class="size-5 text-slate-400"></UIcon>
                </a>
                <a v-if="item.url" :href="item.url" class="flex border border-purple-500 text-sm items-center text-purple-400 rounded-lg px-4 gap-1 py-2 bg-purple-950 hover:bg-purple-900">
                  Visiter le site
                  <UIcon name="ic:round-open-in-new" class="size-5 ml-2"/>
                </a>
              </div>
            </div>
            <img :src="item.image" alt="Carousel Image" class="w-full h-[300px] object-cover object-center object-top rounded"/>
          </div>
        </UCarousel>
      </div>
    </section>
  </div>
</template>

<style scoped>
.neon-circle {
  filter: drop-shadow(0 0 5px #ec4899);

}

@keyframes rotate {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.rotate-gradient-border {
  animation: rotate 5s ease infinite;
  background-size: 200% 200%;
}
</style>

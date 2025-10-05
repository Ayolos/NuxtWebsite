<script setup>
import {onMounted, ref} from 'vue';
import KPIText from "@/components/KPIText.vue";
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

const { t, tm } = useI18n()


const imageLoaded = ref(false);
const circleRef = ref(null);
const { createFadeUpAnimation } = useScrollAnimations()
const customSection = ref(null)

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const items = [
  {
    image: northbotanica,
    description: t('home.projects.northbotanica.description'),
    title: 'NorthBotanica',
    github: 'https://github.com/Ayolos/NorthBotanica',
    list: tm('home.projects.northbotanica.tasks'),
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: nef,
    description: t('home.projects.nef.description'),
    title: 'NEF Bâtiment',
    github: 'https://github.com/Ayolos/SiteProBatiment',
    list: tm('home.projects.nef.tasks'),
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: symphonyapp,
    description: t('home.projects.symphony.description'),
    title: 'Symphony App',
    github: 'https://github.com/Ayolos/SymphonyApp',
    list: tm('home.projects.symphony.tasks'),
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: topsecret,
    description: t('home.projects.tms.description'),
    title: 'TMS',
    list: tm('home.projects.tms.tasks'),
    techno: ['VueJS', 'Laravel', 'InertiaJS', 'Tailwindcss'],
  },
  {
    image: portfolio,
    description: t('home.projects.portfolio.description'),
    title: 'Portfolio',
    github: 'https://github.com/Ayolos/my-website-front',
    url: 'https://ayolos.vercel.app/',
    list: tm('home.projects.portfolio.tasks'),
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
    color: 'from-green-500/10',
    title: t('home.skills.frontend.title'),
    description: t('home.skills.frontend.description'),
    icons: ['devicon:vuejs', 'devicon:react', 'devicon:tailwindcss'],
    badges: ['react', 'vuejs', 'tailwindcss', 'html5', 'css3', 'javascript', 'typescript']
  },
  {
    color: 'from-red-500/10',
    title: t('home.skills.backend.title'),
    description: t('home.skills.backend.description'),
    icons: ['devicon:laravel', 'devicon:nodejs', 'devicon:java'],
    badges: ['laravel', 'nodejs', 'java (spring)', 'expressjs', 'nestjs', 'springboot']
  },
  {
    color: 'from-blue-500/10',
    title: t('home.skills.database.title'),
    description: t('home.skills.database.description'),
    icons: ['devicon:mysql', 'devicon:postgresql'],
    badges: ['mysql', 'postgresql', 'mongodb', 'redis']
  }
]

const technoItems = [
  {
    title: t('home.technologies.webDev'),
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
    title: t('home.technologies.design'),
    techno: [
      {name: 'Figma', icon: 'devicon:figma'},
      {name: 'UI / UX', icon: 'devicon:html5'},
      {name: 'Responsive', icon: 'devicon:html5'}
    ]
  },
  {
    title: t('home.technologies.tools'),
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

const aboutMeItems = computed(() => [
  {
    icon: 'mdi:account-circle',
    title: t('home.aboutMe.quality.title'),
    description: t('home.aboutMe.quality.description')
  },
  {
    icon: 'mdi:handshake-outline',
    title: t('home.aboutMe.learning.title'),
    description: t('home.aboutMe.learning.description')
  },
  {
    icon: 'mdi:rocket-outline',
    title: t('home.aboutMe.problemSolving.title'),
    description: t('home.aboutMe.problemSolving.description')
  }
])

const values = computed(() => tm('home.aboutMe.words').map(item => item.body.static))

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
           class="box flex min-h-[calc(100vh-4rem)] border-b dark:border-slate-800 border-slate-200 flex-col justify-between w-full lg:gap-18 lg:px-20 2xl:w-[1500px] 2xl:mx-auto pt-20 pb-16 sm:px-10 px-4 gap-16">
    <div class="flex lg:flex-row flex-grow flex-col-reverse justify-between lg:gap-16 gap-10 items-center h-full">
      <div class="basis-3/5">
        <div class="flex flex-col items-center lg:items-start h-full gap-4">
          <default-badge>{{ $t('home.badge') }}</default-badge>
          <div class="font-bold">
            <h1 class="lg:text-6xl text-5xl lg:text-start text-center dark:text-white text-black">{{ $t('home.greeting') }}</h1>
            <h1 class="lg:text-6xl text-5xl lg:text-start text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {{ $t('home.name') }}
            </h1>
          </div>
          <p class="text-xl lg:text-start text-center dark:text-gray-400 text-slate-500 font-thin">
            {{ $t('home.subtitle') }}
          </p>
          <div class="flex lg:flex-row flex-col gap-8 items-center w-full h-full pt-6">
            <default-button is="button" bordered @click="downloadCV">
              {{ $t('home.downloadCV') }}
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
              class="max-w-[300px] lg:min-w-[400px] lg:max-w-[600px] lg:w-full aspect-square bg-cover p-1 dark:mix-blend-lighten"/>
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
    <div class="hero hero-content grid grid-cols-2 md:grid-cols-4 gap-16 justify-between items-start rounded-3xl">
      <k-p-i-text class="hero-content" number="5" :text="$t('home.kpi.experience')"></k-p-i-text>
      <k-p-i-text class="hero-content" number="6" :text="$t('home.kpi.projects')"></k-p-i-text>
      <k-p-i-text class="hero-content" number="9" :text="$t('home.kpi.technologies')"></k-p-i-text>
      <k-p-i-text class="hero-content" number="5" :text="$t('home.kpi.studies')"></k-p-i-text>
    </div>
  </section>
  <section-template id="collaborations">
    <template #title>{{ $t('home.collaborations.title') }}</template>
    <template #description>{{ $t('home.collaborations.description') }}</template>
    <template #extra>
      <div class="flex justify-center mt-4">
        <default-button is="NuxtLink" bordered size="sm" to="/resume">
          {{ $t('home.collaborations.learnMore') }}
          <UIcon class="size-5" name="material-symbols:arrow-right-alt"/>
        </default-button>
      </div>
    </template>
    <div class="flex section-content fade-up flex-row justify-center sm:gap-20 gap-2">
      <div class="flex flex-row gap-6 card-item">
        <div v-for="companyItem in companyItems">
          <div class="dark:bg-slate-800/50 bg-slate-200/50 border dark:border-slate-800 border-slate-200 rounded-lg sm:p-6 p-3 flex items-center">
            <img :alt="companyItem.name" :src="companyItem.logo" class="h-16"/>
          </div>
          <span
              class="block mt-2 dark:bg-slate-900 bg-slate-200/50 text-sm dark:text-white text-black rounded-full border dark:border-slate-800 border-slate-200 font-semibold py-0.5 text-center">{{
              companyItem.name
            }}</span>
        </div>
      </div>
    </div>
  </section-template>
  <section-template id="aboutMe" type="row" align="left" basis="1/2">
    <template #title>{{ $t('home.aboutMe.title') }}</template>
    <template #description>{{ $t('home.aboutMe.description') }}</template>
    <template #extra>
      <div class="w-full overflow-hidden relative mt-10 py-4 flex">
        <div class="flex animate-scroll whitespace-nowrap dark:text-slate-200 text-slate-800 text-lg font-bold">
      <span
          v-for="(value, index) in values"
          :key="index"
          class="mx-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        {{ value }}
      </span>

          <!-- Clone pour créer l'effet de boucle infinie -->
          <span
              v-for="(value, index) in values"
              :key="'clone-' + index"
              class="mx-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
        {{ value }}
      </span>
        </div>

        <!-- léger dégradé sur les bords pour un effet "fondu" -->
        <div class="absolute left-0 top-0 h-full w-26 bg-gradient-to-r dark:from-slate-950 from-slate-50 to-transparent pointer-events-none"></div>
        <div class="absolute right-0 top-0 h-full w-26 bg-gradient-to-l dark:from-slate-950 from-slate-50 to-transparent pointer-events-none"></div>
      </div>
    </template>
    <div class="flex flex-col gap-6 dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300 px-8 py-10 rounded-lg">
      <div v-for="aboutItem in aboutMeItems" class="flex flex-row gap-4 items-center">
        <div class="dark:bg-slate-950 bg-slate-50 flex p-2 rounded-lg border dark:border-slate-800 border-slate-200">
          <UIcon :name="aboutItem.icon" class="size-6 dark:text-white text-black"/>
        </div>
        <div>
          <h1 class="font-bold">{{ aboutItem.title }}</h1>
          <p class="text-slate-500">{{ aboutItem.description }}</p>
        </div>
      </div>
    </div>
  </section-template>
  <section-template id="competences">
    <template #title>{{ $t('home.skills.title') }}</template>
    <template #description>{{ $t('home.skills.description') }}</template>
    <div class="grid md:grid-cols-3 grid-cols-1">
      <div
          v-for="(skillsItem, index) in skillsItems"
          :key="index"
          :class="[
                skillsItem.color,
                {
                    'border-t rounded-t-xl': index === 0,
                    'md:border-l md:rounded-l-xl md:rounded-t-none': index === 0,

                    'rounded-b-xl': index === skillsItems.length - 1,
                    'md:rounded-r-xl md:rounded-bl-none': index === skillsItems.length - 1
                }
            ]"
          class="bg-gradient-to-br from-5% via-transparent via-50% to-transparent p-10 dark:border-slate-800 border-slate-300 border-x border-b md:border-x-0 md:border-t md:border-b md:border-r"
      >
        <div class="mb-2 flex gap-2 text-purple-500">
          <UIcon v-for="icon in skillsItem.icons" :name="icon" class="size-7"/>
        </div>
        <h4 class="dark:text-white text-black font-semibold truncate">
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
    <template #title>{{ $t('home.technologies.title') }}</template>
    <template #description>{{ $t('home.technologies.description') }}</template>
    <div v-for="technoItem in technoItems" class="flex flex-col w-full">
      <div class="text-xs dark:bg-slate-900 bg-slate-200 border dark:border-slate-700 border-slate-300 dark:text-white text-black w-max px-2 py-1 rounded-lg">
        {{ technoItem.title }}
      </div>
      <div class="grid mt-2 grid-cols-4 rounded-lg border dark:border-slate-800 border-slate-300">
        <div
            v-for="techno in technoItem.techno"
            :class="{
                'border-r': technoItem.techno.indexOf(techno) % 4 !== 3,
                'border-b': Math.floor(technoItem.techno.indexOf(techno) / 4) < Math.floor((technoItem.techno.length - 1) / 4)
              }"
            class="flex flex-row gap-2 dark:border-slate-800 border-slate-300 items-center justify-center h-28"
        >
          <UIcon :name="techno.icon" class="size-10 text-purple-500"/>
          <p class="hidden md:block">{{ techno.name }}</p>
        </div>
      </div>
    </div>
  </section-template>
  <section-template id="projets" :bottomBorder="false" bordered>
    <template #title>{{ $t('home.projects.title') }}</template>
    <template #description>{{ $t('home.projects.description') }}</template>
    <UCarousel
        v-slot="{ item, index }"
        :autoplay="{ delay: 600000 }"
        :items="items"
        :ui="{ item: 'md:basis-1/2' }"
        class="w-full"
        dots
        loop
    >
      <div class="dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300 rounded-lg p-4 flex flex-col-reverse gap-8 items-center h-full">
        <div class="sm:h-[250px] h-[300px]">
          <h4 class="font-bold text-black dark:text-white">{{ item.title }}</h4>
          <p class="text-sm text-gray-500 mb-4">{{ item.description }}</p>
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
              {{ $t('home.projects.viewProject') }}
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

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: inline-flex;
  animation: scroll 40s linear infinite;
}
</style>
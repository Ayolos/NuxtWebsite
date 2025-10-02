<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

// Constants
const NAVIGATION_BUTTONS = [
  { label: 'Expérience', value: 'experience' },
  { label: 'Formation', value: 'parcours' },
  { label: 'Profil', value: 'about' }
]

const SECTIONS = {
  experience: {
    title: 'Mon expérience',
    description: `Au cours de mes études, j'ai eu la chance de faire plusieurs alternances qui m'ont permis de renforcer mes
      compétences en développement tout en découvrant le fonctionnement du monde de l'entreprise.`,
    items: [
      {
        period: 'Sept 2023 - Sept 2024',
        title: 'ALTERNANCE CHEF DE PROJET, Ultimex',
        tasks: [
          'Création d\'un TMS (Transportation Management System)',
          'Apprentissage de Laravel NOVA',
          'Mise en production sur un serveur dédié',
          'Rédaction d\'un cahier des charges'
        ],
        technologies: ['laravel', 'vuejs', 'tailwindcss', 'laravel NOVA']
      },
      {
        period: 'Sept 2022 - Sept 2023',
        title: 'ALTERNANCE DÉVELOPPEUR WEB, La Redoute',
        tasks: [
          'Analyse des performances du site web',
          'Surveillance des cores web vitals à l\'aide de Dynatrace',
          'Création de dashboard Dynatrace',
          'Intégrateur front-end'
        ],
        technologies: ['javascript', 'SASS', 'jira', 'dynatrace']
      },
      {
        period: 'Sept 2021 - Sept 2022',
        title: 'ALTERNANCE DÉVELOPPEUR, Vallourec',
        tasks: [
          'Développement de script python',
          'Apport d\'une méthodologie DEVOPS',
          'Création de container docker',
          'Automatisation de pipeline airflow'
        ],
        technologies: ['python', 'AWS', 'docker', 'airflow']
      }
    ]
  },
  parcours: {
    title: 'Ma formation',
    description: `Passionné d'informatique depuis mon enfance et fasciné par le monde technologique, j'ai naturellement choisi
      de faire de cette passion mon métier.`,
    items: [
      {
        period: 'Sept 2022 - Sept 2024',
        title: 'Master 2 Développement Web',
        description: 'UNIVERSITÉ CATHOLIQUE, LILLE'
      },
      {
        period: 'Sept 2021 - Mai 2022',
        title: 'Licence 3 Sciences du numérique',
        description: 'UNIVERSITÉ CATHOLIQUE, LILLE'
      },
      {
        period: 'Sept 2019 - Sept 2021',
        title: 'DUT Informatique',
        description: 'UNIVERSITÉ POLYTECHNIQUE, MAUBEUGE'
      }
    ]
  },
  about: {
    title: 'Mon profil',
    description: `Passionné par les technologies, l'informatique est un choix évident pour moi. J'adore explorer les dernières
      innovations et relever des défis techniques.`,
    items: [
      { label: 'Nom / Prénom', content: 'Antoine André' },
      { label: 'Téléphone', content: '07 78 19 27 97' },
      { label: 'Age', content: '24 ans' },
      { label: 'Localisation', content: 'Lille' },
      { label: 'Permis', content: 'B + Voiture' },
      { label: 'Email', content: 'ayolos14@gmail.com' },
      { label: 'Status', content: 'Ouvert aux opportunités', isStatus: true }
    ]
  }
}

// State
const cvSection = ref(null)
const activeTab = ref('experience')
let animation = null

// Computed
const currentSection = computed(() => SECTIONS[activeTab.value])

// Methods
const changeTab = (tab) => {
  activeTab.value = tab
}

// Lifecycle
onMounted(() => {
  animation = gsap.from(cvSection.value, {
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
  })
})

onBeforeUnmount(() => {
  animation?.kill()
})
</script>

<template>
  <div
      ref="cvSection"
      class="py-20 lg:py-24 lg:h-[calc(100vh-4rem)] 2xl:w-[1500px] 2xl:mx-auto lg:px-20 sm:px-10 px-4"
  >
    <div class="flex lg:flex-row flex-col gap-14 justify-center h-full">
      <!-- Sidebar -->
      <div class="flex flex-col gap-10 basis-2/6 w-full">
        <div class="flex flex-col gap-5">
          <h1 class="text-4xl font-bold text-white text-center lg:text-start">
            Mon CV
          </h1>
          <p class="text-gray-400 text-center lg:text-start">
            Découvrez en détail mon parcours et qui je suis
          </p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex flex-col gap-4 lg:w-full w-full items-center">
          <button
              v-for="button in NAVIGATION_BUTTONS"
              :key="button.value"
              @click="changeTab(button.value)"
              class="sm:w-96 w-full lg:w-full shadow-xl py-2 text-sm rounded-md transition duration-500 ease-in-out outline outline-none hover:scale-105 hover:outline-pink-500"
              :class="activeTab === button.value
              ? 'bg-purple-950 ring ring-purple-500 text-purple-300'
              : 'bg-[#0a0f23] text-white ring-1 ring-slate-800'"
          >
            {{ button.label }}
          </button>
        </div>
      </div>

      <!-- Content -->
      <transition name="slide-fade" mode="out-in">
        <div :key="activeTab" class="basis-4/6 w-full h-full flex flex-col gap-7">
          <!-- Section Header -->
          <div>
            <h1 class="text-3xl text-white font-semibold lg:text-start text-center">
              {{ currentSection.title }}
            </h1>
            <p class="text-gray-400 mt-2 text-sm lg:text-start text-center">
              {{ currentSection.description }}
            </p>
          </div>

          <!-- Section Content -->
          <div class="overflow-y-auto scrollbar-hide">
            <!-- Profile Section -->
            <div
                v-if="activeTab === 'about'"
                class="flex flex-col bg-[#080e21] rounded-lg border border-slate-800 shadow-2xl"
            >
              <div
                  v-for="(info, index) in currentSection.items"
                  :key="index"
                  :class="{ 'border-b border-slate-800': index < currentSection.items.length - 1 }"
                  class="flex sm:flex-row flex-col items-center gap-6 py-6 px-12"
              >
                <label class="text-gray-400 text-sm">
                  {{ info.label }}
                </label>
                <p class="text-white">
                  <span
                      v-if="info.isStatus"
                      class="border border-purple-500 bg-purple-950 text-purple-400 py-2 text-sm px-4 rounded-full"
                  >
                    {{ info.content }}
                  </span>
                  <template v-else>
                    {{ info.content }}
                  </template>
                </p>
              </div>
            </div>

            <!-- Experience & Education Sections -->
            <div v-else class="grid grid-cols-1 gap-4">
              <div
                  v-for="(item, index) in currentSection.items"
                  :key="index"
                  class="flex bg-[#080E21] flex-col gap-3 shadow-xl border border-slate-800 rounded-md p-5"
              >
                <p class="text-purple-500 text-xs">
                  {{ item.period }}
                </p>
                <h2 class="text-white text-sm">
                  {{ item.title }}
                </h2>

                <!-- Tasks List -->
                <ul
                    v-if="item.tasks"
                    class="list-disc list-outside pl-3.5 text-gray-500 text-sm marker:text-purple-500"
                >
                  <li v-for="(task, taskIndex) in item.tasks" :key="taskIndex">
                    {{ task }}
                  </li>
                </ul>

                <!-- Description -->
                <p v-else class="text-slate-400 text-sm">
                  {{ item.description }}
                </p>

                <!-- Technologies -->
                <div v-if="item.technologies" class="flex flex-wrap gap-2 mt-3">
                  <span
                      v-for="(tech, techIndex) in item.technologies"
                      :key="techIndex"
                      class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
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

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import DefaultBadge from "~/components/badge/DefaultBadge.vue";

const { t, tm } = useI18n()

// Constants
const NAVIGATION_BUTTONS = computed(() => [
  { label: t('resume.tabs.experience'), value: 'experience' },
  { label: t('resume.tabs.education'), value: 'parcours' },
  { label: t('resume.tabs.profile'), value: 'about' }
])

const SECTIONS = computed(() => ({
  experience: {
    title: t('resume.experience.title'),
    description: t('resume.experience.description'),
    items: [
      {
        period: t('resume.experience.ultimex.period'),
        title: t('resume.experience.ultimex.title'),
        tasks: tm('resume.experience.ultimex.tasks').map(task => typeof task === 'string' ? task : task.body?.static || task),
        technologies: ['laravel', 'vuejs', 'tailwindcss', 'laravel NOVA']
      },
      {
        period: t('resume.experience.laredoute.period'),
        title: t('resume.experience.laredoute.title'),
        tasks: tm('resume.experience.laredoute.tasks').map(task => typeof task === 'string' ? task : task.body?.static || task),
        technologies: ['javascript', 'SASS', 'jira', 'dynatrace']
      },
      {
        period: t('resume.experience.vallourec.period'),
        title: t('resume.experience.vallourec.title'),
        tasks: tm('resume.experience.vallourec.tasks').map(task => typeof task === 'string' ? task : task.body?.static || task),
        technologies: ['python', 'AWS', 'docker', 'airflow']
      }
    ]
  },
  parcours: {
    title: t('resume.education.title'),
    description: t('resume.education.description'),
    items: [
      {
        period: t('resume.education.master.period'),
        title: t('resume.education.master.title'),
        description: t('resume.education.master.description')
      },
      {
        period: t('resume.education.license.period'),
        title: t('resume.education.license.title'),
        description: t('resume.education.license.description')
      },
      {
        period: t('resume.education.dut.period'),
        title: t('resume.education.dut.title'),
        description: t('resume.education.dut.description')
      }
    ]
  },
  about: {
    title: t('resume.profile.title'),
    description: t('resume.profile.description'),
    items: [
      { label: t('resume.profile.name'), content: t('resume.profile.values.name') },
      { label: t('resume.profile.phone'), content: t('resume.profile.values.phone') },
      { label: t('resume.profile.age'), content: t('resume.profile.values.age') },
      { label: t('resume.profile.location'), content: t('resume.profile.values.location') },
      { label: t('resume.profile.license'), content: t('resume.profile.values.license') },
      { label: t('resume.profile.email'), content: t('resume.profile.values.email') },
      { label: t('resume.profile.status'), content: t('resume.profile.statusValue'), isStatus: true }
    ]
  }
}))

// State
const cvSection = ref(null)
const activeTab = ref('experience')
let animation = null

// Computed
const currentSection = computed(() => SECTIONS.value[activeTab.value])

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
      class="py-20 lg:py-24 lg:h-[calc(100vh-4rem)] 2xl:w-[1500px] 2xl:mx-auto lg:px-20 sm:px-10 px-5"
  >
    <div class="flex lg:flex-row flex-col gap-14 justify-center h-full">
      <!-- Sidebar -->
      <div class="flex flex-col gap-10 basis-2/6 w-full">
        <div class="flex flex-col gap-5">
          <h1 class="text-4xl font-bold dark:text-white text-black text-center lg:text-start">
            {{ $t('resume.title') }}
          </h1>
          <p class="text-gray-500 text-center lg:text-start">
            {{ $t('resume.subtitle') }}
          </p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex flex-col gap-4 w-full items-center">
          <button
              v-for="button in NAVIGATION_BUTTONS"
              :key="button.value"
              @click="changeTab(button.value)"
              class="w-full py-2 text-sm rounded-md transition duration-500 ease-in-out outline outline-none hover:scale-105 hover:outline-purple-500"
              :class="activeTab === button.value
              ? 'dark:bg-purple-950 bg-purple-100 ring dark:ring-purple-500 ring-purple-300 dark:text-purple-300 text-purple-500'
              : 'dark:bg-slate-900 bg-slate-100 dark:text-white text-black ring-1 dark:ring-slate-800 ring-slate-200'"
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
            <h1 class="text-3xl dark:text-white text-black font-semibold lg:text-start text-center">
              {{ currentSection.title }}
            </h1>
            <p class="text-gray-500 mt-2 text-sm lg:text-start text-center">
              {{ currentSection.description }}
            </p>
          </div>

          <!-- Section Content -->
          <div class="overflow-y-auto scrollbar-hide">
            <!-- Profile Section -->
            <div
                v-if="activeTab === 'about'"
                class="flex flex-col dark:bg-slate-900 bg-slate-100 rounded-lg border dark:border-slate-800 border-slate-200"
            >
              <div
                  v-for="(info, index) in currentSection.items"
                  :key="index"
                  :class="{ 'border-b dark:border-slate-800 border-slate-200': index < currentSection.items.length - 1 }"
                  class="flex sm:flex-row flex-col items-center gap-6 py-6 px-12"
              >
                <label class="text-slate-500 text-sm">
                  {{ info.label }}
                </label>
                <p class="dark:text-white text-black">
                  <DefaultBadge
                      v-if="info.isStatus"
                  >
                    {{ info.content }}
                  </DefaultBadge>
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
                  class="flex dark:bg-slate-900 bg-slate-100 flex-col gap-3 border dark:border-slate-800 border-slate-200 rounded-md p-5"
              >
                <p class="text-purple-500 text-xs">
                  {{ item.period }}
                </p>
                <h2 class="dark:text-white text-black text-sm">
                  {{ item.title }}
                </h2>

                <!-- Tasks List -->
                <ul
                    v-if="item.tasks"
                    class="list-disc list-outside pl-3.5 text-slate-500 text-sm marker:text-purple-500"
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
                  <DefaultBadge
                      v-for="(tech, techIndex) in item.technologies"
                      :key="techIndex"
                  >
                    {{ tech }}
                  </DefaultBadge>
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
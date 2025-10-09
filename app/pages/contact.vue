<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import gsap from 'gsap'
import InputForm from "~/components/form/InputForm.vue";
import DefaultButton from "~/components/button/DefaultButton.vue";
import {useHead, useSeoMeta} from "#imports";

const { t, locale } = useI18n()

const title = computed(() => t('seo.contact.title'))
const description = computed(() => t('seo.contact.description'))

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'canonical', href: 'https://ayolosv2.vercel.app' }
  ],
})

// Form state
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  message: ''
})

const mailStatus = ref({
  loading: false,
  sent: false,
  error: false
})

const contactSection = ref(null)
let animation = null

// Computed
const statusIcon = computed(() => {
  if (mailStatus.value.loading) return 'eos-icons:bubble-loading'
  if (mailStatus.value.sent) return 'line-md:email-check-twotone'
  if (mailStatus.value.error) return 'line-md:email-remove-twotone'
  return null
})

const statusColor = computed(() => {
  if (mailStatus.value.sent) return 'text-green-500'
  if (mailStatus.value.error) return 'text-red-500'
  return 'text-purple-500'
})

// Contact info data
const contactInfo = computed(() => [
  {
    icon: 'ic:twotone-phone',
    label: t('contact.info.phone'),
    content: t('contact.info.values.phone')
  },
  {
    icon: 'ic:twotone-email',
    label: t('contact.info.email'),
    content: t('contact.info.values.email')
  },
  {
    icon: 'ic:twotone-place',
    label: t('contact.info.location'),
    content: t('contact.info.values.location')
  },
  {
    icon: 'mdi:linkedin',
    label: t('contact.info.linkedin'),
    content: t('contact.info.values.linkedin'),
    link: 'https://www.linkedin.com/in/antoine-andre-465121196/'
  }
])

// Methods
const resetStatus = () => {
  setTimeout(() => {
    mailStatus.value.sent = false
    mailStatus.value.error = false
  }, 3000)
}

const resetForm = () => {
  form.value = {
    nom: '',
    prenom: '',
    email: '',
    message: ''
  }
}

const envoyerMail = async () => {
  mailStatus.value.loading = true

  try {
    await axios.post('https://my-website-back.vercel.app/envoyer-mail', form.value)
    resetForm()
    mailStatus.value.sent = true
    resetStatus()
  } catch {
    mailStatus.value.error = true
    resetStatus()
  } finally {
    mailStatus.value.loading = false
  }
}

// Lifecycle
onMounted(() => {
  animation = gsap.from(contactSection.value, {
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
      ref="contactSection"
      class="flex-col min-h-[calc(100vh-4rem)] items-center py-20 lg:py-24 h-max w-full lg:px-20 sm:px-10 px-4 2xl:w-[1500px] 2xl:mx-auto flex gap-10"
  >
    <!-- Header -->
    <div class="flex flex-col gap-4 text-center w-full">
      <h1 class="text-5xl font-bold dark:text-white text-black">{{ $t('contact.title') }}</h1>
      <p class="text-gray-500">
        {{ $t('contact.description') }}
      </p>
    </div>

    <!-- Content -->
    <div class="flex lg:flex-row flex-col-reverse h-full xl:w-3/4 w-full">
      <!-- Form Section -->
      <div class="dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 w-full basis-3/5 h-full p-8 lg:rounded-l-xl max-lg:rounded-b-xl">
        <form @submit.prevent="envoyerMail">
          <div class="flex flex-col gap-4">
            <!-- Name fields -->
            <div class="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <InputForm v-model="form.nom" type="input" value="nom">
                {{ $t('contact.form.lastName') }}
              </InputForm>
              <InputForm v-model="form.prenom" type="input" value="prenom">
                {{ $t('contact.form.firstName') }}
              </InputForm>
            </div>

            <!-- Email field -->
            <InputForm v-model="form.email" type="input" value="email">
              {{ $t('contact.form.email') }}
            </InputForm>
            <InputForm v-model="form.message" type="textarea" value="message">
              {{ $t('contact.form.message') }}
            </InputForm>
          </div>

          <!-- Submit button and status -->
          <div class="flex flex-row gap-4 h-full items-center pt-4">
            <DefaultButton
                @click="envoyerMail"
                :disabled="mailStatus.loading"
                type="submit"
                bordered
                size="md"
            >
              {{ $t('contact.form.send') }}
            </DefaultButton>

            <!-- Status icons -->
            <div v-if="statusIcon" class="flex items-center justify-center p-1.5">
              <UIcon
                  :name="statusIcon"
                  :class="[
                  mailStatus.loading ? 'text-3xl' : 'h-7 w-7',
                  statusColor
                ]"
              />
            </div>
          </div>
        </form>
      </div>

      <!-- Contact Info Section -->
      <div
          class="z-0 p-10 border-t border-l border-r md:border-t lg:border-b lg:border-r lg:border-l-0 dark:border-slate-800 border-slate-200
             bg-gradient-to-t from-purple-500/10 from-50% via-purple-500/10 via-20% to-transparent overflow-hidden
             basis-2/5 lg:rounded-r-xl max-lg:rounded-t-xl relative dark:bg-[#0a0f23] bg-slate-200
             max-sm:grid-cols-1 grid grid-cols-2 lg:grid-cols-1 justify-center items-center gap-8"
      >
        <div
            v-for="(info, index) in contactInfo"
            :key="index"
            class="flex flex-col gap-2"
        >
          <div class="flex items-center gap-4">
            <div class="flex dark:bg-transparent bg-slate-200/50 rounded-xl border dark:border-slate-700 border-slate-400 p-2 w-max">
              <UIcon :name="info.icon" class="text-purple-500 size-7" />
            </div>
            <div>
              <span class="text-slate-500 text-sm">{{ info.label }}</span>
              <div class="dark:text-white text-black">
                <a
                    v-if="info.link"
                    :href="info.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-pink-500 transition-colors"
                >
                  {{ info.content }}
                </a>
                <span v-else>{{ info.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
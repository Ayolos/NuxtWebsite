<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import gsap from 'gsap'
import InputForm from "~/components/form/InputForm.vue";

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
const contactInfo = [
  { icon: 'ic:twotone-phone', label: 'Téléphone', content: '07 78 19 27 97' },
  { icon: 'ic:twotone-email', label: 'Email', content: 'ayolos14@gmail.com' },
  { icon: 'ic:twotone-place', label: 'Lieu', content: 'Lille' },
  {
    icon: 'mdi:linkedin',
    label: 'Linkedin',
    content: 'Antoine ANDRE',
    link: 'https://www.linkedin.com/in/antoine-andre-465121196/'
  }
]

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
      class="flex-col items-center py-20 lg:py-24 h-max w-full lg:px-20 sm:px-10 px-4 2xl:w-[1500px] 2xl:mx-auto flex gap-10"
  >
    <!-- Header -->
    <div class="flex flex-col gap-4 text-center w-full">
      <h1 class="text-5xl font-bold text-white">Contact</h1>
      <p class="text-gray-500">
        Si vous êtes intéressé par mon profil et souhaitez discuter d'opportunités de
        collaboration, n'hésitez pas à me contacter. Je serais ravi d'échanger avec vous sur mes compétences, mes
        projets et mes passions. Vous pouvez me joindre par email ou via mes réseaux sociaux ci-dessous.
      </p>
    </div>

    <!-- Content -->
    <div class="flex lg:flex-row flex-col-reverse h-full xl:w-3/4 w-full">
      <!-- Form Section -->
      <div class="bg-slate-900 border border-slate-800 w-full basis-3/5 h-full p-8 lg:rounded-l-xl max-lg:rounded-b-xl shadow-2xl">
        <form @submit.prevent="envoyerMail">
          <div class="flex flex-col gap-4">
            <!-- Name fields -->
            <div class="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <InputForm v-model="form.nom" type="input" value="nom">Nom</InputForm>
              <InputForm v-model="form.prenom" type="input" value="prenom">Prénom</InputForm>
            </div>

            <!-- Email field -->
            <InputForm v-model="form.email" type="input" value="email">Adresse mail</InputForm>
            <InputForm v-model="form.message" type="textarea" value="message">Message</InputForm>
          </div>

          <!-- Submit button and status -->
          <div class="flex flex-row gap-4 h-full items-center pt-4">
            <button
                type="submit"
                :disabled="mailStatus.loading"
                class="flex border border-purple-500 items-center text-purple-400 rounded-lg px-4 gap-1 py-2 bg-purple-950 hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Envoyer
            </button>

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
          class="z-0 p-10 border-t border-l border-r md:border-t lg:border-b lg:border-r lg:border-l-0 border-slate-800
             bg-gradient-to-t from-purple-500/10 from-5% via-purple-500/10 via-10% to-transparent overflow-hidden
             basis-2/5 lg:rounded-r-xl max-lg:rounded-t-xl shadow-2xl relative bg-[#0a0f23]
             max-sm:grid-cols-1 grid grid-cols-2 lg:grid-cols-1 justify-center items-center gap-8"
      >
        <div
            v-for="(info, index) in contactInfo"
            :key="index"
            class="flex flex-col gap-2"
        >
          <div class="flex items-center gap-4">
            <div class="flex bg-transparent rounded-xl border border-slate-700 p-2 w-max">
              <UIcon :name="info.icon" class="text-purple-500 size-7" />
            </div>
            <div>
              <span class="text-gray-400 text-sm">{{ info.label }}</span>
              <div class="text-white">
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
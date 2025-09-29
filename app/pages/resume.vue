<script setup>

import MainLayout from "@/layouts/default.vue";
import ListItem from "@/components/listITem/ListItem.vue";
import ListItemContentTemplate from "@/components/listITem/ListItemContentTemplate.vue";
import ListItemCard from "@/components/listITem/ListItemCard.vue";
import ListLogoCard from "@/components/listITem/ListLogoCard.vue";
import ListLabelTemplate from "@/components/listITem/ListLabelTemplate.vue";
import gsap from "gsap";

const buttons = [
  {
    label: 'Expérience',
    value: 'experience'
  },
  {
    label: 'Formation',
    value: 'parcours'
  },
  {
    label: 'Profil',
    value: 'about'
  }
]
const cvSection = ref(null)

onMounted(() => {
  gsap.from(cvSection.value, {
    duration: 1,
    opacity: 0,
    y: 50,           // démarre 50px plus bas
    ease: 'power3.out'
  })
})

</script>

<template>
    <div ref="cvSection" class="py-20 lg:py-24 lg:h-[calc(100vh-4rem)] 2xl:w-[1500px] 2xl:mx-auto lg:px-20 sm:px-10 px-4">
      <list-item :buttons="buttons">
        <template #title>
          Mon CV
        </template>
        <template #description>
          Découvrez en détail mon parcours et qui je suis
        </template>
        <template #experience>
          <list-item-content-template>
            <template #title>
              Mon expérience
            </template>
            <template #description>
              Au cours de mes études, j'ai eu la chance de faire plusieurs alternances qui m'ont permis de renforcer mes
              compétences en développement tout en découvrant le fonctionnement du monde de l'entreprise. Ces expériences
              ont
              été essentielles pour appliquer mes connaissances et mieux comprendre les réalités professionnelles.
            </template>
            <template #content>
              <div class="grid grid-cols-1 gap-4">
                <list-item-card type="list">
                  <template #date>
                    Sept 2023 - Sept 2024
                  </template>
                  <template #title>
                    ALTERNANCE CHEF DE PROJET, Ultimex
                  </template>
                  <template #lists>
                    <li>Création d’un TMS (Transportation Management System)</li>
                    <li>Apprentissage de Laravel NOVA</li>
                    <li>Mise en production sur un serveur dédié</li>
                    <li>Rédaction d’un cahier des charges</li>
                  </template>
                  <template #extra>
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">laravel</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">vuejs</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">tailwindcss</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">laravel NOVA</span>
                    </div>
                  </template>
                </list-item-card>
                <list-item-card type="list">
                  <template #date>
                    Sept 2022 - Sept 2023
                  </template>
                  <template #title>
                    ALTERNANCE DÉVELOPPEUR WEB, La Redoute
                  </template>
                  <template #lists>
                    <li>Analyse des performances du site web</li>
                    <li>Surveillance des cores web vitals à l'aide de Dynatrace</li>
                    <li>Création de dashboard Dynatrace</li>
                    <li>Intégrateur front-end</li>
                  </template>
                  <template #extra>
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">javascript</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">SASS</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">jira</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">dynatrace</span>
                    </div>
                  </template>
                </list-item-card>
                <list-item-card type="list">
                  <template #date>
                    Sept 2021 - Sept 2022
                  </template>
                  <template #title>
                    ALTERNANCE DÉVELOPPEUR, Vallourec
                  </template>
                  <template #lists>
                    <li>Développement de script python</li>
                    <li>Apport d'une méthodologie DEVOPS</li>
                    <li>Création de container docker</li>
                    <li>Automatisation de pipeline airflow</li>
                  </template>
                  <template #extra>
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">python</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">AWS</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">docker</span>
                      <span class="font-thin text-sm bg-purple-950 text-purple-400 px-3 border border-purple-600 py-0.5 rounded-full">airflow</span>
                    </div>
                  </template>
                </list-item-card>
              </div>
            </template>
          </list-item-content-template>
        </template>
        <template #parcours>
          <list-item-content-template>
            <template #title>
              Ma formation
            </template>
            <template #description>
              Passionné d'informatique depuis mon enfance et fasciné par le monde technologique, j'ai naturellement choisi
              de faire de cette passion mon métier. Ce domaine me motive par son innovation constante, et c'est ce qui m'a
              poussé à suivre un parcours dédié à l'informatique et au développement pour en faire ma carrière.
            </template>
            <template #content>
              <div class="grid grid-cols-1 gap-4">
                <list-item-card>
                  <template #date>
                    Sept 2022 - Sept 2024
                  </template>
                  <template #title>
                    Master 2 Développement Web
                  </template>
                  <template #description>
                    UNIVERSITÉ CATHOLIQUE, LILLE
                  </template>
                </list-item-card>
                <list-item-card>
                  <template #date>
                    Sept 2021 - Mai 2022
                  </template>
                  <template #title>
                    Licence 3 Sciences du numérique
                  </template>
                  <template #description>
                    UNIVERSITÉ CATHOLIQUE, LILLE
                  </template>
                </list-item-card>
                <list-item-card>
                  <template #date>
                    Sept 2019 - Sept 2021
                  </template>
                  <template #title>
                    DUT Informatique
                  </template>
                  <template #description>
                    UNIVERSITÉ POLYTECHNIQUE, MAUBEUGE
                  </template>
                </list-item-card>
              </div>
            </template>
          </list-item-content-template>
        </template>
        <template #about>
          <list-item-content-template>
            <template #title>
              Mon profil
            </template>
            <template #description>
              Passionné par les technologies, l'informatique est un choix évident pour moi. J'adore explorer les dernières innovations et relever des défis techniques. En dehors du travail, je suis quelqu'un qui aime sortir, voyager et profiter des activités en plein air, que ce soit en découvrant de nouveaux lieux ou en partageant des moments avec mes amis.
            </template>
            <template #content>
              <div class="flex flex-col bg-[#080e21] rounded-lg border border-slate-800 shadow-2xl">
                <list-label-template :border="true">
                  <template #label>
                    Nom / Prénom
                  </template>
                  <template #content>
                    Antoine André
                  </template>
                </list-label-template>
                <list-label-template :border="true">
                  <template #label>
                    Téléphone
                  </template>
                  <template #content>
                    07 78 19 27 97
                  </template>
                </list-label-template>
                <list-label-template :border="true">
                  <template #label>
                    Age
                  </template>
                  <template #content>
                    24 ans
                  </template>
                </list-label-template>
                <list-label-template :border="true">
                  <template #label>
                    Localisation
                  </template>
                  <template #content>
                    Lille
                  </template>
                </list-label-template>
                <list-label-template :border="true">
                  <template #label>
                    Permis
                  </template>
                  <template #content>
                    B + Voiture
                  </template>
                </list-label-template>
                <list-label-template :border="true">
                  <template #label>
                    Email
                  </template>
                  <template #content>
                    ayolos14@gmail.com
                  </template>
                </list-label-template>
                <list-label-template>
                  <template #label>
                    Status
                  </template>
                  <template #content>
                    <span class="border border-purple-500 bg-purple-950 text-purple-400 py-2 text-sm px-4 rounded-full text-background">
                      Ouvert aux opportunités
                    </span>
                  </template>
                </list-label-template>
              </div>
            </template>
          </list-item-content-template>
        </template>
      </list-item>
    </div>
</template>

<style scoped>

</style>
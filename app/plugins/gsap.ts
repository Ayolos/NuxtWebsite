import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Draggable } from 'gsap/Draggable'
import { defineNuxtPlugin } from 'nuxt/app'

gsap.registerPlugin(ScrollTrigger)
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('gsap', gsap)
    nuxtApp.provide('ScrollTrigger', ScrollTrigger)
})
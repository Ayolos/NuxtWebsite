// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/content'],
  app: {
    head: {
      title: 'Portfolio Antoine',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // ✅ favicon principale
        // Optionnel : version .ico
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
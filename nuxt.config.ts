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
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fr',
    locales: [
        { code: 'fr', name: 'Français', file: 'fr.json', flag: 'twemoji:flag-france' },
        { code: 'en', name: 'English', file: 'en.json', flag: 'twemoji:flag-for-flag-united-kingdom' }
    ]
  },
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
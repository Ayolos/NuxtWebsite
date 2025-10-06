// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  },
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // ✅ Configuration du serveur de dev
  devServer: {
    host: '127.0.0.1', // Force 127.0.0.1 au lieu de localhost
    port: 3000,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/image', '@nuxt/ui', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fr',
    langDir: 'locales/',
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json', flag: 'twemoji:flag-france' },
      { code: 'en', name: 'English', file: 'en.json', flag: 'twemoji:flag-for-flag-united-kingdom' }
    ]
  },

  app: {
    head: {
      title: 'Portfolio Antoine',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ]
    }
  }
})
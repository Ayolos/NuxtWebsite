<script setup lang="ts">
import DefaultCard from "~/components/card/DefaultCard.vue";
import { ref, onMounted } from "vue";
import { useSpotify } from "@/composables/useSpotify";

const { topTracks, topArtists, loading, error, fetchTopTracks, fetchTopArtists } = useSpotify();

fetchTopArtists();
fetchTopTracks();

// Suivre le chargement de chaque iframe Spotify
const iframeLoaded = ref<Record<string, boolean>>({});
</script>

<template>
  <div class="lg:px-30 px-10 pb-20">
    <div class="text-center my-20 space-y-5">
      <h1 class="text-5xl font-bold dark:text-white text-black">Mes Passions</h1>
      <p class="text-lg text-slate-500">
        Ma vie est rythmée par la curiosité et le son. La musique m’aide à trouver le juste tempo entre inspiration, concentration et expression. Elle m’accompagne dans mes projets, guide ma créativité et me rappelle que toute bonne idée commence par une émotion.
      </p>
    </div>

    <!-- === Top artistes === -->
    <div class="mt-10">
      <h3 class="text-2xl font-semibold dark:text-white text-black">Mes tops artistes</h3>
      <div v-if="loading" class="mt-4 text-gray-400">Chargement...</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

      <div
          v-if="topArtists"
          class="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4 mt-4"
      >
        <div
            v-for="a in topArtists"
            :key="a.id"
            class="flex flex-col items-center text-center"
        >
          <img
              v-if="a.images && a.images.length"
              :src="a.images[0]?.url"
              alt=""
              class="w-full aspect-square rounded-xl"
          />
          <div class="text-sm font-semibold mt-3">{{ a.name }}</div>
        </div>
      </div>
    </div>

    <!-- === Top musiques === -->
    <div class="mt-20">
      <h3 class="text-2xl font-semibold dark:text-white text-black">Mes tops musiques</h3>
      <div v-if="loading" class="mt-4 text-gray-400">Chargement...</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

      <div
          v-if="topTracks"
          class="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6"
      >
        <div
            v-for="t in topTracks"
            :key="t.id"
            class="relative rounded-xl overflow-hidden"
        >
          <!-- Skeleton affiché tant que l'iframe ne s’est pas chargée -->
          <div
              v-if="!iframeLoaded[t.id]"
              class="absolute inset-0 rounded-xl bg-slate-800/60 animate-pulse"
          ></div>

          <!-- Iframe Spotify -->
          <iframe
              :src="`https://open.spotify.com/embed/track/${t.id}`"
              width="100%"
              height="80"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              class="rounded-xl bg-transparent transition-all duration-500 opacity-0"
              :class="{ 'opacity-100': iframeLoaded[t.id] }"
              @load="iframeLoaded[t.id] = true"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

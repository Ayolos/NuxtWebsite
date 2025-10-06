<script setup lang="ts">
import DefaultCard from "~/components/card/DefaultCard.vue";
import { ref, onMounted } from "vue";
import { useSpotify } from "@/composables/useSpotify";

const { topTracks, topArtists, loadingArtists, loadingTracks, error, fetchTopTracks, fetchTopArtists, getGenrePercentages } = useSpotify();

await fetchTopArtists()
await fetchTopTracks()
// Suivre le chargement de chaque iframe Spotify
const iframeLoaded = ref<Record<string, boolean>>({});

console.log('Genres :', getGenrePercentages.value)

function onIframeLoad(id) {
  // Forcer un minimum de délai pour que le lecteur Spotify soit prêt
  setTimeout(() => {
    iframeLoaded.value[id] = true
  }, 500) // 500ms, tu peux ajuster
}

</script>

<template>
  <div class="lg:px-20 sm:px-10 px-5 2xl:w-[1500px] 2xl:mx-auto">
    <div class="text-center my-20 space-y-5">
      <h1 class="text-5xl font-bold dark:text-white text-black">{{ $t('passion.title') }} </h1>
      <p class="text-lg text-slate-500">
        {{ $t('passion.description') }}
      </p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-red-800 rounded-2xl px-6 py-8 text-white flex sm:flex-row flex-col gap-4 items-center justify-center">
        <UIcon name="streamline:rock-and-roll-hand" class="md:size-20 size-10 text-white" />
        <div>
          <p class="text-sm uppercase">Métal / Rock</p>
          <span class="md:text-6xl text-4xl font-bold">{{ getGenrePercentages.metal }}% </span>
        </div>
      </div>
      <div class="bg-yellow-800 rounded-2xl px-6 py-8 text-white flex sm:flex-row flex-col gap-4 items-center justify-center">
        <UIcon name="streamline-ultimate:modern-music-dj" class="md:size-20 size-10 text-white" />
        <div>
          <p class="text-sm uppercase">Techno</p>
          <span class="md:text-6xl text-4xl font-bold">{{ getGenrePercentages.techno }}% </span>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <h3 class="text-2xl font-semibold dark:text-white text-black">{{ $t('passion.music.topArtists') }}</h3>
      <div v-if="loadingArtists" class="my-20 text-center">
        <UIcon name="eos-icons:bubble-loading" class="size-20 text-purple-500" />
      </div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
        <div
            v-if="topArtists?.length"
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

    <div class="my-20">
      <h3 class="text-2xl font-semibold dark:text-white text-black">{{ $t('passion.music.topTracks') }}</h3>
      <div v-if="loadingTracks" class="my-20 text-center">
        <UIcon name="eos-icons:bubble-loading" class="size-20 text-purple-500" />
      </div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
        <div v-if="topTracks?.length" class="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <div v-for="t in topTracks" :key="t.id" class="relative rounded-xl overflow-hidden">
            <div
                v-if="!iframeLoaded[t.id]"
                class="absolute inset-0 rounded-xl bg-slate-800/60 animate-pulse"
            ></div>
            <iframe
                :src="`https://open.spotify.com/embed/track/${t.id}`"
                width="100%"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                class="rounded-xl bg-transparent transition-all duration-500 opacity-0"
                :class="{ 'opacity-100': iframeLoaded[t.id] }"
                @load="onIframeLoad(t.id)"
            ></iframe>
          </div>
        </div>
    </div>
  </div>
</template>

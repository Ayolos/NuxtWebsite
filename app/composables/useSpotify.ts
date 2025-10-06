import { ref, computed } from 'vue'

export function useSpotify() {
    const topTracks = ref<any[]>([])
    const topArtists = ref<any[]>([])
    const loadingArtists = ref(false)
    const loadingTracks = ref(false)
    const error = ref<string | null>(null)

    const fetchTopArtists = async () => {
        loadingArtists.value = true
        try {
            const { data, error: fetchError } = await useFetch(`/api/spotify/top-artists`)
            if (fetchError.value) throw fetchError.value
            topArtists.value = data.value?.items ?? []
        } catch (err: any) {
            error.value = err?.message || String(err)
        } finally {
            loadingArtists.value = false
        }
    }

    const fetchTopTracks = async () => {
        loadingTracks.value = true
        try {
            const { data, error: fetchError } = await useFetch(`/api/spotify/top-tracks`)
            if (fetchError.value) throw fetchError.value
            topTracks.value = data.value?.items ?? []
        } catch (err: any) {
            error.value = err?.message || String(err)
        } finally {
            loadingTracks.value = false
        }
    }

    // --- Normalisation (supprime accents, caractères spéciaux, etc.)
    const normalize = (str: string) =>
        str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z\s]/g, '')
            .trim()

    // --- Familles de genres (élargies)
    const genreGroups: Record<string, string[]> = {
        pop: [
            'pop', 'dance pop', 'electropop', 'indie pop', 'kpop', 'jpop', 'synthpop', 'hyperpop',
            'teen pop', 'pop rock', 'bedroom pop', 'art pop', 'french pop'
        ],
        rock: [
            'rock', 'indie rock', 'alternative', 'punk', 'metal', 'garage', 'grunge', 'emo',
            'hard rock', 'post rock', 'classic rock', 'progressive', 'shoegaze'
        ],
        rap: [
            'rap', 'hip hop', 'trap', 'drill', 'rnb francais', 'hiphop', 'franc rap', 'french rap',
            'cloud rap', 'rap conscient', 'rap underground', 'old school hip hop'
        ],
        rnb: [
            'rnb', 'soul', 'funk', 'neo soul', 'contemporary rnb', 'motown', 'urban contemporary'
        ],
        electronic: [
            'electronic', 'edm', 'techno', 'house', 'electro', 'trance', 'dance', 'drum and bass',
            'dubstep', 'future bass', 'chillwave', 'electro house', 'deep house', 'industrial'
        ],
        lofi: [
            'lofi', 'chillhop', 'beats', 'instrumental beats', 'study beats', 'chillhop beats'
        ],
        jazz: [
            'jazz', 'blues', 'bebop', 'swing', 'smooth jazz', 'bossa nova', 'fusion', 'ragtime'
        ],
        classical: [
            'classical', 'orchestra', 'symphony', 'baroque', 'piano', 'opera', 'violin', 'choir'
        ],
        reggae: ['reggae', 'ska', 'dub', 'dancehall', 'roots'],
        latin: [
            'latin', 'reggaeton', 'bachata', 'salsa', 'cumbia', 'mambo', 'latino', 'brazilian'
        ],
        afro: ['afrobeat', 'afrobeats', 'afropop', 'african', 'naija', 'nigerian pop'],
        folk: ['folk', 'country', 'americana', 'bluegrass', 'singer songwriter', 'acoustic'],
        world: [
            'world', 'french', 'arabic', 'oriental', 'african', 'celtic', 'greek', 'turkish',
            'italian', 'flamenco', 'balkan'
        ],
        soundtrack: [
            'soundtrack', 'movie score', 'video game music', 'anime', 'film score', 'ost'
        ],
        metal: [
            'metal', 'heavy metal', 'death metal', 'black metal', 'nu metal', 'metalcore'
        ],
        punk: ['punk', 'pop punk', 'hardcore punk', 'ska punk'],
        indie: ['indie', 'bedroom', 'alternative', 'dream pop', 'indietronica'],
        ambient: ['ambient', 'chillout', 'downtempo', 'atmospheric', 'soundscape'],
        experimental: ['experimental', 'avant garde', 'idm', 'noise'],
    }

    // --- Calcul intelligent des pourcentages
    const getGenrePercentages = computed(() => {
        if (!topArtists.value.length) return {}

        const genreCounts: Record<string, number> = {}

        // Compter les genres de chaque artiste
        topArtists.value.forEach(artist => {
            artist.genres?.forEach((genre: string) => {
                genre = genre.toLowerCase()
                genreCounts[genre] = (genreCounts[genre] || 0) + 1
            })
        })

        // Groupes de genres détaillés
        const rockMetalKeywords = [
            'rock', 'metal', 'punk', 'hardcore', 'emo', 'alternative', 'grunge',
            'indie rock', 'metalcore', 'death metal', 'black metal', 'heavy metal',
            'progressive metal', 'nu metal', 'post-rock', 'post metal', 'stoner', 'industrial'
        ]

        const electroKeywords = [
            'electro', 'techno', 'house', 'edm', 'trance', 'drum and bass', 'dubstep',
            'electronic', 'deep house', 'minimal', 'progressive house', 'tech house',
            'electro pop', 'synthwave', 'electronica', 'bass', 'breakbeat'
        ]

        // Compteurs
        let rockMetalCount = 0
        let electroCount = 0

        for (const [genre, count] of Object.entries(genreCounts)) {
            if (rockMetalKeywords.some(k => genre.includes(k))) {
                rockMetalCount += count
            } else if (electroKeywords.some(k => genre.includes(k))) {
                electroCount += count
            }
        }

        const total = rockMetalCount + electroCount
        if (total === 0) return { rock_metal: 0, electro: 0 }

        const rockMetalPercent = parseFloat(((rockMetalCount / total) * 100).toFixed(1))
        const electroPercent = parseFloat(((electroCount / total) * 100).toFixed(1))

        return {
            metal : rockMetalPercent,
            techno : electroPercent,
        }
    })

    return {
        topTracks,
        topArtists,
        loadingArtists,
        loadingTracks,
        error,
        fetchTopTracks,
        fetchTopArtists,
        getGenrePercentages,
    }
}

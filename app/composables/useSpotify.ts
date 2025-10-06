import { ref } from 'vue'

export function useSpotify() {
    const topTracks = ref<any[]>([])
    const topArtists = ref<any[]>([])
    const loadingArtists = ref(false)
    const loadingTracks = ref(false)
    const error = ref<string | null>(null)

    const fetchTopArtists = async () => {
        loadingArtists.value = true
        error.value = null
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
        error.value = null
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

    return {
        topTracks,
        topArtists,
        loadingArtists,
        loadingTracks,
        error,
        fetchTopTracks,
        fetchTopArtists,
    }
}

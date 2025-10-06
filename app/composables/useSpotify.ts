import { ref } from 'vue'

export function useSpotify() {
    const topTracks = ref<any[]>([])
    const topArtists = ref<any>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchTopTracks = async (limit = 10) => {
        loading.value = true
        error.value = null
        try {
            const { data, error: fetchError } = await useFetch(`/api/spotify/top-tracks?limit=${limit}`)
            if (fetchError.value) throw fetchError.value
            topTracks.value = (data.value && data.value.items) ? data.value.items : data.value
        } catch (err: any) {
            error.value = err?.message || String(err)
        } finally {
            loading.value = false
        }
    }

    const fetchTopArtists = async () => {
        loading.value = true
        error.value = null
        try {
            const { data, error: fetchError } = await useFetch(`/api/spotify/top-artists`)
            if (fetchError.value) throw fetchError.value
            topArtists.value = (data.value && data.value.items) ? data.value.items : data.value
        } catch (err: any) {
            error.value = err?.message || String(err)
            return null
        } finally {
            loading.value = false
        }
    }

    return {
        topTracks,
        topArtists,
        loading,
        error,
        fetchTopTracks,
        fetchTopArtists
    }
}
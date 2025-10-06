import { defineEventHandler, createError } from 'h3'

let cache: any = null
let cacheTimestamp = 0
const CACHE_DURATION = 1000 * 60 * 60 // 1h

export default defineEventHandler(async () => {
    const now = Date.now()
    if (cache && now - cacheTimestamp < CACHE_DURATION) return cache

    const config = useRuntimeConfig()
    const refreshToken = config.spotifyRefreshToken
    if (!refreshToken) throw createError({ statusCode: 500, statusMessage: 'Refresh token missing' })

    // 1️⃣ Génère un access token
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.spotifyClientId,
        client_secret: config.spotifyClientSecret
    }).toString()

    const tokenData = await $fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    })

    const accessToken = tokenData.access_token

    // 2️⃣ Récupère tes Top Tracks
    const topTracks = await $fetch('https://api.spotify.com/v1/me/top/tracks?limit=20', {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    // 3️⃣ Cache la réponse
    cache = topTracks
    cacheTimestamp = now

    return topTracks
})
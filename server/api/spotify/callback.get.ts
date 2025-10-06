import { defineEventHandler, getQuery, getCookie, setCookie, sendRedirect, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { code, state } = getQuery(event)
    const savedState = getCookie(event, 'spotify_oauth_state')

    if (!code || state !== savedState) throw createError({ statusCode: 400, statusMessage: 'Invalid OAuth state or missing code' })

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: String(code),
        redirect_uri: config.spotifyRedirectUri,
        client_id: config.spotifyClientId,
        client_secret: config.spotifyClientSecret
    }).toString()

    const tokenRes = await $fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    })

    console.log('TON REFRESH TOKEN :', tokenRes.refresh_token) // <---- ici !

    // Stocke refresh_token en cookie HttpOnly pour dev, pas besoin pour tes visiteurs
    setCookie(event, 'spotify_refresh_token', tokenRes.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    })

    return sendRedirect(event, '/')
})

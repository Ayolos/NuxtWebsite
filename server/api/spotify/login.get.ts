import { defineEventHandler, setCookie, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const clientId = config.spotifyClientId
    const redirectUri = config.spotifyRedirectUri
    const scopes = ['user-top-read'].join(' ')
    const state = 'nuxt_spotify_' + Math.random().toString(36).slice(2, 15)

    setCookie(event, 'spotify_oauth_state', state, { httpOnly: true, sameSite: 'lax' })

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scopes,
        state,
        show_dialog: 'true'
    })

    return sendRedirect(event, `https://accounts.spotify.com/authorize?${params.toString()}`)
})
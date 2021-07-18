/** Mapping for localStorage Keys */
const SPOTIFY_LOCALSTORAGE_KEYS = {
    accessToken: "spotify_access_token",
    refreshToken: "spotify_refresh_token",
    expiresIn: "spotify_expires_in",
    timestamp: "spotify_timestamp"
}

/** Mapping for retrieving localStorage values */
const SPOTIFY_LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(SPOTIFY_LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(SPOTIFY_LOCALSTORAGE_KEYS.refreshToken),
    expiresIn: window.localStorage.getItem(SPOTIFY_LOCALSTORAGE_KEYS.expiresIn),
    timestamp: window.localStorage.getItem(SPOTIFY_LOCALSTORAGE_KEYS.timestamp)
}

/**
 * Get Spotify Access Token from the URL or
 * retrieve it from localStorage
 * @returns {string} Spotify Access Token
 */

const getAccessToken = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [SPOTIFY_LOCALSTORAGE_KEYS['accessToken']]: urlParams.get('access_token'),
        [SPOTIFY_LOCALSTORAGE_KEYS['refreshToken']]: urlParams.get('refresh_token'),
        [SPOTIFY_LOCALSTORAGE_KEYS['expiresIn']]: urlParams.get('expires_in'),
    }

    const hasError = urlParams.get('error');

    // If there are any errors or the access token is undefined then return
    if (hasError || SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] === 'undefined') return;

    // If an Access Token is available in localStorage, retrieve it
    if (SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] && SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] !== 'undefined') {
        return SPOTIFY_LOCALSTORAGE_VALUES['accessToken']
    }

    // If no access token is available locally then retrieve it from URL & store it in localStorage
    if (queryParams[SPOTIFY_LOCALSTORAGE_KEYS['accessToken']]) {
        for (const param in queryParams) {
            console.log('param: ', param)
            window.localStorage.setItem(param, queryParams[param])
        }

        return queryParams[SPOTIFY_LOCALSTORAGE_KEYS['accessToken']]
    }

    // For any other unhandled cases return false
    return false;
}

export const spotifyService = {
    accessToken: getAccessToken()
}
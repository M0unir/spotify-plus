import http from './httpService';

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
 * Clears Spotify tokens from localStorage & reloads the page
 * @returns {void}
 */
const logout = () => {
    for (const property in SPOTIFY_LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(SPOTIFY_LOCALSTORAGE_KEYS[property])
    }
    /** Return to Home '/' */
    window.location = window.location.origin
}

/**
 * Checks if the access token has expired by comparing the time elapsed between the timestamp and now,
 * then checks if it is over our given expiration time.
 * @returns {boolean} True if access token has expired
 */
const hasTokenExpired = () => {
    const { accessToken, expiresIn, timestamp } = SPOTIFY_LOCALSTORAGE_VALUES;

    if (!accessToken || !timestamp) return false;

    const millisecondsElapsed = Date.now() - Number(timestamp);

    return (Math.floor(millisecondsElapsed / 1000) > Number(expiresIn))
}

/**
 * Sends a request to our backend service to refresh our access token using the stored refresh token.
 * Then stores the new token in localStorage & reloads the page. 
 * @returns {void}
 */
const refreshToken = async () => {
    try {
        // If no refresh token available, log the user out 
        if (!SPOTIFY_LOCALSTORAGE_VALUES['refreshToken']
            || SPOTIFY_LOCALSTORAGE_VALUES['refreshToken'] === 'undefined'
            || (Date.now() - Number(SPOTIFY_LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000) {
            console.log('LOGGING OUT: ')
            logout()
        }
        // Request a refreshed token from our node backend
        fetch(`/refresh_token?refresh_token=${SPOTIFY_LOCALSTORAGE_VALUES['refreshToken']}`)
            .then(response => response.json())
            .then(data => {
                // Update localStorage values
                window.localStorage.setItem(SPOTIFY_LOCALSTORAGE_KEYS['accessToken'], data.access_token);
                window.localStorage.setItem(SPOTIFY_LOCALSTORAGE_KEYS['timestamp'], Date.now())

                // Reload the page so new localStorage values take effect 
                window.location.reload();
            })

    } catch (e) {
        console.log('Could not refresh token: ', e)
    }
}

/**
 * Get Spotify Access Token from the URL or retrieve it from localStorage
 * @returns {string} Spotify access token
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
    if (hasError || SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] === 'undefined' || hasTokenExpired()) {
        refreshToken();
    };

    // If an Access Token is available in localStorage, retrieve it
    if (SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] && SPOTIFY_LOCALSTORAGE_VALUES['accessToken'] !== 'undefined') {
        return SPOTIFY_LOCALSTORAGE_VALUES['accessToken']
    }

    // If no access token is available locally then retrieve it from URL & store it in localStorage
    if (queryParams[SPOTIFY_LOCALSTORAGE_KEYS['accessToken']]) {
        for (const param in queryParams) {
            window.localStorage.setItem(param, queryParams[param])
        }

        // Setting a timestamp to check for token expiration
        window.localStorage.setItem(SPOTIFY_LOCALSTORAGE_KEYS['timestamp'], Date.now())

        return queryParams[SPOTIFY_LOCALSTORAGE_KEYS['accessToken']]
    }

    // For any other unhandled cases return false
    return false;
}

const accessToken = getAccessToken();
http.setAccessToken(accessToken);

/**
 * Get logged in user's profile data
 * @returns {Promise}
 */

const getUserProfile = () => http.get('/me')

/** 
 * Get current user's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 * @returns {promise}
 */

const getUserPlaylists = (limit = 10) => http.get(`/me/playlists?limit=${limit}`)

/**
 * Get full details of a playlist owned by a Spotify user.
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 * @param {string} playlist_id spotify id of the playlist
 * @returns {promise}
 */

const getPlaylistInfo = playlist_id => http.get(`/playlists/${playlist_id}`);

/**
 * Get current user's top artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string=} [time_range='long_term'] - timeframe of data returned
 * @returns {promise}
 */

const getUserTopArtists = (time_range = 'long_term') => http.get(`/me/top/artists?time_range=${time_range}`)

/** 
 * Get current user's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string=} [time_range='long_term'] time frame of data returned
 * @returns {promise}
 */

const getUserTopTracks = (time_range = 'long_term') => http.get(`/me/top/tracks?time_range=${time_range}`)

/**
 * Get audio features for multiple tracks based on their Spotify IDs.
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
 * @param {string} ids a comma-separated list of the Spotify IDs for the tracks
 * @returns {promise}
 */

const getTracksAudioFeatures = ids => http.get(`/audio-features?ids=${ids}`)

export {
    accessToken,
    logout,
    getUserProfile,
    getUserPlaylists,
    getPlaylistInfo,
    getUserTopArtists,
    getUserTopTracks,
    getTracksAudioFeatures
};
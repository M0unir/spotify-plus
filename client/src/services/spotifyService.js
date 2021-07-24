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
    console.log('logout', window.location.origin)
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
const refreshToken = () => {
    try {
        // If no refresh token available, log the user out 
        if (!SPOTIFY_LOCALSTORAGE_VALUES['refreshToken']
            || SPOTIFY_LOCALSTORAGE_VALUES['refreshToken'] === 'undefined'
            || (Date.now() - SPOTIFY_LOCALSTORAGE_VALUES['timestamp']) / 1000 < 1000) {
            logout()
        }
        fetch(`/refresh_token?refresh_token=${SPOTIFY_LOCALSTORAGE_VALUES['refreshToken']}`)
            .then(response => response.json())
            .then(data => {
                window.localStorage.setItem(SPOTIFY_LOCALSTORAGE_KEYS['accessToken'], data.access_token);
                window.localStorage.setItem(SPOTIFY_LOCALSTORAGE_KEYS['timestamp'], Date.now())

                // Reload the page
                window.location = window.location.reload();
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
            console.log('param: ', param)
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
 * Get Logged In User's Profile Data
 * @returns {Promise}
 */

const getUserProfile = () => http.get('/me')

export {
    accessToken,
    logout,
    getUserProfile
};
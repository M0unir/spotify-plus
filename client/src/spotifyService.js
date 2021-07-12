const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')
    // console.log({ accessToken, refreshToken })

    return {
        'accessToken': accessToken,
        'refreshToken': refreshToken
    };
}

export const spotifyService = getAccessToken();
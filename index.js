require('dotenv').config({ path: '.env.development' })
const express = require('express');
const qs = require('qs');
const { generateRandomString } = require('./utils.js');
const app = express();
const axios = require('axios');
const port = 8080;

/** Getting Environment Variables */
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const CLIENT_URI = process.env.CLIENT_URI

app.get('/', (req, res) => {
    res.send('Spotify Plus')
})

/** 
 *  Spotify Authorization:
 *  https://developer.spotify.com/documentation/general/guides/authorization-guide/ 
 * */

/** 1. Request Authorization */
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = [
        "user-read-private",
        "user-read-email",
        "user-top-read"].join(' ');

    res.cookie("spotify_auth_state", state);

    const queryparams = qs.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryparams}`)
})

/** 2. Request Access & Refresh tokens */
app.get('/redirect_callback', (req, res) => {
    const code = req.query.code || null;
    // Using Axios to perform a POST request for simplicity
    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI,
            code: code,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    })
        .then(response => {
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;

                /** Redirect to React Client & Passing queryParams */
                const queryParams = qs.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                })

                res.redirect(`${CLIENT_URI}?${queryParams}`)

            } else {
                res.redirect(`/?${qs.stringify({ error: 'invalid token' })}`)
            }
        })
        .catch(error => {
            res.send(error)
        })
})

/** Refresh Token Request */
app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios.post('https://accounts.spotify.com/api/token', qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
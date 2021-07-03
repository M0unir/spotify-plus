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

app.get('/', (req, res) => {
    res.send('Spotify Plus')
})

/** 
 *  Spotify Authorization:
 *  https://developer.spotify.com/documentation/general/guides/authorization-guide/ 
 * */

const stateKey = "spotify_auth_state"

/** 1. Request Authorization */
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = "user-read-private user-read-email";

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

                const { token_type, access_token } = response.data;
                const { refresh_token } = response.data;

                /** Get User Data */
                axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `${token_type} ${access_token}`
                    }
                })
                    .then(response => res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`))
                    .catch(error => res.send(error))

                /** Testing Refresh Token */
                // axios.get(`http://localhost:8080/refresh_token?refresh_token=${refresh_token}`)
                //     .then(response => res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`))
                //     .catch(error => res.send(error))

            } else {
                res.send(response)
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
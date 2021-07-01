require('dotenv').config({ path: '.env.development' })
const express = require('express');
const querystring = require('querystring');
const app = express();
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

/** 1. Request Authorization */
app.get('/login', (req, res) => {
    const queryparams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryparams}`)
})

app.get('/redirect', (req, res) => {
    res.send('Logged In!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
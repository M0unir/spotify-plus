# Spotify Plus

<img src="./client/public/spotify-plus.png" alt="Spotify Plus web app" />

<p align="center">
<a href="https://spotify-plus.herokuapp.com/"> Check it out!</a> 
</p>

>Spotify Plus is a web app clone of your spotify profile that adds additional features to help visualize personalized Spotify Data. Login with your spotify account and get extra stats like:
>- Sorting your favorite tracks by Special Audio Features like Loudness, Dancebility, Tempo, Energy & more. 
>- Filtering your top artists or top tracks by time.

## Requirements

- Spotify Account
- Node, Express, Heroku
- React, React Router, React Hooks, Styled Components

## Installation

1. Got to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and "Create a new App". Then add `http://localhost:8080/redirect_callback` as a Redirect URI in the app settings
2. Clone the app (or download a zip whichever you prefer)

    ```shell
     git clone git@github.com:M0unir/spotify-plus.git
    ```
3. Make sure you have [nvm](https://github.com/nvm-sh/nvm) and [yarn](https://www.yarnpkg.com/) installed globally

4. Install the node version specified in the provided .nvrmc file.
   
    ```shell
     nvm install
    ```
5. Install project dependencies
   
    ```shell
     yarn install
    ```
6. Rename <code>.env.example</code> to <code>.env</code>, then replace <code>CLIENT_ID</code> & <code>CLIENT_SECRET</code> with your own credentials from your Spotify Dashboard.
   
7. Rename <code>client/.env.development.example</code> to <code>client/.env.development</code>
8. Build the project
9. 
    ```shell
     yarn build
    ```
10. Run the project *(This will run both the server & the client)*
   
    ```shell
     yarn start
    ```

 ## Optional

 If you have Circular Fonts (used by Spotify) you could add them to <code>public/fonts/Circular/</code>.
 Then swicth this in <code>client/.env.development</code> or <code>client/.env.production</code>:

 ```
 REACT_APP_USE_CIRCULAR_FONTS=true
 ```
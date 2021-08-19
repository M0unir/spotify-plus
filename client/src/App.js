import { useState, useEffect } from 'react';
import { accessToken } from './services/spotifyService';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from './styles'
import { Login, Profile, TopArtists, TopTracks } from './pages/';
import { TopBar } from './components/';

function App() {
  // const { accessToken, logout, getUserProfile } = spotifyService;
  const [token, setToken] = useState(null);

  useEffect(() => {

    setToken(accessToken);

  }, [])

  return (
    <div className="App">
      <GlobalStyles />
      <ToastContainer />
      <TopBar />
      {!token ? (
        <Login />
      ) : (
        <>
          <Switch>
            <Route path="/top-artists" component={TopArtists} />
            <Route path="/top-tracks" component={TopTracks} />
            <Route path="/playlists/:id">
              <h1>Playlist </h1>
            </Route>
            <Route path="/playlists">
              <h1>Playlists</h1>
            </Route>
            <Route path="/" >
              <Profile />
            </Route>
          </Switch>
        </>
      )
      }
    </div>
  );
}

export default App;
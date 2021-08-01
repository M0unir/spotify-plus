import { useState, useEffect } from 'react';
import { accessToken, logout, getUserProfile } from './services/spotifyService';
import { toast, ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import logo from './logo.svg';
import './App.css';

function App() {
  // const { accessToken, logout, getUserProfile } = spotifyService;
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch (Exception) {
        if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500)
          toast.error(<div>Couldn't get profile data.<br />Reason: {Exception.response.data.error.message}</div>);
      }
    }

    setToken(accessToken);
    getUser()

  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        {!token ? (
          <a
            className="App-link"
            href="http://localhost:8080/login"
            rel="noopener noreferrer"
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <Switch>
              <Route path="/top-artists" component={(props) => props.match.params}>
                <h1>Top Artists</h1>
                {
                  console.log('props: ',)
                }
              </Route>
              <Route path="/top-tracks">
                <h1>Top Tracks</h1>
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist </h1>
              </Route>
              <Route path="/playlists">
                <h1>Playlists</h1>
              </Route>
              <Route path="/" >
                <>
                  <h2>Logged In</h2>
                  <button onClick={logout}>Logout</button>
                  <br />
                  {profile && (
                    <>
                      {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="User Profile" />
                      )}
                      <p>Hello {profile.display_name}, email: {profile.email}</p>
                    </>

                  )}
                </>
              </Route>
            </Switch>
          </>
        )
        }
      </header>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { accessToken, logout, getUserProfile } from './services/spotifyService';
import { toast, ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components/macro';
import { GlobalStyles } from './styles' // Epxorting Default Namespace

const StyledLoginButton = styled.a`
  background-color: green;
  color: white;
  border: 1px solid green;
  border-radius: 10px;
  padding: 5px 15px;
  text-align: center;
  display: inline-block;
`

function App() {
  // const { accessToken, logout, getUserProfile } = spotifyService;
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
        toast.success('Logged In');
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
      <GlobalStyles />
      <ToastContainer />
      <header className="App-header">
      </header>
      {!token ? (
        <div className="main" style={{ display: 'block', padding: '0 10px', margin: '10px 0' }}>
          <StyledLoginButton
            className="App-link"
            href="http://localhost:8080/login"
            rel="noopener noreferrer"
          >
            Login to Spotify
          </StyledLoginButton>
        </div>
      ) : (
        <>
          <Switch>
            <Route path="/top-artists">
              <h1>Top Artists</h1>
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
    </div>
  );
}

export default App;
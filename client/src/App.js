import { useState, useEffect } from 'react';
import { accessToken, logout, getUserProfile } from './services/spotifyService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import './App.css';

function App() {
  // const { accessToken, logout, getUserProfile } = spotifyService;
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserProfile();
      console.log('result: ', data);
      setProfile(data);
    }

    setToken(accessToken);
    getUser()

  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
            <h2>Logged In</h2>
            <button onClick={logout}>Logout</button>
            <p>
              {profile && (`Hello ${profile.display_name}, email: ${profile.email}`)}
            </p>
          </>
        )
        }
      </header>
    </div>
  );
}

export default App;
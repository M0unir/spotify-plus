import { useState, useEffect } from 'react';
import { accessToken, logout } from './spotifyService';
import logo from './logo.svg';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
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
          </>
        )
        }
      </header>
    </div>
  );
}

export default App;

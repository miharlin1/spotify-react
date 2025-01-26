import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = "b37847709b594effa9faae555c0050e8";
const REDIRECT_URI = "http://localhost:3000/createpost";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

export function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Redirect user to Spotify login page
  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  // On component mount, check if there's a token in URL hash
  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      // Extract token from the URL hash
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      // Save token to localStorage
      localStorage.setItem("token", token);
      // Clear hash in URL
      window.location.hash = "";
    }

    setToken(token);
  }, []);

  return (
    <div className="home-page">
      <h1>Spotify Login</h1>
      {token ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={() => navigate('/createpost')}>Go to Create Post</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login to Spotify</button>
      )}
    </div>
  );
}
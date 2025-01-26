
import {useEffect, useState} from 'react';
import axios from "axios"; //help preform get request to API endpoint

function App() {
  const CLIENT_ID = "b37847709b594effa9faae555c0050e8"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])  
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
}
const handleArtistClick = (artistId) => {
  console.log(`Artist with ID: ${artistId} was clicked!`);
  setSelectedArtistId(artistId); // Update the state with the clicked artist ID
  // You can replace this with any logic you want, like navigation or state updates
  // For example, if you're using React Router:
  // history.push(`/artists/${artistId}`);
};
const renderArtists = () => {
  return artists.map(artist => (
    <button 
    key={artist.id} 
    onClick={() => handleArtistClick(artist.id)} 
    style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        border: "none", 
        padding: "10px", 
        cursor: "pointer"
    }}
>
    {artist.images.length ? (
        <img width={"100%"} src={artist.images[0].url} alt={artist.name} style={{maxWidth: "150px", borderRadius: "8px", border: selectedArtistId === artist.id ? '5px solid green' : 'none'}} />
    ) : (
        <div>No Image</div>
    )}
    <span>{artist.name}</span>
</button>
));
      // <div key={artist.id}>
      //     {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
      //     {artist.name}
      // </div>
  // ))
}

  return (
      <div className="App">
          <header className="App-header">
              <h1>Spotify React</h1>
              {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                  : <button onClick={logout}>Logout</button>}

<form onSubmit={searchArtists}>
    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
    <button type={"submit"}>Search</button>
</form>
{renderArtists()}
          </header>
      </div>
  );
  {renderArtists()}
}

export default App;

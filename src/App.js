
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
  const [textBoxValue, setTextBoxValue] = useState('');

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
  // Handle confirm selection
  const handleConfirmSelection = () => {
    if (selectedArtistId !== null) {
      const selectedArtist = artists.find(artist => artist.id === selectedArtistId);
      alert(`You selected: ${selectedArtist.name}`);
      // You can add more logic here (e.g., navigating to a new page, updating state, etc.)
    } else {
      alert('Please select an artist first!');
    }
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
}
  // Handle text box value change
  const handleTextBoxChange = (event) => {
    setTextBoxValue(event.target.value);
  };

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
<div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",  // Automatically adjust columns based on screen size
        gap: "15px",  // Space between grid items
        marginBottom: "20px",  // Space between grid and button
      }}>
{renderArtists()}</div>
          </header>
          <div style={{ marginTop: '20px' }}>
        <textarea
          value={textBoxValue}
          onChange={handleTextBoxChange}
          placeholder="Enter your comments here..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            minHeight: "100px", // Set a minimum height for the text area
            resize: "vertical", // Allows user to resize vertically
          }}
        />
      </div>
          {/* Confirm Selection Button */}
      <button 
        onClick={handleConfirmSelection} 
        style={{
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        Create Post!
      </button>
      </div>
  );
  {renderArtists()}
}

export default App;

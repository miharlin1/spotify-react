// import './App.css';  // Import global styles
import {useEffect, useState} from 'react';
import axios from "axios"; //help preform get request to API endpoint
import ArtistList from '../components/ArtistList'; //the ../ before components will go up a level then go down!
import ConfirmButton from '../components/ConfirmButton';
import TextBox from '../components/TextBox';

export function CreatePost(){
    
  const CLIENT_ID = "b37847709b594effa9faae555c0050e8"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])  
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [textBoxValue, setTextBoxValue] = useState('');
  console.log(window.location.hash)

    // Check if token is available and fetch artists
    useEffect(() => {
        if (!token) {
          alert('Please login first');
          return;
        }
      }, [token]);

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
        

        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>

        <ArtistList
          artists={artists}
          onArtistClick={handleArtistClick}
          selectedArtistId={selectedArtistId}
        />
      </header>

      <div style={{ marginTop: "20px" }}>
        <TextBox value={textBoxValue} onChange={handleTextBoxChange} />
      </div>

      <ConfirmButton onConfirm={handleConfirmSelection} selectedArtistId={selectedArtistId} />
    </div>
  );
}
// src/components/ArtistCard.js
import React from 'react';

const ArtistCard = ({ artist, onClick, isSelected }) => {
  return (
    <button 
      onClick={() => onClick(artist.id)} 
      style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        border: "none", 
        padding: "10px", 
        cursor: "pointer",
        backgroundColor: isSelected ? "#e0e0e0" : "#fff",
        borderRadius: "8px",
      }}
    >
      {artist.images.length ? (
        <img 
          width={"100%"} 
          src={artist.images[0].url} 
          alt={artist.name} 
          style={{
            maxWidth: "150px", 
            borderRadius: "8px", 
            border: isSelected ? '5px solid green' : 'none'
          }} 
        />
      ) : (
        <div>No Image</div>
      )}
      <span>{artist.name}</span>
    </button>
  );
};

export default ArtistCard;


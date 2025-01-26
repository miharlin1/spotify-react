import React from 'react';
import ArtistCard from './ArtistCard';

const ArtistList = ({ artists, onArtistClick, selectedArtistId }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",  // Adjust columns based on screen size
      gap: "15px",  // Space between grid items
      marginBottom: "20px",
    }}>
      {artists.map(artist => (
        <ArtistCard 
          key={artist.id} 
          artist={artist} 
          onClick={onArtistClick} 
          isSelected={artist.id === selectedArtistId} 
        />
      ))}
    </div>
  );
};

export default ArtistList;
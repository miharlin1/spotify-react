import React from 'react';

const ConfirmButton = ({ onConfirm, selectedArtistId }) => {
  return (
    <button 
      onClick={onConfirm} 
      style={{
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        width: "100%",
      }}
    >
      {selectedArtistId === null ? 'Confirm Selection' : 'Selection Confirmed'}
    </button>
  );
};

export default ConfirmButton;
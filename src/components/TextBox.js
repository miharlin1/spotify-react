// src/components/TextBox.js
import React from 'react';

const TextBox = ({ value, onChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Enter your comments here..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          minHeight: "100px",
          resize: "vertical",
        }}
      />
    </div>
  );
};

export default TextBox;

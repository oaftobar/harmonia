import React from 'react';

const ScaleButtonSelector = ({ scales, selectedScale, onScaleSelect }) => {
  const buttonStyle = {
    display: 'inline-block',
    margin: '5px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    background: '#f8f8f8',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s'
  };
  
  const selectedButtonStyle = {
    ...buttonStyle,
    background: '#2ECC71',
    color: 'white',
    border: '1px solid #2ECC71',
  };
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h2>Select a Mode:</h2>
      </div>
      <div>
        {scales.map(scale => (
          <button 
            key={scale}
            onClick={() => onScaleSelect(scale)}
            style={selectedScale === scale ? selectedButtonStyle : buttonStyle}
          >
            {scale}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScaleButtonSelector;
import React from 'react';

const ChordButtonSelector = ({ chords, selectedChord, onChordSelect }) => {
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
    background: '#E67E22',
    color: 'white',
    border: '1px solid #E67E22',
  };
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h2>Select a Chord Type:</h2>
      </div>
      <div>
        {chords.map(chord => (
          <button 
            key={chord}
            onClick={() => onChordSelect(chord)}
            style={selectedChord === chord ? selectedButtonStyle : buttonStyle}
          >
            {chord}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChordButtonSelector;
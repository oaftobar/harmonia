import React from 'react';

const NoteButtonSelector = ({ selectedNote, onNoteSelect }) => {
  const notes = ['C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'];
  
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
    background: '#2980B9',
    color: 'white',
    border: '1px solid #2980B9',
  };
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h2>Root Note:</h2>
      </div>
      <div>
        {notes.map(note => (
          <button 
            key={note}
            onClick={() => onNoteSelect(note)}
            style={selectedNote === note ? selectedButtonStyle : buttonStyle}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteButtonSelector;
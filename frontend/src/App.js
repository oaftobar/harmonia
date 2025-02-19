import React, { useState, useEffect } from "react";
import NoteButtonSelector from "./NoteButtonSelector";
import ScaleButtonSelector from "./ScaleButtonSelector";
import ChordButtonSelector from "./ChordButtonSelector";

function App() {
  const [rootNote, setRootNote] = useState("C");
  const [scaleType, setScaleType] = useState("");
  const [scales, setScales] = useState([]);
  const [resultScale, setResultScale] = useState([]);
  const [resultChordProgression, setResultChordProgression] = useState([]);
  const [resultChordNames, setResultChordNames] = useState([]);
  const [chordType, setChordType] = useState("");
  const [chords, setChords] = useState([]);
  const [resultChord, setResultChord] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScaleLoading, setIsScaleLoading] = useState(false);
  const [isChordLoading, setIsChordLoading] = useState(false);

  // Fetch available scales & chords on page load
  useEffect(() => {
    Promise.all([
      fetch("api/scales").then(res => res.json()),
      fetch("api/chords").then(res => res.json())
    ])
    .then(([scalesData, chordsData]) => {
      setScales(scalesData);
      setChords(chordsData);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setError("Failed to load scales and chords.");
    });
  }, []);

  // Handle scale type selection with auto-generation
  const handleScaleSelect = (selected) => {
    setScaleType(selected);
    if (selected) {
      generateScale(selected);
    }
  };
  
  // Handle chord type selection with auto-generation
  const handleChordSelect = (selected) => {
    setChordType(selected);
    if (selected) {
      generateChord(selected);
    }
  };
  
  // Handle root note selection with auto-generation for both scale and chord
  const handleRootNoteSelect = (selected) => {
    setRootNote(selected);
    if (scaleType) {
      generateScale(scaleType, selected);
    }
    if (chordType) {
      generateChord(chordType, selected);
    }
  };

  // Generate scale & chord progressions
  const generateScale = (selectedScale = scaleType, selectedRoot = rootNote) => {
    setIsScaleLoading(true);
    setError(null);

    fetch(`api/generate-scale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        root_note: selectedRoot,
        scale_type: selectedScale
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      setResultScale(data.scale || ["Invalid selection"]);
      setResultChordProgression(data.chord_progression || ["Invalid selection"]);
      setResultChordNames(data.chord_names || ["Invalid selection"]);
    })
    .catch(error => {
      console.error("Error generating scale:", error);
      setError("Failed to generate scale. Please try again.");
    })
    .finally(() => setIsScaleLoading(false));
  };

  // Generate chord
  const generateChord = (selectedChord = chordType, selectedRoot = rootNote) => {
    setIsChordLoading(true);
    setError(null);

    fetch('api/generate-chord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        root_note: selectedRoot, 
        chord_type: selectedChord 
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      setResultChord(data.chord || ["Invalid selection"]);
    })
    .catch(error => {
      console.error("Error generating chord:", error);
      setError("Failed to generate chord. Please try again.");
    })
    .finally(() => setIsChordLoading(false));
  };

  const sectionDivider = {
    borderTop: '1px solid #eee',
    margin: '30px 0',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>HARMONIA</h1>
      <h3>Unlock the Sound of Possibility</h3>
      <p>Harmonia is your companion for exploring the intricate world of scales, modes, and chords.</p>
      <p>Designed for musicians, songwriters, and theorists alike, this tool transforms a single note into a full harmonic landscape.</p>
      
      {/* Root Note Button Selector */}
      <NoteButtonSelector 
        selectedNote={rootNote} 
        onNoteSelect={handleRootNoteSelect} 
      />

      <div style={sectionDivider}></div>

      {/* Scale Section */}
      <div>
        {/* Scale Button Selector */}
        <ScaleButtonSelector 
          scales={scales}
          selectedScale={scaleType}
          onScaleSelect={handleScaleSelect}
        />
        
        {/* Loading Indicator for Scale */}
        {isScaleLoading && (
          <div style={{ 
            margin: "20px 0", 
            display: "inline-block"
          }}>
            <div className="loading-spinner" style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #2ecc71",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              animation: "spin 2s linear infinite",
              display: "inline-block",
              marginRight: "10px",
              verticalAlign: "middle"
            }}></div>
            <span style={{ verticalAlign: "middle" }}>Generating...</span>
          </div>
        )}

        {/* Display Generated Scale */}
        {resultScale.length > 0 && resultScale[0] !== "Invalid selection" && (
          <div className="result-container" style={{ 
            padding: "20px", 
            margin: "20px auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            maxWidth: "800px"
          }}>
            <h3 style={{ color: "#2c3e50" }}>Generated Scale</h3>
            <p style={{ fontSize: "18px", letterSpacing: "1px" }}>{resultScale.join(" - ")}</p>
            
            <h3 style={{ color: "#2c3e50", marginTop: "20px" }}>Chord Progression</h3>
            <p style={{ marginBottom: "5px" }}>
              <strong>Roman Numerals:</strong> {resultChordProgression.join(" - ")}
            </p>
            <p>
              <strong>Chord Names:</strong> {resultChordNames.join(" - ")}
            </p>
          </div>
        )}
      </div>

      <div style={sectionDivider}></div>

      {/* Chord Section */}
      <div>
        {/* Chord Button Selector */}
        <ChordButtonSelector 
          chords={chords}
          selectedChord={chordType}
          onChordSelect={handleChordSelect}
        />
        
        {/* Loading Indicator for Chord */}
        {isChordLoading && (
          <div style={{ 
            margin: "20px 0", 
            display: "inline-block"
          }}>
            <div className="loading-spinner" style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              animation: "spin 2s linear infinite",
              display: "inline-block",
              marginRight: "10px",
              verticalAlign: "middle"
            }}></div>
            <span style={{ verticalAlign: "middle" }}>Generating...</span>
          </div>
        )}

        {/* Display Generated Chord */}
        {resultChord.length > 0 && resultChord[0] !== "Invalid selection" && (
          <div className="result-container" style={{ 
            padding: "20px", 
            margin: "20px auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            maxWidth: "800px"
          }}>
            <h3 style={{ color: "#2c3e50" }}>Generated Chord notes</h3>
            <p style={{ fontSize: "18px", letterSpacing: "1px" }}>{resultChord.join(" - ")}</p>
          </div>
        )}
      </div>
      
      {/* Error Display */}
      {error && (
        <div style={{ color: "red", marginTop: "20px", padding: "10px", backgroundColor: "#ffeeee", borderRadius: "5px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div>
        <h4>Designed by Brennan Wade</h4>
      </div>
    </div>
  );
}

export default App;
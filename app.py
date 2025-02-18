from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from scales import Scale, scale_modes_intervals
from chords import Chord, chord_types
import os

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Serve React APP - ROOT ROUTE
@app.route('/')
def serve_react():
    return send_file('static/index.html')

@app.route('/api/generate-scale', methods=['POST'])
def generate_scale():
    data = request.get_json()
    root_note = data.get('root_note')
    scale_type = data.get('scale_type')

    if not root_note or not scale_type:
        return jsonify({'error': 'Both root_note and scale_type parameters are required.'}), 400

    scale = Scale(root_note, scale_type)
    result = scale.generate_scale()
    return jsonify(result)

@app.route('/api/generate-chord', methods=['POST'])
def generate_chord():
    data = request.get_json()
    root_note = data.get('root_note')
    chord_type = data.get('chord_type')

    if not root_note or not chord_type:
        return jsonify({'error': 'Missing parameters'}), 400
    
    chord = Chord(root_note, chord_type)
    result = chord.generate_chord()
    return jsonify(result)

@app.route('/api/scales', methods=['GET'])
def list_scales():
    return jsonify(list(scale_modes_intervals.keys()))

@app.route('/api/chords', methods=['GET'])
def list_chords():
    return jsonify(list(chord_types.keys()))

if __name__ == '__main__':
    app.run(debug=True)
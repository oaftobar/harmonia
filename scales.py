from constants import notes

scale_modes_intervals = {
    'Ionian/Major': [2, 2, 1, 2, 2, 2, 1],
    'Dorian': [2, 1, 2, 2, 2, 1, 2],
    'Phrygian': [1, 2, 2, 2, 1, 2, 2],
    'Lydian': [2, 2, 2, 1, 2, 2, 1],
    'Mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'Aeolian/Minor': [2, 1, 2, 2, 1, 2, 2],
    'Locrian': [1, 2, 2, 1, 2, 2, 2]
}

mode_chord_progressions = {
    'Ionian/Major': ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    'Dorian': ['i', 'ii', '♭III', 'IV', 'v', 'vi°', '♭VII'],
    'Phrygian': ['i', '♭II', '♭III', 'iv', 'v°', '♭VI', '♭vii'],
    'Lydian': ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'],
    'Mixolydian': ['I', 'ii', 'iii°', 'IV', 'v', 'vi', '♭VII'],
    'Aeolian/Minor': ['i', 'ii°', '♭III', 'iv', 'v', '♭VI', '♭VII'],
    'Locrian': ['i°', '♭II', '♭III', 'iv', '♭V', '♭VI', '♭vii']
}

note_preference = {
    'A#/B♭': 'B♭',
    'C#/D♭': 'D♭',
    'D#/E♭': 'E♭',
    'F#/G♭': 'G♭',
    'G#/A♭': 'A♭'
}

class Scale:
    def __init__(self, root_note, scale_type):
        self.root_note = root_note
        self.scale_type = scale_type
        self.intervals = scale_modes_intervals.get(self.scale_type)
        self.chord_progression = mode_chord_progressions.get(self.scale_type, [])

    def is_valid_root(self):
        return self.root_note in notes
    
    def is_valid_scale_type(self):
        return self.intervals is not None
    
    def apply_note_preference(self, note, used_letters):
        if note in note_preference:
            preferred = note_preference[note]
            return preferred
        return note

    def translate_chord(self, roman_numeral, scale_notes, used_letters):
        # Remove accidentals from roman numeral
        base_numeral = ''.join(c for c in roman_numeral if c.isalpha())

        # Convert roman numeral position (1-based)
        roman_to_num = {'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5, 'vi': 6, 'vii': 7}
        position = roman_to_num[base_numeral.lower()] - 1

        # Get the root note for this chord
        chord_root = self.apply_note_preference(scale_notes[position], used_letters)
        used_letters.add(chord_root[0])

        # Determine chord quality
        is_major = base_numeral.isupper()
        has_dim = '°' in roman_numeral
        return f"{chord_root}{'°' if has_dim else 'm' if not is_major else ''}"

    def generate_scale(self):
        if not self.is_valid_root():
            return {'error': 'Invalid root note.', 'error': True}

        if not self.is_valid_scale_type():
            return {'error': 'Invalid scale type.', 'error': True}
        
        scale = []
        used_letters = set()
        index = notes.index(self.root_note)

        # Generate scale notes
        for interval in self.intervals:
            note = notes[index]
            adjusted_note = self.apply_note_preference(note, used_letters)
            scale.append(adjusted_note)
            used_letters.add(adjusted_note[0])
            index = (index + interval) % len(notes)

        # Translate chord progression to actual chord names
        chord_names = [self.translate_chord(roman, scale, set()) for roman in self.chord_progression]

        return {
            'scale': scale, 
            'chord_progression': self.chord_progression,
            'chord_names': chord_names
        }
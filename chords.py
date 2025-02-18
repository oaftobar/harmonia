from constants import notes

chord_types = {
    'major': [4, 3],
    'minor': [3, 4],
    'diminished': [3, 3],
    'augmented': [4, 4],
    'sus2': [2, 5],
    'sus4': [5, 2],
    'major7': [4, 3, 4],
    'minor7': [3, 4, 3],
    'dominant7': [4, 3, 3]
}

note_preference = {
    'A#/B♭': 'B♭',
    'C#/D♭': 'D♭',
    'D#/E♭': 'E♭',
    'F#/G♭': 'G♭',
    'G#/A♭': 'A♭'
}

class Chord:
    def __init__(self, root_note, chord_type):
        self.root_note = root_note
        self.chord_type = chord_type.lower()
        self.intervals = chord_types.get(self.chord_type)

    def is_valid_root(self):
        return self.root_note in notes
    
    def is_valid_chord_type(self):
        return self.intervals is not None
    
    def apply_note_preference(self, note, used_letters):
        if note in note_preference:
            preferred = note_preference[note]
            return preferred
        return note

    def generate_chord(self):
        if not self.is_valid_root():
            return {'error': 'Invalid root note.', 'error': True}, 400
        if not self.is_valid_chord_type():
            return {'error': 'Invalid chord type.', 'error': True}, 400
        
        chord = [self.root_note]
        index = notes.index(self.root_note)
        used_letters = set(self.root_note[0])

        for interval in self.intervals:
            index = (index + interval) % len(notes)
            next_note = notes[index]

            if next_note[0] in used_letters:
                next_note = next_note.split('/')[1] if '/' in next_note else next_note
            
            chord.append(next_note)
            used_letters.add(next_note[0])
            
        return {'chord': chord, 'symbol': self.get_chord_symbol()}
    
    def get_chord_symbol(self):
        symbols = {
            'major': '',
            'minor': 'm',
            'diminished': '°',
            'augmented': '+',
            'sus2': 'sus2',
            'sus4': 'sus4',
            'major7': 'maj7',
            'minor7': 'min7',
            'dominant7': '7'
        }
        return f"{self.root_note}{symbols.get(self.chord_type, '')}"
var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.1;
var susPercent = 0.1;
var releaseTime = 0.2;

var env, triOsc;
var frequencies = [];
var MIN_FREQ = 110;
var octaves = 6;
var MAX_FREQ = 2**octaves * MIN_FREQ;
var notes = [];

var styleSelector;
var tonalitySelector;


var STYLES_MAP = {
  "Whole tones": [0, 2, 4, 6, 8, 10],
  "Half tones": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  "Triad minor": [0, 3, 7],
  "Triad major": [0, 4, 7],
  "Diminished": [0, 3, 6, 9],
  "Augmented": [0, 4, 8],
  "Major 7": [0, 4, 7, 11],
  "Minor 7": [0, 3, 7, 10],
  "Minor major 7": [0, 3, 7, 11],
  "Major scale": [0, 2, 4, 5, 7, 9, 11],
  "Minor scale": [0, 2, 3, 5, 7, 8, 10],
  "Minor harmonic": [0, 2, 3, 5, 7, 8, 11],
  "Minor melodic": [0, 2, 3, 5, 7, 9, 11],
  "Spanish": [0, 1, 4, 5, 7, 8, 11],
  "Tritone": [0, 6],
  "Fifth": [0, 7],
  "Pentatonic major": [0, 2, 4, 7, 9],
  "Pentatonic minor": [0, 3, 5, 7, 10],
}

var TONALITIES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', ];


function setupMusic () {
  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  oscillator = new p5.Oscillator('sine');
  oscillator.amp(env);
  oscillator.start();

  styleSelector = createSelect();
  styleSelector.position(10, 10);
  styles = Object.keys(STYLES_MAP);
  for (var i = 0; i < styles.length; i++) {
    styleSelector.option(styles[i]);
  }
  styleSelector.changed(updateNotes);
  styleSelector.value('Spanish');

  tonalitySelector = createSelect();
  // tonalitySelector.position(10, 30);
  for (var i = 0; i < TONALITIES.length; i++) {
    tonalitySelector.option(TONALITIES[i]);
  }
  tonalitySelector.changed(updateNotes);  // TODO

  updateNotes();
}


function updateNotes() {
  notes = getNotesArray(MIN_FREQ, octaves, STYLES_MAP[styleSelector.value()]);
}


function playEnv() {
  var noteIndex = currentIndex % notes.length;
  var freq = notes[noteIndex];
  oscillator.freq(freq);
  env.play();
}


function getGradeFreqs(tonic, grades) {
  var freqs = [];
  var freq;
  for (var i = 0; i < grades.length; i++) {
    freqs.push(tonic * 2**(grades[i] / 12));
  }
  return freqs;
}

function getNotesArray(first, octaves, grades) {
  var freqs = [];
  var gradeFreqs;
  var tonic;
  for (var i = 0; i < octaves; i++) {
    tonic = first * 2**i;
    gradeFreqs = getGradeFreqs(tonic, grades);
    freqs.push.apply(freqs, gradeFreqs);
  }
  reversed = freqs.slice();
  reversed.reverse();
  reversed.splice(0, 1);
  reversed.splice(reversed.length - 1, 1);
  freqs.push.apply(freqs, reversed);
  return freqs;
}

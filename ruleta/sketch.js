var images = [];
var countries;
var files_map;
var filenames;
var assetsDir = 'assets/';
var emojisDir = assetsDir + 'emoji-flags/';
var scaling = 15;
var rx;
var ry;
var rPercentage = 0.95;
var currentCountry;
var currentIndex;
var theta;

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.1;
var susPercent = 0.1;
var releaseTime = 0.2;

var env, triOsc;
var frequencies = [];
var MIN_FREQ = 55;
var octaves = 7;
var MAX_FREQ = 2**octaves * MIN_FREQ;
var notes = [];
var WHOLE_TONES = [0, 2, 4, 6, 8, 10];
var HALF_TONES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var TRIAD_MINOR = [0, 3, 7];
var TRIAD_MAJOR = [0, 4, 7];
var DIMINISHED = [0, 3, 6, 9];
var AUGMENTED = [0, 4, 8];
var MAJOR_7 = [0, 4, 7, 11];
var MINOR_7 = [0, 3, 7, 10];
var MINOR_MAJOR_7 = [0, 3, 7, 11];
var MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
// var MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];
var MINOR_HARMONIC = [0, 2, 3, 5, 7, 8, 11];
var MINOR_MELODIC = [0, 2, 3, 5, 7, 9, 11];
var SPANISH = [0, 1, 4, 5, 7, 8, 11];
var TRITONE = [0, 6];
var FIFTH = [0, 7];
var PENTATONIC_MAJOR = [0, 2, 4, 7, 9];
// var PENTATONIC_MINOR = [0, 3, 5, 7, 10];

var grades = SPANISH;


function preload() {
  countries = Object.keys(files_map);
  filenames = Object.values(files_map);

  for(var i = 0; i < filenames.length; i++) {
    filepath = emojisDir + filenames[i];
    images.push(loadImage(filepath));
  }
}


function imageLoaded(image) {
  images.push(image);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rx = rPercentage * width / 2;
  ry = rPercentage * height / 2;

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('sine');
  triOsc.amp(env);
  triOsc.start();

  var freq;
  for (var i = 0; i < images.length; i++) {
    freq = MIN_FREQ * 2**(i / 12);
    frequencies.push(freq);
  }
  notes = getNotesArray(MIN_FREQ, octaves);
}


function draw() {
  background(50);
  translate(width / 2, height / 2);
  drawFlags();
  drawHand();
  drawLargeFlag();
}


function drawFlags() {
  var x;
  var y;
  var img;
  var N = images.length;
  var flagTheta;
  for (var i = 0; i < N; i++) {
    img = images[i];
    imWidth = img.width / scaling;
    imHeight = img.height / scaling;
    flagTheta = i / N * TAU;
    x = ry * cos(flagTheta) - imWidth / 2;
    y = ry * sin(flagTheta) - imHeight / 2;
    image(img, x, y, imWidth, imHeight);
  }
}


function drawHand() {
  var tMouseX = mouseX - width / 2;
  var tMouseY = mouseY - height / 2;
  var originX = width / 2;
  var originY = height / 2;
  var r = ry;
  theta = atan2(tMouseY, tMouseX);
  if (theta < 0) {
    theta += TAU;
  }
  var x = r * cos(theta);
  var y = ry * sin(theta);
  stroke(255);
  line(0, 0, x, y);
}


function drawLargeFlag()  {
  // currentIndex = Math.round(map(mouseX, 0, width, 0, images.length - 1));
  currentIndex = Math.round(map(theta, 0, TAU, 0, images.length - 1));
  var img = images[currentIndex];
  var w = img.width * 2;
  var h = img.height * 2;
  image(img, -w / 2, -h / 2, w, h);
  var oldCountry = currentCountry;
  currentCountry = countries[currentIndex];
  if (currentCountry != oldCountry) {
    print(currentCountry);
    playEnv();
  }
}

function playEnv() {
  // var freq = map(mouseY, 0, height, MIN_FREQ, MAX_FREQ);
  // var freq = frequencies[currentIndex];
  var noteIndex = currentIndex % notes.length;
  var freq = notes[noteIndex];
  triOsc.freq(freq);
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

function getNotesArray(first, octaves) {
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

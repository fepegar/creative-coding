
// var notes = [60, 62, 64, 65, 67, 69, 71, 72, 71, -1, 67, -1, 67, -1, -1, -1,
//              59, 60, 62, 64, 65, 67, 69, 71, 69, -1, 67, -1, 64, -1, -1, -1,
//              60, 64, 67, 64, 60, 64, 67, 64, 65, 69, 72, 69, 72, -1, -1, -1,
//              72, 71, 69, 67, 65, 64, 62, 60, 62, -1, -1, 60, 60];


var bass1_1 =   [36, -1, -1, -1, 43, -1, -1, -1, 36, -1, -1, -1, 43, -1, -1, -1,
                 36, -1, 38, -1, 40, -1, 36, -1, 41, -1, -1, -1, 36, -1, -1, -1,
                 41, -1, -1, -1, 36, -1, -1, -1, 36, -1, -1, -1, 43, -1, -1, -1,
                 38, -1, -1, -1, 45, -1, -1, -1, 43, -1, -1, -1, 38, -1, -1, -1];


var bass1_2 = [36, -1, -1, -1, 43, -1, -1, -1, 36, -1, -1, -1, 43, -1, -1, -1,
               36, -1, 38, -1, 40, -1, 36, -1, 41, -1, -1, -1, 36, -1, -1, -1,
               41, -1, 38, -1, 31, -1, 35, -1, 36, -1, -1, -1, 43, -1, -1, -1,
               38, -1, -1, -1, 45, -1, -1, -1, 43, -1, 41, -1, 39, -1, 38, -1];

var bass2_1 = [36, -1, 43, -1, 36, -1, 43, -1, 41, -1, 36, -1, 41, -1, 36, -1,
               36, -1, 43, -1, 36, -1, 43, -1, 41, 39, 38, 36, 35, 36, 38, -1,
               36, -1, 43, -1, 36, -1, 43, -1];

var bass2_2 = [36, -1, 43, -1, 36, -1, 43, -1, 41, -1, 36, -1, 41, -1, 36, -1,
               36, -1, 43, -1, 36, -1, 43, -1, 41, 39, 38, 36, 35, 36, 38, -1,
               36, -1, -1, -1, -1, -1, -1, -1];


var phrase1 = [67, -1, -1, 68, 67, -1, 66, -1, 67, 63, -1, 62, 60, -1, -1, -1,
              -1, 72, -1, 72, 72, 70, 68, 67, 68, 65, -1, -1, -1, -1, -1, -1,
              -1, 68, -1, 65, 62, -1, 68, -1, 67, 63, -1, 62, 60, -1, -1, -1,
              62, 62, -1, 62, 62, -1, 63, 65, 67, -1, 68, -1, 67, -1, -1, -1];

var phrase2 = [60, 62, 63, 65, 67, 66, 67, -1, -1,
               72, -1, 68, 65, -1, -1, -1,
               -1, 67, -1, 63, 60, -1, -1, -1,
               65, 63, 62, 60, 59, 60, 62, -1, 60, -1, -1, -1, -1, -1, -1, -1];

var notes = phrase1;
notes = notes.concat(phrase1);
notes = notes.concat(phrase2);
notes = notes.concat(phrase2);

var notesBass = bass1_1;
notesBass = notesBass.concat(bass1_2);
notesBass = notesBass.concat(bass2_1);
notesBass = notesBass.concat(bass2_2);
var bassIdx = 0;

var noteIdx = 0;
var t;
var tSinceLast;
var tNote = 0;
var particles = [];
var period = 400;
var ready = false;
var lineY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lineY = 0.9 * height;
}


function draw() {
  if (!ready) return;
  update();
  t = millis();
  tSinceLast = t - tNote;
  if (tSinceLast > period && noteIdx < notes.length) {
    tNote = t;
    tSinceLast = 0;
    var note = notes[noteIdx++];
    if (note >= 0) {
      particles.push(new Particle(note, 15));
    }

    var noteBass = notesBass[bassIdx++];
    if(noteBass >= 0){
      particles.push(new Particle(notesBass[noteIdx-1], 30));
    }

    period *= 0.995;
  }

  clear();
  strokeWeight(2);
  stroke(0);
  line(0, lineY, width, lineY);
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].show();
  }
}


function update() {
  var particle;
  for (var i = particles.length-1; i >= 0; i--) {
    particle = particles[i];
    if (particle.p.y > lineY) {
      particle.play();
      particles.splice(i, 1);
    }
  }
}


function Particle(note, d) {

  this.p = createVector(mouseX, mouseY);
  this.d = d;
  this.note = note;

  this.getV = function(note) {
    var x = map(note, 31, 72, 0.1*width, 0.9*width);
    var pFin = createVector(x, lineY);
    var v = p5.Vector.sub(pFin, this.p);
    var d = dist(pFin.x, pFin.y, this.p.x, this.p.y);
    // v.setMag(d / period);
    v.div(100);
    return v;
  }

  this.v = this.getV(this.note);
  this.env = new p5.Env();
  this.env.setADSR(0.03, 0.1, 0.3, 0.05);
  this.env.setRange(0.9, 0);

  this.wave = new p5.Oscillator();
  this.wave.setType('sine');
  this.wave.start();
  this.wave.freq(midiToFreq(this.note));
  this.wave.amp(this.env);


  this.move = function() {
    this.p.add(this.v);
  }


  this.show = function() {
    fill(50, 180, 50);
    noStroke();
    ellipse(this.p.x, this.p.y, this.d);
  }


  this.play = function() {
    this.env.play();
  }
}


function mouseClicked() {
  ready = true;
}

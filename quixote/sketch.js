balls = [];
var color1, color2;
var MIN_COLOR = 50;
var positions = [];
var FIRST_LINE = 1960;
var TXT_PATH = 'book.txt';
var lines;
var osc;




function preload() {
  lines = loadStrings(TXT_PATH);
}


function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  init();

  lines = lines.slice(FIRST_LINE);

  // for(var i = 0; i < lines.length; i++) {
  //   playString(lines[i]);
  // }
}


function draw() {
  colorMode(RGB);
  background(50);
  var x;
  if (random(2) > 1) {
    x = DOT;
  } else {x = DASH;}
  balls.push(new Ball(x));

  for(var i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}


function init() {
  colorMode(HSB);
  color1 = color(random(360),
                 random(MIN_COLOR, 100),
                 random(MIN_COLOR, 100),
                 50);

  color2 = color(random(360),
                 random(MIN_COLOR, 100),
                 random(MIN_COLOR, 100),
                 50);

  osc = new p5.SinOsc();
  osc.freq(700);

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 1, 1, 0.01);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.amp(0);
  osc.start();
}

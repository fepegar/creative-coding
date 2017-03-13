
var points;
var n = 8;
var l;
var sliderN;
var sliderA;
var sliderT;

function setup() {

  createCanvas(windowWidth, windowHeight);

  sliderN = createSlider(1, 800, 20);
  sliderN.position(0, 0);
  sliderA = createSlider(0, 500, 50);
  sliderA.position(0, sliderN.height);
  sliderT = createSlider(-3, 3, 0, 0.1);
  sliderT.position(0, 2*sliderN.height);

  sliderN.input(init);

  l = 0.25 * min(width, height);
  init();
}

function draw() {
  fill(255, 0, 0);
  background(255);
  translate(width/2, height/2);
  curveTightness(sliderT.value());
  beginShape();
  points[0].show();
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    point.show();
  }
  // points[points.length-1].show();
  points[0].show();
  endShape(CLOSE);
}


function init() {
  points = [];
  n = sliderN.value();
  for (var i = 0; i < n; i++) {
    var angle = map(i, 0, n, 0, 2*PI);
    points.push(new Point(angle, random(10000)));
  }
}


function Point(angle, seed) {
  this.angle = angle;
  this.seed = seed;

  this.show = function() {
    var a = sliderA.value();
    this.l = l + a*(noise(frameCount/100 + this.seed) - 0.5);
    var x = this.l * cos(this.angle);
    var y = this.l * sin(this.angle);
    curveVertex(x, y);
  }
}

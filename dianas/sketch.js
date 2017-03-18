
var start;
var angle;
var stop;
var wheels;
var d;
var sliderAngle;
var sliderCircles;
var numWheels;

function setup() {
  createCanvas(windowWidth, windowHeight);

  sliderAngle = createSlider(2, 100, 20, 2);
  sliderAngle.position(0, 0);
  sliderAngle.input(init);

  sliderCircles = createSlider(2, 20, 6);
  sliderCircles.position(0, sliderAngle.height);
  sliderCircles.input(init);

  init();
}

function draw() {
  background(100, 10, 140);
  translate(width/2, height/2);

  strokeWeight(2);

  for (var i = 0; i < wheels.length; i++) {
    wheels[i].show();
  }
}


function init() {
  wheels = [];
  d = 0.85 * min(width, height);
  angle = radians(360 / sliderAngle.value());
  numWheels = sliderCircles.value();
  step = d / numWheels;

  for(var i = d; i > 0; i -= step) {
    wheels.push(new Wheel(i));
  }
}



function Wheel(d) {
  this.d = d;

  this.seed = random(10000);

  this.show = function() {
    var alph = map(mouseX, width, 0, 0, 255);
    stroke(0, alph);
    var noiseFactor = map(mouseY, 0, height, 0, 5);
    var angleNoise = noiseFactor * noise(frameCount / 100 + this.seed);
    for (var i = 0 + angleNoise; i < 2*PI + angleNoise; i+=2*angle) {
      start = i;
      stop = start + angle;
      fill(0, alph);
      arc(0, 0, this.d, this.d, start, stop);

      start = stop;
      stop = start + angle;
      fill(255, 230, 0, alph);
      arc(0, 0, this.d, this.d, start, stop);
    }
  }
}

var balls = [];
var ballIdx = 0;
var tail = 0;
var stopDrawing = false;
var drawBG = false;
var mouseVisible = false;
var GRAVITY_INITIAL = 0.1;
var GRAVITY_MAX = 3;
var GRAVITY_STEP = 0.001;
var gravity = GRAVITY_INITIAL;
var center;
var noisyBalls = false;

function setup() {
  //createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);
  background(0);
  center = createVector(width/2, height/2);
}

function draw() {
  catchKeys();
  
  if(stopDrawing){
    return;
  }
  colorMode(RGB, 255, 255, 255);
  tail = constrain(tail, 50, 255);
  fill(255 * int(drawBG), 255-tail);
  rect(0, 0, width, height);
  
  for(var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
  
  showMousePosition();
}


function addBall() {
  console.log("Adding ball number ", ballIdx);
  colorMode(HSB, 100, 100, 100);
  
  var maxSpeed = 4;
  var position = createVector(random(width), random(height));
  var velocity = createVector(random(-maxSpeed, maxSpeed), random(-maxSpeed/2, 0));
  var diameter = random(3, 10);
  var fillColor = color(random(100), random(60, 100), random(60, 100));
  
  balls[ballIdx++] = new Ball(position, velocity, gravity, diameter, fillColor, balls);
}                     


function removeBall() {
  if(balls.length > 0) {
    console.log("Removing ball number ", ballIdx-1);
    balls.splice(--ballIdx);
  }
  else {
    console.log('No balls left!');
  }
}


function removeAllBalls() {
  balls = [];
  ballIdx = 0;
}


function showMousePosition() {
  if(!mouseVisible) return;
  colorMode(RGB, 255, 255, 255, 100);
  fill(255, 255, 255, 5);
  noStroke();
  ellipse(mouseX, mouseY, 100);
}

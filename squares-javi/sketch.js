var khakiWeb;
var oxfordBlue;
var circles = [];
var sameInitialSpeed = true;
var move = true;


function setup() {
  let minSide = min(windowWidth, windowHeight);
  createCanvas(minSide, minSide);
  khakiWeb = color(178, 170, 142);
  oxfordBlue = color(12, 27, 51);
  noStroke();
  rectMode(CENTER);
  randomSeed(42);
  noiseSeed(42);
  makeCircles();
}

function draw() {
  background(oxfordBlue);  // draw outer square
  translate(width/2, height/2);
  circles.forEach(circle => {
    circle.update();
  });
}

// If we want to make it recursive
function drawShapes(diameter) {
  if (diameter < 1) {
    return;
  }
  drawCircle(diameter);
  let side = getSquareSide(diameter);
  drawSquare(side);
  drawShapes(side);
}

function drawCircle(diameter) {
  fill(khakiWeb);
  circle(0, 0, diameter);
}

function drawSquare(side) {
  fill(oxfordBlue);
  rect(0, 0, side, side);
}

function getSquareSide(diagonal) {
  return diagonal / sqrt(2);
}

function makeCircles() {
  let diameter = width;
  do {
    circ = new Circle(diameter);
    circles.push(circ);
    diameter = circ.square.side;
  } while(diameter >= 1)
}

function Circle(diameter) {
  this.diameter = diameter;
  this.square = new Square(getSquareSide(diameter));

  this.update = function() {
    this.draw();
    this.square.update();
  }

  this.draw = function() {
    drawCircle(this.diameter);
  }
}

function Square(side) {
  this.side = side;
  this.theta = 0;
  this.speed = 0.001;

  if (sameInitialSpeed) {
    this.offset = 0;
  } else {
    this.offset = random(100000);
  }

  this.update = function() {
    if (move) {
      this.move();
    }
    this.draw();
  }

  this.move = function() {
    let value = noise(frameCount * this.speed + this.offset);
    this.theta = map(value, 0, 1, -TWO_PI, TWO_PI);
  }

  this.draw = function() {
    rotate(this.theta);
    drawSquare(this.side);
  }
}

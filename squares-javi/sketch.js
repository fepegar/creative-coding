var khakiWeb;
var oxfordBlue;

function setup() {
  let minSide = min(windowWidth, windowHeight);
  createCanvas(minSide, minSide);
  khakiWeb = color(178, 170, 142);
  oxfordBlue = color(12, 27, 51);
  noStroke();
  rectMode(CENTER);
  background(oxfordBlue);
  translate(width/2, height/2);
  let diameter = width;
  drawShapes(diameter);
}


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
  ellipse(0, 0, diameter, diameter);
}

function drawSquare(side) {
  fill(oxfordBlue);
  rect(0, 0, side, side);
}

function getSquareSide(diagonal) {
  return diagonal / sqrt(2);
}

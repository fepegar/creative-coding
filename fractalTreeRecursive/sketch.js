
var scale;
var alpha;
var initialLength;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialLength = height / 4;
}

function draw() {
  background(50);
  scale = map(mouseX, 0, width, 0.4, 0.7);
  alpha = map(mouseY, 0, height, 0, 3*PI/4);
  translate(width/2, height);
  branch(initialLength);
}

function branch(len, w) {
  if (len < 2) return;
  stroke(255);
  strokeWeight(map(len, 0, initialLength, 0, 8));
  line(0, 0, 0, -len);
  translate(0, -len);

  push();
  rotate(alpha);
  branch(len * scale);
  pop();

  push();
  rotate(-alpha);
  branch(len * scale);
  pop();
}

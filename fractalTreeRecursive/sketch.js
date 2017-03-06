
var scaling;
var angle;
var initialLength;
var initialBranches = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialLength = height / 4;
}

function draw() {
  background(50);
  scaling = map(mouseX, 0, width, 0.4, 0.7);
  maxAlpha = map(mouseY, 0, height, 0, 3*PI/4);
  translate(width/2, height);
  branch(initialLength, initialBranches);
}

function branch(len, n) {
  if (len < 4) return;
  stroke(255);
  strokeWeight(map(len, 0, initialLength, 0, 8));
  line(0, 0, 0, -len);
  translate(0, -len);
  var angle;

  for(var i = 0; i < n; i++) {
    angle = map(i, 0, n-1, -maxAlpha, maxAlpha);
    push();
    rotate(angle);
    branch(len * scaling, 2);
    pop();
  }
}

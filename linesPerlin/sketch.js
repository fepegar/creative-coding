var GRAY;
var BEIGE;
var lines = [];

var THICKNESS = 2;
var NUM_LINES = 5;
var AMPLITUDE = 50;

function setup() {
  let side = min(windowWidth, windowHeight)
  createCanvas(side, side);
  GRAY = 50;
  BEIGE = color(240, 240, 170);
  initLines();
}

function draw() {
  background(GRAY);
  fill(BEIGE);
  lines.forEach(l => {
    l.draw();
  });
  // d1 = AMPLITUDE * noise(frameCount / 100);
  // d2 = AMPLITUDE * noise((frameCount + 1000) / 100);
  // ellipse(width * 1 / 3, height / 2 + d1, 100, 100);
  // ellipse(width * 2 / 3, height / 2 + d2, 100, 100);
}

function initLines() {
  var l;
  var y = height / 10;
  var dY = 4/5 * height / NUM_LINES;
  for (let i = 0; i < NUM_LINES; i++) {
    l = new Line(y, i * 1000 * frameCount);
    lines.push(l);
    y += dY;
  }
}

function Line(y, t) {
  this.y = y;
  this.t = t;

  this.draw = function () {
    // translate(height / 2);
    stroke(BEIGE);
    strokeWeight(THICKNESS);
    beginShape(LINES);
    var y, t;
    for (let x = 0; x < width; x++) {
      t = (this.t + x) * frameCount / 1000;
      y = this.y + AMPLITUDE * noise(x / 50, this.y * frameCount / 10000);
      vertex(x, y);
    }
    endShape();
  }
}

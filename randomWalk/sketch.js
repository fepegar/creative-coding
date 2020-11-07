var walkers = [];
var maxSpeed = 20;
var inc = 0.1;

var hist = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function init() {
  background(30);
}

function draw() {
  if (walkers.length === 0) return;
  for (var i = 0; i < walkers.length; i++) {
    walker = walkers[i];
    walker.move();
    walker.draw();
  }
}

function mouseClicked() {
  walkers.push(new Walker(mouseX, mouseY));
}

function Walker(x, y) {
  this.p = createVector(x, y);
  this.v = createVector(0, 0);
  this.offsetX = random(frameCount);
  this.offsetY = random(frameCount * 2);
  this.pAnt = this.p.copy();
  this.color = color(
    random(255),
    random(255),
    random(255),
    50)
  this.random = 0;

  this.move = function() {
    if (this.random == 1) {
      this.v.x = floor(random(-maxSpeed, maxSpeed));
      this.v.y = floor(random(-maxSpeed, maxSpeed));
    }
    else {
      this.noiseX = noise(this.offsetX);
      this.noiseY = noise(this.offsetY);

      this.v.x = map(this.noiseX, 0, 1, -maxSpeed, maxSpeed);
      this.v.y = map(this.noiseY, 0, 1, -maxSpeed, maxSpeed);

      this.offsetX += inc;
      this.offsetY += inc;
    }

    var newP = p5.Vector.add(this.p, this.v);
    if (newP.x < 0) {
      this.v.x = 1;
    } else if (newP.x > width) {
      this.v.x = -1;
    }

    if (newP.y < 0) {
      this.v.y = 1;
    } else if (newP.y > height) {
      this.v.y = -1;
    }
    this.p.add(this.v);
  }

  this.draw = function() {
    stroke(this.color);
    strokeWeight(1);
    line(this.pAnt.x, this.pAnt.y, this.p.x, this.p.y);
    this.pAnt = this.p.copy();
  }
}

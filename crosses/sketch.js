
var crosses = []
var numCrosses = 30;
var gridSize = numCrosses * 3;
var crossLength;
var squareLength;
var omegaMax = 0.1;
var omegaMin = 0.05;
var vMin = 0.01;
var vMax = 0.1;


function setup() {
  var l = min(windowWidth, windowHeight);
  createCanvas(l, l);
  init();
}

function draw() {
  background(50);
  // if (frameCount % 50 == 0) {
  //   getRandomCross().moving = true;
  // }

  for (var i = 0; i < crosses.length; i++) {
    crosses[i].tickle();
    crosses[i].move();
    crosses[i].show();
  }
}


function grid() {
  stroke(0, 255, 0);
  noFill();
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var x = squareLength * (i + 1/2);
      var y = squareLength * (j + 1/2);
      rect(x, y, squareLength, squareLength);
    }
  }
}

function init() {
  rectMode(CENTER);
  crossLength = width / numCrosses;
  squareLength = crossLength / 3;

  var i = -1;
  var jIni = -1;
  var idx = 0;
  while(i <= gridSize) {
    for (var j = jIni; j <= gridSize; j += 10) {
      crosses.push(new Cross(i, j, crossLength, idx++));
    }
    jIni += 3;
    if (jIni >= 9) {
      jIni -= 10;
    }
    i++;
  }
}

function Cross(i, j, d, idx) {
  this.i = i;
  this.j = j;
  var pos = getXY(i, j);
  this.p = createVector(pos[0], pos[1]);
  if (random(2) < 1) {
    this.sense = 1;
  } else {
    this.sense = -1;
  }
  this.w = random(omegaMin, omegaMax) * this.sense;
  this.v = random(squareLength*vMin, squareLength*vMax);
  this.alpha = 0;
  this.length = d*1.02;
  this.idx = idx;
  this.rotating = false;
  this.translating = false;
  this.distance = 0;
  this.maxRotation = floor(random(1, 5)) * HALF_PI;

  this.tickle = function() {
    if (!mouseX || !mouseY || this.rotating) return;
    var mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    var d = dist(mouseX, mouseY, this.p.x, this.p.y);
    touching = d < this.length/2;
    if (touching) {
      var turnarounds = floor(map(mouseSpeed, 0, 100, 1, 5));
      this.maxRotation = turnarounds * HALF_PI;
      this.w = map(mouseSpeed, 0, 100, 0, omegaMax) * this.sense;
      this.rotating = true;
      this.translating = true;
    }
  }

  this.move = function() {
    if (this.rotating) {
      this.alpha += this.w;
      if (abs(this.alpha) > this.maxRotation) {
        this.rotating = false;
        this.alpha = 0;
      }
    }
    // if (this.translating) {
    //   this.distance += this.v;
    //   this.p.x += this.v;
    //   if (abs(this.distance >= squareLength)) {
    //     this.translating = false;
    //     this.distance = 0;
    //   }
    // }
  }

  this.show = function() {
    noStroke();

    push();
    translate(this.p.x, this.p.y);
    rotate(this.alpha);
    fill(250, 225, 0);
    rect(0, 0, this.length/3, this.length/3);

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if(abs(i) != abs(j)) {
          rect(i * squareLength, j * squareLength, this.length/3, this.length/3);
        }
      }
    }
    // stroke(0)
    // fill(0)
    // text(this.idx, 0, 0);
    pop();
  }
}


function getXY(i, j) {
  var x = squareLength * (i + 1/2);
  var y = squareLength * (j + 1/2);
  return [x, y];
}


function getRandomCross() {
  var idx = floor(random(crosses.length));
  return crosses[idx];
}


var slider;
var n;
var r;
var theta;
var theta2;
var pIni;
var pFin;
var rotTheta = 0;
var rotOmega = 0.005;
var stars = [];
var star;
var nStars = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = 0.9 * min(height, width) / 2;

  strokeCap(ROUND);
  stroke(255, 200, 0, 150);

  pIni = createVector(0,0);
  pFin = createVector(0,0);

  for(var i = 2; i < nStars+2; i++) {
    stars.push(new Star(i));
  }

}

function draw() {
  background(0, 10, 70)
  strokeWeight(1)
  fill(255);
  text(floor(frameRate()), 10, 20)


  nPointsA = floor(random(n));
  nPointsB = floor(random(n));



  strokeWeight(maxN/n);
  translate(width/2, height/2);
  rotate(-PI/2 + rotTheta);
  rotTheta += rotOmega;
  starIdx = floor(map(mouseX, 0, width, 0, stars.length-1));
  stars[starIdx].draw();

}


function Star(nPoints) {
  this.points = [];


  var x, y;
  for(var i = 0; i < nPoints; i++) {
    theta = i * 2*PI / nPoints;
    x = r * Math.cos(theta);
    y = r * Math.sin(theta);
    this.points.push(createVector(x, y))
  }

  this.draw = function() {
    for(var i = 0; i < nPoints; i++) {
      pIni = this.points[i];
      for(var j = i + 1; j < nPoints; j++) {
        pFin = this.points[j];
        line(pIni.x, pIni.y, pFin.x, pFin.y);
      }
    }
  }
}

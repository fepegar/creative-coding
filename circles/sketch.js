
var img;
var circles = [];
var randX;
var randY;
var tries = 0;
var maxTries = 10000;
var imresize = 2;
var meanColor;
var r, g, b;

function Circle (x, y, c, d) {
  this.x = x;
  this.y = y;
  this.c = c;
  this.d = d;

  this.draw = function() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.d);
  }
}

function preload() {
  img = loadImage('testCircles.jpg');
}

function setup() {
  img.loadPixels();
  img.resize(img.width*imresize, img.height*imresize)
  createCanvas(img.width, img.height);

  background(getMeanColor(img.pixels));
}

function draw() {
  var rToClosest;
  do {
    randX = random(width);
    randY = random(height);
    rToClosest = maxRadiusToClosestCircle(randX, randY);
  }
  while(rToClosest < 2);
  var c = img.get(randX, randY);
  var circle = new Circle(randX, randY, c, rToClosest*2);
  circle.draw();
  circles.push(circle);
}


function maxRadiusToClosestCircle(x, y) {
  var distToCenter;
  var circle;
  var circleRadius;
  var inside;
  var maxRadius = random(2, 10);

  for(var i = 0; i < circles.length; i++) {
    circle = circles[i];
    circleRadius = circle.d / 2;
    distToCenter = dist(x, y, circle.x, circle.y);
    inside = distToCenter < circleRadius;
    if(inside) {
      maxRadius = -1;
      break;
    }
    else {
      distToBorder = distToCenter - circleRadius;
      maxRadius = min(maxRadius, distToBorder);
    }
  }
  return maxRadius;
}


function getMeanColor(pixels) {
  var r = [];
  var g = [];
  var b = [];

  for(var i = 0; i < pixels.length; i += 4) {
    r.push(pixels[i]);
    g.push(pixels[i+1]);
    b.push(pixels[i+2]);
  }

  return color(mean(r), mean(g), mean(b));
}

function mean(arr) {
  return arr.reduce(function(a, b) { return a + b; }) / arr.length;
}

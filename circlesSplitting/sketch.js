
circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var d = 0.9*min(width, height);
  circles.push(new Circle(width/2, height/2, d));
}


function draw() {
  background('#2F242C');
  update();
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
  }
}


function update() {
  var newGeneration = [];
  var circle;
  for (var i = 0; i < circles.length; i++) {
    circle = circles[i];
    if (circle.mouseOver() && circle.d > 1) {
      var newCircles = circle.split();
      newGeneration.push.apply(newGeneration, newCircles);
    } else {
      newGeneration.push(circle);
    }
  }
  circles = newGeneration;
}


function Circle(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.color = color(
    red(color('#C179B9')),
    green(color('#C179B9')),
    blue(color('#C179B9')),
    200);

  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.d);
  }


  this.split = function() {
    var newCircles = [];
    newCircles.push(new Circle(
      this.x - this.d/4, this.y - d/4, this.d/2));
    newCircles.push(new Circle(
      this.x - this.d/4, this.y + d/4, this.d/2));
    newCircles.push(new Circle(
      this.x + this.d/4, this.y - d/4, this.d/2));
    newCircles.push(new Circle(
      this.x + this.d/4, this.y + d/4, this.d/2));
    return newCircles;
  }


  this.mouseOver = function() {
    return dist(mouseX, mouseY, this.x, this.y) < this.d/2;
  }
}

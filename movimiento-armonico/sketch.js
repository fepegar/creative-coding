var bg;
var balls = [];
var r;
var c;
var n = 12;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = color(37, 20, 75);
  r = min(width, height) / 3;
  c = color(255, 200, 30);

  for(var theta = 0; theta < PI; theta += PI/n) {
    print(degrees(theta));
    balls.push(new Ball(r, c, theta, theta));
  }
}


function draw() {
  background(bg);
  translate(width/2, height/2);
  noFill();
  stroke(c);
  ellipse(0, 0, 2 * r);
  for(var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();
  }
}


function Ball(r, c, theta, phi) {
  this.r = r;
  this.color = c;
  this.theta = theta;
  this.phi = phi;
  this.x = 0;
  this.y = 0;
  this.f = 1/50;

  this.move = function() {
    this.f = 1/map(mouseX, 0, width, 10, 100);
    var r = this.r * cos(this.f * frameCount + this.phi);
    this.x = r * cos(this.theta);
    this.y = r * sin(this.theta);
  }

  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10);

    var x = this.r * cos(this.theta);
    var y = this.r * sin(this.theta);

    stroke(255, 200, 0, 50);
    line(-x, -y, x, y);
  }
}

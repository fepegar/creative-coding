var alpha;
var bg;
var tClick;
var theta;
var dEye;
var RIGHT, DOWN, LEFT, UP;
var eye1, eye2;
var eyeColor;
var ALPHA_STEP;
var mouth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = color(10, 0, 30);
  background(bg);
  alpha = 0;
  theta = 0;
  dEye = 150;
  LEFT = 0;
  RIGHT = 1;
  DOWN = 2;
  UP = 3;
  eye1 = new Eye(width / 2 + 40, height / 2 - 40, 50);
  eye2 = new Eye(width / 2 - 40, height / 2 - 40, 50);
  ALPHA_STEP = -2;
  mouth = new Mouth();
}

function draw() {
  background(bg);
  mouth.display();
  if ((millis() - tClick < 2000) && (ALPHA_STEP > 0)) {
    return;
  }
  eye1.display();
  eye2.display();
}


function mouseClicked() {
  ALPHA_STEP *= -1;
  tClick = millis();
}


Mouth = function() {
  this.x = width / 2;
  this.y = height / 2;
  this.d = 200;
  this.alpha = 1;

  this.display = function() {
    noStroke();
    fill(255, 255, 255, this.alpha);
    ellipse(this.x, this.y, this.d);
    this.alpha += ALPHA_STEP;
    this.alpha = constrain(this.alpha, 0, 255);

    fill(bg);
    ellipse(this.x, this.y - 30, this.d * 1.05);

    stroke(bg, this.alpha);
    strokeWeight(2);
    var x = width / 2;
    for (var i = 6; i > 0; i--) {
      x += 4.5 * i;
      line(x, 0, x, width);
    }

    x = width / 2;
    line(x, 0, x, width);

    for (i = 6; i > 0; i--) {
      x -= 4.5 * i;
      line(x, 0, x, width);
    }
  }
}
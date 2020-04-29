var bar1;
var bar2;
var ball;
var barSpeed = 5;
var ballDiameter = 10;
var ballSpeed = 5;

function setup() {
  createCanvas(800, 600);
  bar1 = new Bar(1, barSpeed, color(130, 10, 10));
  bar2 = new Bar(2, barSpeed, color(10, 120, 10));
  ball = new Ball(ballDiameter, ballSpeed);
}

function draw() {
  catchKeys();
  background(50, 50, 70);

  bar1.draw();
  bar2.draw();
  ball.update();
}

function Bar(player, barSpeed, c) {
  this.player = player;
  if (player === 1) {
    this.x = width * 0.05;
  } else if (player === 2) {
    this.x = width * 0.95;
  }
  this.y = height / 2;
  this.speed = barSpeed;
  this.color = c;

  this.width = width / 100;
  this.height = height / 10;

  this.draw = function () {
    rectMode(CENTER);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

function Ball(diameter, speed) {
  this.speed = speed;
  this.diameter = diameter;
  this.radius = diameter / 2;

  this.update = function () {
    this.move();
    this.collide(bar1);
    this.collide(bar2);
    this.draw();
  }

  this.move = function () {
    this.p.add(this.v);
    if (this.p.y < this.radius || this.p.y > height - this.radius) {
      this.v.y *= -1;
    }
    if (this.p.x < this.radius || this.p.x > width - this.radius) {
      this.init();
    }
  }

  this.collide = function (bar) {
    if (this.p.y < bar.y - bar.height / 2 || this.p.y > bar.y + bar.height / 2) {
      return false;
    }
    if ((this.p.x - this.radius < bar.x + bar.width / 2) && (bar.player == 1)) {
      this.v.x *= -1;
      return true;
    } else if (this.p.x + this.radius > bar.x - bar.width / 2 && bar.player == 2) {
      this.v.x *= -1;
      return true;
    }
  }

  this.draw = function () {
    fill(255, 225, 100);
    noStroke();
    ellipse(this.p.x, this.p.y, this.diameter, this.diameter)
  }

  this.init = function () {
    this.p = createVector(width / 2, height / 2);
    this.v = createVector(random(-1, 1), random(-1, 1));
    this.v.normalize();
    this.v.mult(speed);
  }

  this.init();
}

function catchKeys() {
  if (!keyIsPressed) {
    return;
  }
  switch (keyCode) {
    case UP_ARROW:
      bar2.y -= bar2.speed;
      bar2.y = max(bar2.height / 2, bar2.y);
      break;
    case DOWN_ARROW:
      bar2.y += bar2.speed;
      bar2.y = min(height - bar2.height / 2, bar2.y);
      break;
    default:
      break;
  }

  switch (key) {
    case 'w':
      bar1.y -= bar1.speed;
      bar1.y = max(bar1.height / 2, bar1.y);
      break;
    case 's':
      bar1.y += bar1.speed;
      bar1.y = min(height - bar1.height / 2, bar1.y);
      break;
    default:
      break;
  }
}

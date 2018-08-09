// TODO: use inheritance polymorphism

var palette;
var receiver, sender;
var balls = [];

DELTA_V = 0.5;
GRAVITY = 0.5;
BALL_V = 1;
BALL_FREQ = 60;  // frames
RECEIVER_DIAMETER = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);

  palette = {
    'disco': color('#731963'),
    'turbo': color('#F0E100'),
    'moon mist': color('#E0DDCF'),
    'half baked': color('#75B8C8')
  }

  receiver = new Receiver(width/10, height/2,
                          RECEIVER_DIAMETER,
                          palette['moon mist']);

  sender = new Sender(width/2, height/2,
                          20,
                          palette['half baked']);

}

function draw() {
  background(palette['disco']);
  receiver.update();
  sender.update();

  for(var i = 0; i < balls.length; i++) {
    balls[i].update();
  }

  updateBalls();
}


function updateBalls() {
  var ball, distance;
  for (var i = balls.length-1; i >= 0; i--) {
    ball = balls[i];
    distance = dist(ball.p.x, ball.p.y, receiver.p.x, receiver.p.y);
    if (distance < RECEIVER_DIAMETER/2) {
      receiver.hit();
      balls.splice(i, 1);
    }
  }
}


function Receiver(x, y, diameter, color) {
  this.p = createVector(x, y);
  this.diameter = diameter;
  this.color = color;
  this.hits = [];


  this.update = function() {
    this.draw();
    for(var i = 0; i < this.hits.length; i++) {
      this.hits[i].update();
    }

    this.updateHits();
  }


  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipse(this.p.x, this.p.y, this.diameter);
  }


  this.hit = function() {
    var hit = new Hit(this.p.x, this.p.y, this.diameter, this.color, 1, 30);
    this.hits.push(hit);
  }


  this.updateHits = function () {
    var hit;
    for (var i = this.hits.length-1; i >= 0; i--) {
      hit = this.hits[i];
      if (hit.alpha <= 0) {
        this.hits.splice(i, 1);
      }
    }
  }
}


function Hit(x, y, diameter, color, v, life) {
  this.p = createVector(x, y);
  this.diameter = diameter;
  this.color = color;
  this.v = v;
  this.alpha = 100;
  this.d_alpha = 100 / life;

  this.osc = new p5.Oscillator();
  this.osc.setType('sine');
  this.osc.freq(240);
  this.osc.amp(0.5, 0.05);
  this.osc.start();
  this.osc.amp(0, 0.5);

  this.update = function() {
    this.move();
    this.draw();
    this.alpha -= this.d_alpha;
  }

  this.draw = function() {
    noFill();
    var alphaNow = this.life * 100 /
    stroke(getColorWithAlpha(this.color, this.alpha));
    ellipse(this.p.x, this.p.y, this.diameter)
  }

  this.move = function() {
    this.diameter += this.v;
  }
}


function getColorWithAlpha(c, a) {
  var levels = c.levels;
  var newColor = color(red(c),
                       green(c),
                       blue(c),
                       a);
  return newColor;
}


function Sender(x, y, diameter, color) {
  this.p = createVector(x, y);
  this.v = createVector(0, 0);

  this.diameter = diameter;
  this.color = color;

  this.update = function() {
    if (frameCount % BALL_FREQ == 0) {
      this.shoot();
    }

    this.move();
    this.draw();
  }

  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipse(this.p.x, this.p.y, this.diameter)
  }

  this.move = function() {
    this.p.add(this.v);
  }

  this.shoot = function() {
    direction = p5.Vector.sub(receiver.p, this.p);
    direction.normalize();
    v = p5.Vector.mult(direction, BALL_V);
    ball = new Ball(this.p.x, this.p.y, v);
    balls.push(ball);
  }
}




function Ball(x, y, v) {
  this.p = createVector(x, y);
  this.v = v;
  this.diameter = 10;
  this.color = palette['turbo'];
  // this.a = createVector(0, GRAVITY);

  this.update = function() {
    this.move();
    this.draw();
  }

  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipse(this.p.x, this.p.y, this.diameter)
  }

  this.move = function() {
    // this.v.add(this.a);
    this.p.add(this.v);
  }
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:
      sender.v.add(0, -DELTA_V);
      break;
    case DOWN_ARROW:
      sender.v.add(0, DELTA_V);
      break;
    case LEFT_ARROW:
      sender.v.add(-DELTA_V, 0);
      break;
    case RIGHT_ARROW:
      sender.v.add(DELTA_V, 0);
      break;
  }
  // if (keyCode == UP_ARROW) {
  //   sender.v.add(0, -DELTA_V);
  // } else if (keyCode === DOWN_ARROW) {
  //   sender.v.add(0, DELTA_V);
  // }
}


var SPEED = 1;
var DIAMETER = 5;
var LIFESPAN = 500;
var balls = [];
var target;
var bottomY;
var OUT = 0;
var IN = 1;
var freq = 20;
var N_OUT = 1;
var N_IN = 1.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bottomY = height/3;
  target = createVector(width/2, bottomY);
  frameRate(60);
}


function draw() {
  background(50, 50, 50);

  fill(70, 70, 70);
  rect(0, 0, width, bottomY)

  //translate(width/5, height/5);

  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, bottomY, width * 4/5 * 0.95, bottomY);

  stroke(0, 255, 08);
  line(0, 0, 0, height * 4/5 * 0.95);

  noStroke();
  fill(0, 0, 255);
  ellipse(target.x, target.y, 5);

  if(mouseX > 0 && mouseY > 0 && frameCount % freq == 0){
    balls.push(new Ball(mouseX, mouseY, target));
  }

  var toRemove = [];
  var ball;
  for(var i = 0; i < balls.length; i++) {
    ball = balls[i];
    ball.move();
    ball.draw();
    ball.checkBounce();
    if(ball.lifespan == 0) {
      toRemove.push(i);
    }
  }

  // Remove dead balls
  for(var i = 0; i < toRemove.length; i++) {
    balls.splice(toRemove[i], 1);
  }
}

function Ball(x, y, target) {
  this.p = createVector(x, y);
  this.s = p5.Vector.sub(target, this.p);
  this.s.normalize();
  this.s.mult(SPEED);
  this.d = DIAMETER;
  this.lifespan = LIFESPAN;
  this.bounced = false;

  if(this.p.y > bottomY) {
    this.side = OUT;
  } else {
    this.side = IN;
  }

  this.move = function() {
    this.p.add(this.s);
    this.lifespan--;
  }

  this.draw = function() {
    noStroke();
    var a = map(this.lifespan, 0, LIFESPAN, 0, 255);
    fill(250, 30, 200, a);
    ellipse(this.p.x, this.p.y, this.d)
  }

  this.checkBounce = function() {
    if(this.bounced) return;
    var side = this.p.y > bottomY ? OUT : IN;
    if(side != this.side) {
      this.interact();
    }
  }

  this.interact = function() {
    var theta1 = this.s.angleBetween(createVector(0, 100));
    console.log(degrees(theta1).toFixed(0));
    var n1, n2;
    if(this.side == IN) {
      n1 = N_IN;
      n2 = N_OUT;
    } else {
      n1 = N_OUT;
      n2 = N_IN;
    }

    theta2 = asin(n1/n2 * sin(theta1));

    var total = false;
    if(!theta2) {
      theta2 = theta1;
      total = true;
    }
    //print(degrees(theta1), degrees(theta2))
    var magS = this.s.mag() * n1/n2;
    var signX = sign(this.s.x);
    var signY = sign(this.s.y);
    this.s.x = magS * sin(theta2);
    this.s.y = magS * cos(theta2);

    if(sign(this.s.x) != signX) {
      this.s.x *= -1;
    }
    if(sign(this.s.y) != signY) {
      this.s.y *= -1;
    }
    if(total) {
      this.s.y *= -1;
    }
    this.bounced = true;
  }
}

function sign(n) {
  var s = n >= 0 ? 1 : -1;
  return s;
}

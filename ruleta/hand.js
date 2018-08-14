function Hand(r) {
  this.r = r;
  this.theta = 0;
  this.omega = 0;
  this.alphaFriction = 0;
  this.alphaImpulse = 0.001;
  this.impulseLife = 0;
  this.frictionCoefficient = this.alphaImpulse * 0.2;

  this.moveMouse = function() {
    var tMouseX = mouseX - width / 2;
    var tMouseY = mouseY - height / 2;
    var originX = width / 2;
    var originY = height / 2;
    this.theta = atan2(tMouseY, tMouseX);
    if (this.theta < 0) {
      this.theta += TAU;
    }
  }

  this.movePhysics = function() {
    this.alphaFriction = -this.omega;

    if (this.alphaFriction != 0) {
      this.alphaFriction /= abs(this.alphaFriction);
    }
    this.alphaFriction *= this.frictionCoefficient;

    if (this.impulseLife > 0) {
      this.impulseLife--;
      this.omega += this.alphaImpulse;
    }
    this.omega += this.alphaFriction;

    if (this.omega < 0.0001) {
      this.omega = 0;
    }

    this.theta += this.omega;
    if (this.theta >= TAU) {
      this.theta -= TAU;
    }
  }

  this.move = this.movePhysics;

  this.draw = function() {
    stroke(255);
    rotate(this.theta)
    fill(30, 230, 250);
    noStroke();
    triangle(0, 10, 0, -10, this.r, 0);
    rotate(-this.theta)
  }

  this.update = function() {
    this.move();
    this.draw();
  }

  this.impulse = function(seconds) {
    frames = Math.round(seconds * frameRate());
    this.impulseLife += frames;
  }
}

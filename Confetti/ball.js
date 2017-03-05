function Ball(position, velocity, gravity, diameter, fillColor, others) {
  this.p = position;
  this.v = velocity;
  this.d = diameter;
  this.gravity = gravity;
  this.fillColor = fillColor;
  this.others = others;
  
  // Apply gravity to acceleration
  this.a = createVector(0, gravity);
  
  // To collide
  this.id = others.length - 1;
  this.SPRING = 0.25;
  
  // Go to center
  this.toCenter = false;
  
  // Run from mouse
  this.minDistToMouse = 50;
  
  // Noise parameters
  this.noisy = false;
  this.maxNoiseValue = 4;
  this.t = random(1000);
  this.tStep = 0.1;
  
  // Pulsing diameter
  this.pulse = false;
  this.pulseDiameterRef = this.d;
  this.pulseSpeed = 0.02;
  this.maxPulseRatio = 3;
  
  // Display
  this.hu = hue(fillColor);
  this.sa = saturation(fillColor);
  this.br = brightness(fillColor);
  this.HUE_STEP = 0.1;
  this.strokeAlpha = 0;
  
  this.move = function() {
    this.goToCenter();
    this.addNoise();
    this.checkBorders();
    this.runFromMouse(this.minDistToMouse);
    this.collide();
    this.p.add(this.v);
  }
  
  
  this.display = function() {
    
    this.updatePulse();
    
    colorMode(HSB, 100, 100, 100, 255); 
    stroke(0, this.strokeAlpha);
    fill(this.fillColor);
    ellipse(this.p.x, this.p.y, this.d);
    this.hu += this.HUE_STEP;
    if(this.hu > 100) {
      this.hu = 0;
    }
    this.fillColor = color(this.hu, this.sa, this.br);
  }
  
  
  this.goToCenter = function() {
    if(this.toCenter) {
      var diffToCenter = p5.Vector.sub(center, this.p);
      diffToCenter.mult(diffToCenter.mag());
      diffToCenter.div(10000);
      this.v = diffToCenter;
    }
  }
  
  
  this.addNoise = function() {
    if(this.noisy) {
      // We want different values for x and y
      // Noise value is between - and + noiseFactor
      this.p.add(this.maxNoiseValue * (noise(this.t)-0.5),
                 this.maxNoiseValue * (noise(this.t+100)-0.5));
      this.t += this.tStep;
    }
  }
  
  
  this.checkBorders = function() {
    var radius = this.d / 2;
    var distanceBottom = height - this.p.y - radius;
    var distanceLeft = this.p.x - radius;
    var distanceRight = width - this.p.x - radius;
    
    // If ball reaches the bottom
    if (distanceBottom <= 0 && this.v.y > 0) {
      if(this.v.y < 1) {  // Spring blocked balls
        this.v.y = 3;
      }
      this.v.y *= -1; // Reverse speed
    }
    else {  // Add gravity to speed
      this.v.y = this.v.y + this.a.y;
    }
    
    // If ball reaches left or right sides
    if((distanceLeft < 0 && this.v.x < 0) || (distanceRight < 0 && this.v.x > 0)) {
      // If ball is noisy, bouncing off the lateral borders might not work
      // so we just go to the other side
      if(this.noisy) {
        if(distanceLeft < 0)
          this.p.x += width;
        else if(distanceRight < 0)
          this.p.x -= width;
      }
      else {
        this.v.x *= -1;
      }
    }
  }
  
  
  this.runFromMouse = function(minDistToMouse) {
    // Vector from mouse to ball
    var mouseDiff = p5.Vector.sub(this.p, createVector(mouseX, mouseY));
    
    if(mouseDiff.mag() < minDistToMouse) {
      this.v = mouseDiff;
      this.v.normalize();
      this.v.mult(this.v.mag());
    }
  }
  
  
  this.collide = function() {
    radius = this.d/2;
    for (var i = this.id + 1; i < this.others.length; i++)
    {
      var dx = this.others[i].p.x - this.p.x;
      var dy = this.others[i].p.y - this.p.y;
      var distance = sqrt(dx*dx + dy*dy);
      var minDist = others[i].d/2 + radius;
      /*
      push();
      stroke(this.fillColor);
      line(this.p.x, this.p.y, this.others[i].p.x, this.others[i].p.y);
      pop();
      */
      if (distance <= minDist)
      { 
        var angle = atan2(dy, dx);
        var targetX = this.p.x + cos(angle) * minDist;
        var targetY = this.p.y + sin(angle) * minDist;
        var ax = (targetX - others[i].p.x) * this.SPRING;
        var ay = (targetY - others[i].p.y) * this.SPRING;
        this.v.sub(ax, ay);
        others[i].v.x += ax;
        others[i].v.y += ay;
      }
    }
  }
  
  
  this.updatePulse = function() {
    if(this.pulse) {
      this.d *= 1 + this.pulseSpeed;
      if((this.d > this.pulseDiameterRef * this.maxPulseRatio) ||
         (this.d < this.pulseDiameterRef / this.maxPulseRatio)) {
        this.pulseSpeed *= -1;
      }
    }
  }
}


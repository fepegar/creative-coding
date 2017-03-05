function SoundString(p1, p2) {

  this.p1 = p1;
  this.p2 = p2;
  this.vector = p5.Vector.sub(p2, p1);

  this.p12 = p5.Vector.sub(p2, p1);
  // this.length = this.p12.mag();
  // this.direction = this.p12.normalize();
  this.middlePoint = p5.Vector.add(this.p1, p5.Vector.div(this.p12, 2));
  this.amplitude0 = 10;
  this.amplitude = 0;
  this.vibration = 0;
  this.moving = false;
  this.theta = 0;
  this.omega = 0.5;
  this.angle = this.p12.heading();
  this.v = p5.Vector.fromAngle(this.angle + PI);
  this.v.setMag(this.vibration);
  this.damping = 0.9;
  
  

  this.update = function() {
    this.vibration = this.amplitude * sin(this.theta);
    this.amplitude *= this.damping;
    this.theta += this.omega;
    this.v = p5.Vector.fromAngle(this.angle + PI/2);
    this.v.setMag(this.vibration);
    this.cp = p5.Vector.add(this.middlePoint, this.v);
    this.walk();
  }

  
  this.display = function() {
    fill(0, 0);
    stroke(255, 150, 0);
    strokeWeight(2);
    bezier(this.p1.x, this.p1.y,
           this.cp.x, this.cp.y,
           this.cp.x, this.cp.y,
           this.p2.x, this.p2.y);


    this.flail(p1, 20);
    this.flail(p2, 10);
  }


  this.play = function() {
    this.theta = 0;
    this.amplitude = this.amplitude0;
    if(random() > 0.5) {
      this.amplitude *= -1;
    }
  }
  
  
  this.flail = function(p, d) {
    fill(0);
    push();
    translate(p.x, p.y);
    rotate(frameCount / 100.0);
    star(0, 0, d*0.4, d*0.7, 7);
    pop();
    ellipse(p.x, p.y, d);
  }
  
  
  this.walk = function() {
    
  }
}


// https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

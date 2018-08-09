var DIAMETER = 5;
var DUMPING = 0.8;


function Ball(symbol) {
  // this.p = getEmpty();
  this.p = createVector(width / 2,
                        height / 4);
  this.s = createVector(random(-2, 2), random(-3, 0));
  this.a = createVector(0, 0.1);
  this.d = DIAMETER;
  if(symbol == DOT) {
    this.color = color1;
  } else if(symbol == DASH) {
    this.color = color2;
  }

  this.update = function() {
    this.move();
    this.draw();
  }

  this.move = function() {
    this.s.add(this.a);
    this.p.add(this.s);

    if(this.p.y > height) {
      this.s.y *= -1;
      if(this.s.y > 0.1) {
        this.s.mult(DUMPING);
      }
    }

    if(this.p.x < 0 || this.p.x > width) {
      this.s.x *= -1;
    }
  }

  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipse(this.p.x, this.p.y, this.d);
  }

}

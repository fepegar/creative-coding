
SPEED = 0.3;
WEIGHT = 2;
TOLERANCE = 0.01;

function Circle(x, y, others) {
  this.p = createVector(x, y);
  this.r = 0;
  this.d = 2 * this.r;
  this.s = SPEED;
  this.others = others;
  this.id = others.length;

  colorMode(HSB);
  var h = random(360);
  var s = random(75, 100);
  var b = random(50, 100);
  this.color = color(h, s, b);


  this.update = function() {
    this.move();
    var intersection_color = this.collide();
    this.draw();
    return intersection_color;
  }


  this.move = function() {
    this.r += this.s;
    if (this.r < WEIGHT/2 && this.s < 0) {
      this.bounce();
    }
    this.d = 2 * this.r;
  }


  this.draw = function() {
    colorMode(RGB)
    strokeWeight(WEIGHT);
    noFill();
    stroke(this.color);
    ellipse(this.p.x, this.p.y,
            this.d, this.d);
  }


  this.bounce = function() {
    this.s *= -1;
  }


  this.collide = function() {
    for (var i = this.id + 1; i < this.others.length; i++) {
      var other = this.others[i];
      var intersection = this.intersect(this, other);
      if (intersection) {
        // This prevents circles from getting trapped when too deep inside each other
        if (this.areOutside(this, other)) {
          var d = dist(this.p.x, this.p.y,
                       other.p.x, other.p.y);
          this.r = (1 - TOLERANCE) * this.r / (this.r + other.r) * d;
          other.r = (1 - TOLERANCE) * other.r / (this.r + other.r) * d;
        }

        this.bounce();
        other.bounce();

        var meanColor = this.meanColor(this.color, other.color);
        var newColor = color(meanColor[0],
                             meanColor[1],
                             meanColor[2]);
        this.color = newColor;
        other.color = newColor;

        return [intersection, meanColor];
      }
    }
  }


  this.meanColor = function(c1, c2) {
    colorMode(RGB);
    var meanColor = [(red(c1) + red(c2)) / 2,
                     (green(c1) + green(c2)) / 2,
                     (blue(c1) + blue(c2)) / 2];
    return meanColor;
  }


  this.intersect = function(c1, c2) {
    var h1 = c1.p.x;
    var h2 = c2.p.x;
    var k1 = c1.p.y;
    var k2 = c2.p.y;
    var r1 = c1.d / 2;
    var r2 = c2.d / 2;

    // Special case: both centers are the same
    if (h1 == h2 && k1 == k2) {
      if (abs(r1 - r2 < 1)) {
        // Return common center
        return [h1, k1];
      } else {
        return undefined;
      }
    }

    var m = - (h2 - h1) / (k2 - k1);
    var n = (- (sq(h1) - sq(h2)) - (sq(k1) - sq(k2)) + (sq(r1) - sq(r2))) / (2 * (k2 - k1));

    var a = 1 + sq(m);
    var b = 2 * (m * n - h1 - m * k1);
    var c = (sq(h1) + sq(n) -2*k1*n + sq(k1) - sq(r1));

    //return sq(b) >= 4*a*c;

    if (4*a*c > sq(b)) {
      return undefined;
    }

    var ressq = sqrt(sq(b) - 4*a*c);
    var x1 = (-b + ressq) / (2*a);
    var x2 = (-b - ressq) / (2*a);

    var y1 = m * x1 + n;
    var y2 = m * x2 + n;

    return [(x1 + x2) / 2, (y1 + y2) / 2];
  }


  this.areOutside = function(c1, c2) {
    if(c1.s > 0 && c2.s > 0) {
      return true;
    } else {
      return false;
    }
  }
}

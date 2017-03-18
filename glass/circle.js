
function Circle(center, d, points) {
  this.center = center;
  this.x = center.x;
  this.y = center.y;
  this.d = d;
  this.points = points;
  // this.color = color(
  //   random(255),
  //   random(255),
  //   random(255),
  //   100);
  this.color = color(255, 0, 0, 50);

  this.update = function() {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].update();
    }
  }


  this.show = function() {
    // fill(255, 0, 0);
    fill(this.color);
    noStroke();
    beginShape();
    this.points[0].show();
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].show();
    }
    this.points[0].show();
    this.points[1].show();
    endShape();
  }


  this.split = function() {
    if (this.d < 8) {
      //print('Too small to split: d =', this.d);
      return undefined;
    }

    if (this.points.length < 128 && this.d > 50) {
      this.upsample();
    } else if (this.points.length <= 16) {
      this.upsample();
    }

    var center1 = createVector(this.x + this.d/4, this.y + this.d/4);
    var center2 = createVector(this.x - this.d/4, this.y + this.d/4);
    var center3 = createVector(this.x - this.d/4, this.y - this.d/4);
    var center4 = createVector(this.x + this.d/4, this.y - this.d/4);

    var points1 = [];
    var points2 = [];
    var points3 = [];
    var points4 = [];

    var centers = [];
    var points = [];
    var circles = [];

    for (var i = 0; i < 4; i++) {
      points.push([]);
    }

    centers.push(center1);
    centers.push(center2);
    centers.push(center3);
    centers.push(center4);

    var newX, newY;

    var point;

    var indices = shuffledIdx(this.points.length);
    for (var i = 0; i < indices.length; i += 4) {
      for (var j = 0; j < 4; j++) {
        var index = indices[i+j];
        point = this.points[index];
        point.angle = map(i, 0, indices.length, 0, 2*PI);
        newX = this.d/4 * cos(point.angle);
        newY = this.d/4 * sin(point.angle);
        point.nextP = p5.Vector.add(centers[j], createVector(newX, newY));
        points[j].push(point);
      }
    }


    // for(var i = 0; i < this.points.length; i++) {
    //   point = this.points[i];
    //   if (point.angle >= 0 && point.angle < HALF_PI) {
    //     point.angle = map(point.angle, 0, HALF_PI, 0, 2*PI);
    //     newX = this.d/4 * cos(point.angle);
    //     newY = this.d/4 * sin(point.angle);
    //     point.nextP = p5.Vector.add(center1, createVector(newX, newY));
    //     points1.push(point);
    //   } else if (point.angle >= HALF_PI && point.angle < PI) {
    //     point.angle = map(point.angle, HALF_PI, PI, 0, 2*PI);
    //     newX = this.d/4 * cos(point.angle);
    //     newY = this.d/4 * sin(point.angle);
    //     point.nextP = p5.Vector.add(center2, createVector(newX, newY));
    //     points2.push(point);
    //   } else if (point.angle >= PI && point.angle < 3*HALF_PI) {
    //     point.angle = map(point.angle, PI, 3*HALF_PI, 0, 2*PI);
    //     newX = this.d/4 * cos(point.angle);
    //     newY = this.d/4 * sin(point.angle);
    //     point.nextP = p5.Vector.add(center3, createVector(newX, newY));
    //     points3.push(point);
    //   } else if (point.angle >= 3*HALF_PI && point.angle < 2*PI) {
    //     point.angle = map(point.angle, 3*HALF_PI, 2*PI, 0, 2*PI);
    //     newX = this.d/4 * cos(point.angle);
    //     newY = this.d/4 * sin(point.angle);
    //     point.nextP = p5.Vector.add(center4, createVector(newX, newY));
    //     points4.push(point);
    //   }
    // }

    for (var i = 0; i < 4; i++) {
      circles.push(new Circle(centers[i], this.d/2, points[i]));
    }
    return circles;
  }


  this.upsample = function() {
    this.points = getPoints(this.center, this.d/2, this.points.length * 4);
  }


  this.mouseOver = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    return d < this.d/2;
  }
}



function Point(angle, x, y) {
  this.angle = angle;
  this.p = createVector(x, y);
  this.nextP = createVector(x, y);
  this.v = createVector(0, 0);
  this.a = createVector(0, 0);
  this.debug = false;

  this.update = function() {
    this.a = p5.Vector.sub(this.nextP, this.p);
    this.a.div(sliderA.value());
    this.v.add(this.a);
    this.v.mult(sliderS.value());  // damping
    this.p.add(this.v);
  }

  this.show = function() {
    vertex(this.p.x, this.p.y);
    // curveVertex(this.p.x, this.p.y);

    if (this.debug) {
      stroke(0);
      ellipse(this.p.x, this.p.y, 5);

      stroke(200);
      ellipse(this.nextP.x, this.nextP.y, 3);
    }

  }
}

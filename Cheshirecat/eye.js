function Eye(x, y, l) {
  
  this.p = createVector(x, y);
  var yellow = color(220, 200, 30);

  this.top = new Pupil(x, y, l, radians(55), yellow, UP);
  this.bottom = new Pupil(x, y, l, radians(65), yellow, DOWN);
  this.pupilLeft = new Pupil(x, y, l/2, radians(30), color(0), LEFT);
  this.pupilRight = new Pupil(x, y, l/2, radians(30), color(0), RIGHT);
  this.shine = new Pupil(x + 1, y - 3, l/5, radians(30), color(255), RIGHT);
  
  this.display = function() {
    this.top.display();
    this.bottom.display();
    this.pupilLeft.display();
    this.pupilRight.display();
    this.shine.display();
  }
}
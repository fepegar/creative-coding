debug = true;

function UPC(numbers, w, h) {
  this.numbers = numbers;
  this.width = w;
  this.height = h;
  this.x = -1;
  
  this.draw = function() {
    this.resetX();
    this.drawQuietZone();
    /*
    this.drawEnd();
    this.drawLeft();
    this.drawMiddle();
    this.drawRight();
    this.drawEnd();
    this.drawQuietZone();
    */
  }
  
  this.resetX = function() {
    this.x = - this.width / 2;
  }
  
  this.drawQuietZone = function() {
    QUIET_ZONE.forEach(drawModule);
  }
}

function drawModule(value, x, y, w, h) {
  if (value === 0) {
    fill(255);
  } else if (value === 1) {
    fill(0);
  }
  
  if (debug) {
    stroke(255, 0, 0);
    strokeWeight(1);
  } else {
    noStroke();
  }
}


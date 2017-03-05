function Pupil(x, y, l, theta, fillColor, side) {
  
  this.d = l/sin(theta);
  this.r = this.d/2;
  this.p = createVector();
  var thetaOffset;
  this.alpha = 1;
  this.fillColor = fillColor;
  
  switch(side) {
    case RIGHT:
      thetaOffset = 0;
      break;
    case DOWN:
      thetaOffset = PI/2;
      break;
    case LEFT:
      thetaOffset = PI;
      break;
    case UP:
      thetaOffset = 3*PI/2;
      break;
    default:
      print('Unknown side: ', side);
  }
  
  this.thetaIni = -theta + thetaOffset;
  this.thetaFin =  theta + thetaOffset;
  
  switch(side) {
    case RIGHT:
    case LEFT:
      this.p.x = x - this.r * cos(this.thetaIni);
      this.p.y = y;
      break;
    case DOWN:
    case UP:
      this.p.y = y - this.r * sin(this.thetaIni);
      this.p.x = x;
      break;
    default:
      print('Unknown side: ', side);
  }
  
  
  this.display = function() {
    var fillColor = color(red(this.fillColor),
                         green(this.fillColor),
                         blue(this.fillColor),
                         this.alpha);
    noStroke();
    fill(fillColor);

    arc(this.p.x, this.p.y, this.d, this.d,
        this.thetaIni, this.thetaFin, CHORD);
    this.alpha += ALPHA_STEP;
    this.alpha = constrain(this.alpha, 0, 255);
  }
}
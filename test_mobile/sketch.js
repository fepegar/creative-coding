
var normal;
var surface;
var incident;

function setup() {
  createCanvas(windowWidth, windowHeight);
  normal = createVector(0, 200);
  incident = p5.Vector.fromAngle(radians(5) + PI/2);
  incident.setMag(150);
}

function draw() {
  noStroke();
  fill(200, 230, 255)

  translate(width/2, height/2);
  rect(-width/2, -height/2, width-1, height/2);
  //rotate(PI);
  stroke(1);
  line(-100, 0, 100, 0);
  line(0, 0, normal.x, normal.y);
  line(0, 0, incident.x, incident.y);
}

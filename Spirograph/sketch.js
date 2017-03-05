var theta;
var omega;
var r;
var k;
var R;
var p, pAnt;
var x, y;
var painting;
var lineColor;
var l;
var small;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theta = 0;
  omega = 0.2;
  l = random();
  init();
}

function draw() {
  if(!painting) return;
  //background(220);
  //showFPS()

  x = R*((1-k)*cos(theta) + l*k*cos((1-k)*theta/k));
  y = R*((1-k)*sin(theta) - l*k*sin((1-k)*theta/k));

  p = createVector(x, y);
  translate(width/2, height/2);
  stroke(lineColor, 100);
  strokeWeight(1.5);
  line(pAnt.x, pAnt.y, p.x, p.y);
  theta += omega;
  pAnt = p.copy();
}


function showFPS() {
  text(str(int(frameRate())), windowWidth*0.9, windowHeight*0.9);
}


function keyTyped() {
  switch(key) {
    case 'p':
      painting = !painting;
      break;

    case 'r':
      clear();

      break;
  }
}


function init(reset) {
  if(reset) {
    background(255);
  }
  k = random();
  l = random();

  small = min(windowWidth, windowHeight) / 2;
  R = small;
  r = k*R;
  x = R*((1-k)*cos(theta) + l*k*cos((1-k)*theta/k));
  y = R*((1-k)*sin(theta) - l*k*sin((1-k)*theta/k));

  pAnt = createVector(x, y);
  print('k = ', k.toFixed(2));
  print('l = ', l.toFixed(2));
  painting = true;
  noFill();
  translate(width/2, height/2);
  //ellipse(0, 0, 2*R);
  colorMode(HSB);
  lineColor = color(random(360), random(50, 100), random(50, 100), 100/255.0);
  print(lineColor);
  colorMode(RGB);
}



function keyTyped() {
  switch(key) {

    case 'p':
      drawing = !drawing;
      break;

    case 'r':
      init(true);
      break;

    case 'c':
      init(false);
      break;
  }
}

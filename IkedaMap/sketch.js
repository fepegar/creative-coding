var pAnt;
var u;
var x, y;
var t;
var points;
var nPoints;
var factor;
var rLimit;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  init();
} 

function draw() { 
  //background(220);
  push();
  translate(width/3, height/3);
  for(var i = 0; i < nPoints; i++) {
    pAnt = points[i];
    t = getT(pAnt);
    x = 1 + u * (pAnt.x * cos(t) - pAnt.y * sin(t));
    y = u * (pAnt.x * sin(t) + pAnt.y * cos(t));
    line(factor*pAnt.x, factor*pAnt.y,
         factor*x, factor*y);
    pAnt.x = x;
    pAnt.y = y;
  }
  pop();
}


function init() {
  background(0);
  stroke(255, 10);
  strokeWeight(1);
  nPoints = 500;
  points = [];
  factor = 50;
  rLimit = 10;
  
  for(var i = 0; i < nPoints; i++) {
    points.push(createVector(random(rLimit), random(rLimit)));
  }
  
  u = random();
  fill(255, 50);
  text('u = ' + u.toFixed(2), width*0.9, height*0.9)
  print('u = ', u);
}


function getT(v) {
  return 0.4 - 6 / (1 + v.magSq());
}


function keyTyped() {
  switch(key) {
    
    case 'r':
      init();
      break;
  }
}
var theta;
var omega;
var OMEGA_MAX;
var a;
var r;
var pAnt;
var p;
var dist;
var si;
var co;
var thetaMatrix;
var omegaMatrix;
var thetaAux;
var drawing;
var black;
var ALPHA;
var c;
var maxR;
var first;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(255);
  ALPHA = 50;
  theta = 0;
  thetaMatrix = 0;
  a = 90;
  pAnt = createVector(0, 0);
  OMEGA_MAX = 0.8;

  omega = random(-OMEGA_MAX, OMEGA_MAX);
  omegaMatrix = random(0.01);
  drawing = true;
  black = true;
  maxR = sqrt(sq(width/2) + sq(height/2));
  first = true;
  
  printOmegas();
} 

function draw() { 
  if(!drawing) return;
  
  si = sin(theta);
  co = cos(theta);
  r = (3 * a * si * co)/(pow(si, 3) + pow(co, 3));

  push();
  translate(width/2, height/2);
  p = createVector(r * sin(theta+thetaMatrix), r * cos(theta+thetaMatrix));
  
  colorMode(HSB, 100, 255, 255, 255);
  if(black) {
    c = color(0, 0, 0, ALPHA);
  }
  else {
    maxR = sqrt(sq(width/2) + sq(height/2));
    c = color(map(abs(r), 0, maxR, 0, 100), 255, 255, ALPHA);
  }
  dist = p5.Vector.dist(pAnt, p);
  if(!first) {
    if(dist < 1000) {
      stroke(c);
      line(pAnt.x, pAnt.y, p.x, p.y);
    }
  }
  else {
    first = false;
  }
  pAnt = p.copy();
  
  
  theta += omega;
  if(theta > PI/2) {
    theta = 0;
  }
  thetaMatrix += omegaMatrix;
  pop();
}



function keyTyped() {
  switch(key) {
      
    case 'p':
      drawing = !drawing;
      break;
      
    case 'r':
      clear();
      background(255*black);
      first = true;
      omega = random(-OMEGA_MAX, OMEGA_MAX);
      omegaMatrix = random();
      printOmegas();
      break;
    
      /*
    case 'a':
      a *= 0.9;
      break;
    
    case 'd':
      a *= 1.1;
      break;
      */
  
    case 'b':
      black = !black;
      background(255*black);
      break;
    
    case 'd':
      clear();
      first = true;
      omega = 0.05;
      omegaMatrix = 0.005;
      break;
  }
}


function printOmegas() {
  print('Omega: ', omega, ' rad/f');
  print('Rotation omega: ', omegaMatrix, ' rad/f');
}
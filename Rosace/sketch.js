var theta;
var omega;
var r;
var k;
var n;
var d;
var p, pAnt;
var x, y;
var painting;
var lineColor;
var small;
var a;
var maurerX, maurerY;
var maurer, maurerAnt;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  theta = 0;
  omega = 0.05;
  init();
  //strokeWeight(2);
} 


function draw() { 
  if(!painting) return;
  //background(220);
  //showFPS()

  x = r * cos(k*theta) * sin(theta);
  y = r * cos(k*theta) * cos(theta);
  p = createVector(x, y);
  translate(width/2, height/2);
  stroke(lineColor, 100);
  line(pAnt.x, pAnt.y, p.x, p.y);
  theta += omega;
  pAnt = p.copy();
}


function showFPS() {
  text(str(int(frameRate())), windowWidth*0.9, windowHeight*0.9);
}


function init(reset) {
  if(reset) {
    background(255);
  }
  d = int(random(10))+1;
  n = int(random(10))+1;
  k = float(n)/d;
  
  small = min(windowWidth, windowHeight) / 2;
  
  r = small*random(0.1, 0.95);
  x = r * cos(k*theta) * sin(theta);
  y = r * cos(k*theta) * cos(theta);
  a = 0;
  maurerX = r * sin(n*a*d);
  maurerY = 
  
  pAnt = createVector(x, y);
  print('n = ', n.toFixed(2));
  print('d = ', d.toFixed(2));
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
    
    case 'n':
      omega *= 0.9;
      break;
    
    case 'm':
      omega *= 1.1;
      break;
  }
}
var theta;
var omega;
var r;
var k;
var R;
var p, pAnt;
var x, y;
var painting;
var lineColor;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  theta = 0;
  omega = 0.05;
  init();
} 

function draw() { 
  if(!painting) return;
  //background(220);
  //showFPS()
  /*
  var noiseX = 100*(noise(frameCount/100)-0.5);
  var noiseY = 100*(noise((frameCount+1000)/100)-0.5);
  */
  x = r * (k+1) * cos(theta) - r * cos((k+1) * theta);
  y = r * (k+1) * sin(theta) - r * sin((k+1) * theta);
  p = createVector(x, y);
  translate(width/2, height/2);
  stroke(0, 2);
  ellipse((R+r)*cos(theta), (R+r)*sin(theta), 2*r);
  stroke(0, 5);
  ellipse(x, y, 2*r);
  stroke(lineColor, 100);
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


function init() {
  background(255);
  k = int(random(50, 500)) / 100.0;
  var small = min(windowWidth, windowHeight) / 2;
  r = small / (k+3);
  R = k*r;

  x = r * (k+1) * cos(theta) - r * cos((k+1) * theta);
  y = r * (k+1) * sin(theta) - r * sin((k+1) * theta);
  pAnt = createVector(x, y);
  print(k);
  painting = true;
  noFill();
  translate(width/2, height/2);
  //ellipse(0, 0, 2*R);
  colorMode(HSB);
  lineColor = color(random(360), random(100), random(25, 70), 100/255.0);
  colorMode(RGB);
}



function keyTyped() {
  switch(key) {
      
    case 'p':
      drawing = !drawing;
      break;
      
    case 'r':
      init();
      break;
  }
}
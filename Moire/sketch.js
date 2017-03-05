var spacing;
var weight;
var shapesType;
const LINES = 0;
const CIRCLES = 1;
var shapesTypes = [LINES, CIRCLES];
var bgColor;
var color1, color2;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  spacing = 6;
  weight = 2;
  shapesType = LINES;
  init();
} 

function init() {
  bgColor = getRandomColor();
  color1 = getRandomColor();
  color2 = getRandomColor();
}

function draw() { 
  background(bgColor);
  strokeWeight(weight);
  
  switch(shapesType) {
    case LINES:
      stroke(color1);
      drawLines(0, spacing);
      stroke(color2);
      drawLines(map(mouseX, width*0.1, width*0.9, -PI/4, PI/4), spacing);
      break;
    
    case CIRCLES:
      push();
      translate(width/2, height/2);
      stroke(color1);
      drawCircles(0, 0, spacing);
      pop();
      stroke(color2);
      drawCircles(mouseX, mouseY, spacing);
    }
}


function drawLines(theta, spacing) {
  push();
  translate(width/2, height/2);
  rotate(theta);
  translate(-width/2, -height/2);
  for(var x = 1; x < width; x += spacing + 1) {
    line(x, 1, x, height-1);
  }
  noStroke()
  pop();
}


function drawCircles(x, y, spacing) {
  push();
  noFill();
  for(var d = 1; d < min(width, height); d += spacing+1) {
    ellipse(x, y, d);
  }
  pop();
}


function keyTyped() {
  switch(key) {
    case 'w':
      spacing += 1;
      break;
      
    case 's':
      if(spacing > 1) {
        spacing -= 1;
      }
      break;
      
    case 'd':
      weight += 0.5;
      break;
      
    case 'a':
      if(weight > 1) {
        weight -= 0.5;
      }
      break;
    
    case 'x':
      shapesType += 1;
      if(shapesType >= shapesTypes.length) {
        shapesType = 0;
      }
      break;
      
    case 'c':
      init();
  }
}


function getRandomColor() {
  return color(random(255), random(255), random(255));
}
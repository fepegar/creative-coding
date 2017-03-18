
var d = 300;
var a = 255;

var blendModeIdx = 0;
var BLEND_MODES;

function setup() {
  createCanvas(windowWidth, windowHeight);
  BLEND_MODES = [BLEND, ADD, DARKEST, LIGHTEST, DIFFERENCE,
                   EXCLUSION, MULTIPLY, SCREEN, REPLACE,
                   OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN];

  print('Blend mode: ' + BLEND_MODES[0]);
  noStroke();
}

function draw() {
  clear();
  background(0);
  translate(width/2, height/2);
  rotate(frameCount/100)

  fill(255, 0, 0, a);
  ellipse(100, 0, d);

  rotate(2*PI/3);
  fill(0, 255, 0, a);
  ellipse(100, 0, d);

  rotate(2*PI/3);
  fill(0, 0, 255, a);
  ellipse(100, 0, d);
}


function mouseClicked() {
  changeBlendMode();
}


function changeBlendMode() {
  blendModeIdx++;
  if(blendModeIdx == BLEND_MODES.length) {
    blendModeIdx = 0;
  }

  var newBlendMode = BLEND_MODES[blendModeIdx]
  blendMode(newBlendMode);
  print('New blend mode: ' + newBlendMode)
}

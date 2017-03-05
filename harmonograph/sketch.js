var a = [], a0 = [];
var f = [], f0 = [];
var p = [], p0 = [];
var d = [], d0 = [];
var x, y;
var px, py;
var t;
var dt;
var speed;
var bgColor;
var lineColor;
var i;
var BLEND_MODES;
var blendModeIdx = 0;
var drawing = true;
var myFrameCount = 0;


function setup() {
  createCanvas(400, 400);
  BLEND_MODES = [BLEND, ADD, DARKEST, LIGHTEST, DIFFERENCE,
                   EXCLUSION, MULTIPLY, SCREEN, REPLACE,
                   OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN];
  init();
  drawIt();
}


function draw() {
  if(!drawing) return;
  background(bgColor);
  addNoise();
  drawIt();
  myFrameCount++;
}

function drawIt() {
  push();
  translate(width/2, height/2);
  t = 0;
  for(i = 0; i < 1000; i++) {
    x = a[0] * sin(t * f[0] + p[0]) * exp(-d[0] * t) + a[1] * sin(t * f[1] + p[1]) * exp(-d[1] * t);
    y = a[2] * sin(t * f[2] + p[2]) * exp(-d[2] * t) + a[3] * sin(t * f[3] + p[3]) * exp(-d[3] * t);

    if(t !== 0) {
      line(px, py, x, y);
    }
    px = x;
    py = y;
    t += dt;
  }
  pop();
}


function init() {
  //blendMode(OVERLAY);
  bgColor = color('#900C3f');
  speed = 15;
  //lineColor = colorAlpha('#FF5733', 0.5);
  lineColor = colorAlpha('#FFC300', 0.4);
  stroke(lineColor);
  dt = speed / 100.0;
  var smallDim = min(width, height);
  for(var i = 0; i < 4; i++) {
    a0[i] = random(smallDim/6, smallDim/4);
    f0[i] = random(0.95, 1);
    p0[i] = random(2*PI);
    d0[i] = random(0.01);

    a[i] = a0[i];
    f[i] = f0[i];
    p[i] = p0[i];
    d[i] = d0[i];
  }

}

function addNoise() {
  for(i = 0; i < 4; i++) {
    a[i] = a0[i] + getNoise(50, myFrameCount / 100.0 + 1000*i);
    f[i] = f0[i] + getNoise(0.1, myFrameCount / 100.0 + 2000*i);
    p[i] = p0[i] + getNoise(2*PI/100, myFrameCount / 100.0 + 2000*i);;
    d[i] = d0[i] + getNoise(0.001, myFrameCount / 10.0 + 4000*i);
  }
}


function getNoise(amp, t) {
  return amp * (noise(t) - 0.5)
}


function mouseClicked() {
  init();
  drawIt();
  //changeBlendMode();
}


function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
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


function keyTyped() {
  if(key == 'p') {
    drawing = !drawing;
  }
}

// Move the mouse left and right to see the curve change

var points;
var nPoints = 2;
var tSeed;
var swSeed;
var looping = true;
var slider;
var bgColor;
var fillColor;

function setup() {
  createCanvas(windowWidth, windowHeight-50);
  tSeed = random(100000);
  swSeed = random(100000);
  //noFill();
  slider = createSlider(0, 50, 2);
  slider.style('width', '400px');
  slider.input(init);
  init();
}

function draw() {
  //clear();
  background(bgColor);
  textSize(20);
  //text('Click!', 20, 30);

  stroke(0);
  strokeWeightNoise = noise(frameCount / 500 + swSeed)
  sWeight = map(strokeWeightNoise, 0, 1, 0, 5);
  strokeWeight(sWeight);

  tNoise = noise(frameCount / 100 + tSeed)
  t = map(tNoise, 0, 1, -18, 20);

  //var t = map(mouseX, 0, width, -10, 10);
  //translate(width/2, height/2);
  curveTightness(t);
  fill(fillColor);
  beginShape();
  for (var i = 0; i < points.length; i++) {
    x = points[i][0];
    y = points[i][1];
    curveVertex(x, y);
    //ellipse(x, y, 10);
  }
  endShape();

  strokeWeight(0.1);
  line(width/2, 0, width/2, height);
  strokeWeight(1);
  noFill();
  ellipse(map(tNoise, 0, 1, 0, width), height * 0.95, 10);
  ellipse(width * 0.95, map(strokeWeightNoise, 0, 1, 0, height), 10);
}

function getxy() {
  a = width/4;
  x = random(a, 3*a);
  y = random(a, 3*a);
  return [x, y];
}

function init() {
  nPoints = slider.value();
  points = [];
  xy = getxy();
  points.push(xy);
  points.push(xy);
  for (var i = 0; i < nPoints; i++) {
    xy = getxy();
    points.push(xy);
  }
  xy = getxy();
  points.push(xy);
  points.push(xy);

  fillColor = color(random(255), random(255), random(255), 100);
  bgColor = color(random(255), random(255), random(255));

  print(bgColor.levels);
  print(fillColor.levels);
}

function mouseClicked() {
  nPoints++;
  init();
}


function keyTyped() {
  if (key == 'p') {
    if (looping) {
      noLoop();
    } else {
      loop();
    }
    looping = !looping;
  }
}

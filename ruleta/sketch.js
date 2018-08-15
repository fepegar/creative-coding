var images = [];
var countries;
var files_map;
var filenames;
var assetsDir = 'assets/';
var emojisDir = assetsDir + 'emoji-flags/';
var scaling = 15;
var rx;
var ry;
var currentCountry;
var currentIndex;
var theta;
var hand;
var largeFlagRadius;


function preload() {
  countries = Object.keys(files_map);
  filenames = Object.values(files_map);

  for(var i = 0; i < filenames.length; i++) {
    filepath = emojisDir + filenames[i];
    images.push(loadImage(filepath));
  }
}


function imageLoaded(image) {
  images.push(image);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  var minSize = min([windowWidth, windowHeight, displayWidth, displayHeight]);
  ry = 0.95 * minSize / 2;
  hand = new Hand(ry);
  setupMusic();
}

function draw() {
  background(50);
  translate(width / 2, height / 2);
  drawFlags();
  hand.update();
  drawLargeFlag();
  fill(255);
}

function inFlag() {
  var distanceToCenter = dist(mouseX, mouseY, width/2, height/2);
  return distanceToCenter < largeFlagRadius;
}

function touchStarted() {
  if (inFlag()){
    hand.addImpulses = true;
  }
  return false;
}

function touchMoved() {
  if (!inFlag()){
    hand.addImpulses = false;
  }
  return false;
}

function touchEnded() {
  hand.addImpulses = false;
  return false;
}


function drawFlags() {
  var x;
  var y;
  var img;
  var N = images.length;
  var flagTheta;
  for (var i = 0; i < N; i++) {
    img = images[i];
    imWidth = img.width / scaling;
    imHeight = img.height / scaling;
    flagTheta = i / N * TAU;
    x = ry * cos(flagTheta) - imWidth / 2;
    y = ry * sin(flagTheta) - imHeight / 2;
    image(img, x, y, imWidth, imHeight);
  }
}


function drawLargeFlag()  {
  currentIndex = Math.round(map(hand.theta, 0, TAU, 0, images.length));
  currentIndex = constrain(currentIndex, 0, images.length - 1);
  var img = images[currentIndex];
  var RATIO = 2;
  var w = img.width * RATIO;
  var h = img.height * RATIO;
  largeFlagRadius = w / 2;
  image(img, -w / 2, -h / 2, w, h);
  var oldCountry = currentCountry;
  currentCountry = countries[currentIndex];
  if (currentCountry != oldCountry) {
    print(currentCountry);
    playEnv();
  }
}

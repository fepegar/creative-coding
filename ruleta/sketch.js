var images = [];
var countries;
var files_map;
var filenames;
var assetsDir = 'assets/';
var emojisDir = assetsDir + 'emoji-flags/';
var scaling = 15;
var rx;
var ry;
var rPercentage = 0.95;
var currentCountry;
var currentIndex;
var theta;




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
  rx = rPercentage * width / 2;
  ry = rPercentage * height / 2;

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('sine');
  triOsc.amp(env);
  triOsc.start();

  styleSelector = createSelect();
  styleSelector.position(10, 10);
  styles = Object.keys(STYLES_MAP);
  for (var i = 0; i < styles.length; i++) {
    styleSelector.option(styles[i]);
  }
  styleSelector.changed(updateStyle);

  var freq;
  for (var i = 0; i < images.length; i++) {
    freq = MIN_FREQ * 2**(i / 12);
    frequencies.push(freq);
  }
  updateStyle();
}

function updateStyle() {
  notes = getNotesArray(MIN_FREQ, octaves, STYLES_MAP[styleSelector.value()]);
}


function draw() {
  background(50);
  translate(width / 2, height / 2);
  drawFlags();
  drawHand();
  drawLargeFlag();
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


function drawHand() {
  var tMouseX = mouseX - width / 2;
  var tMouseY = mouseY - height / 2;
  var originX = width / 2;
  var originY = height / 2;
  var r = ry;
  theta = atan2(tMouseY, tMouseX);
  if (theta < 0) {
    theta += TAU;
  }
  var x = r * cos(theta);
  var y = ry * sin(theta);
  stroke(255);
  rotate(theta)
  // line(0, 0, x, y);
  line(0, 0, r, 0);
  rotate(-theta)
}


function drawLargeFlag()  {
  // currentIndex = Math.round(map(mouseX, 0, width, 0, images.length - 1));
  currentIndex = Math.round(map(theta, 0, TAU, 0, images.length - 1));
  var img = images[currentIndex];
  var w = img.width * 2;
  var h = img.height * 2;
  image(img, -w / 2, -h / 2, w, h);
  var oldCountry = currentCountry;
  currentCountry = countries[currentIndex];
  if (currentCountry != oldCountry) {
    print(currentCountry);
    playEnv();
  }
}

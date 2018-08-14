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
  ry = 0.95 * height / 2;
  hand = new Hand(ry);
  setupMusic();
}




function draw() {
  background(50);
  translate(width / 2, height / 2);
  drawFlags();
  hand.update();
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


function drawLargeFlag()  {
  currentIndex = Math.round(map(hand.theta, 0, TAU, 0, images.length));
  currentIndex = constrain(currentIndex, 0, images.length - 1);
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



function Hand(r) {
  this.r = r;
  this.theta = 0;
  this.omega = 0;
  this.alphaFriction = 0;
  this.alphaImpulse = 0.001;
  this.impulseLife = 0;
  this.frictionCoefficient = 0.0001;

  this.moveMouse = function() {
    var tMouseX = mouseX - width / 2;
    var tMouseY = mouseY - height / 2;
    var originX = width / 2;
    var originY = height / 2;
    this.theta = atan2(tMouseY, tMouseX);
    if (this.theta < 0) {
      this.theta += TAU;
    }
  }

  this.movePhysics = function() {
    this.alphaFriction = -this.omega;
    this.alphaFriction /= abs(this.alphaFriction);
    this.alphaFriction *= this.frictionCoefficient;

    if (this.impulseLife > 0) {
      this.impulseLife--;
      this.omega += this.alphaImpulse;
    }
    this.omega += this.alphaFriction;
    this.theta += this.omega;
    if (this.theta >= TAU) {
      this.theta -= TAU;
    }
  }

  this.move = this.moveMouse;

  this.draw = function() {
    stroke(255);
    rotate(this.theta)
    fill(30, 230, 250);
    noStroke();
    triangle(0, 10, 0, -10, this.r, 0);
    rotate(-this.theta)
  }

  this.update = function() {
    this.move();
    this.draw();
  }

  this.impulse = function(seconds) {

  }
}

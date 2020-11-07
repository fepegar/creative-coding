var polymer;
NUM_LETTERS = 26;
BACKGROUND = 10;
// var polymerString = "dabAcCaCBAcCcaDA";
var polymerString = inputPolymerString;  // from input.js
var numCellsX = 250;
var numCellsY = 200;
var ratio = numCellsX / numCellsY;  // 250 * 200 = inputPolymerString.length
var monomerLength;
var start = false;

function setup() {
  var canvasWidth = windowHeight * ratio;
  createCanvas(canvasWidth, windowHeight);
  monomerLength = width / numCellsX;
  colorMode(HSB, NUM_LETTERS, 100, 100);
  background(BACKGROUND);
  var string = "dabAcCaCBAcCcaDA";
  polymer = new Polymer(inputPolymerString);
  polymer.draw();
  textAlign(CENTER);
  textSize(height / 10);
  fill(0, 0, 100);
  text(polymer.monomers.length, width / 2, height * 4/5);
}

function draw() {
  if (frameCount < 60) {  // start animation after a second
    return
  }
  background(BACKGROUND);
  fill(0, 0, 100);
  text(polymer.monomers.length, width / 2, height * 4/5);
  polymer.update();
  polymer.draw();
}

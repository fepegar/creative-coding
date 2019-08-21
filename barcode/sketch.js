var upc;
var upcWidth;
var upcHeight;
var numbers;

function setup() {
  createCanvas(windowWidth, windowHeight);
  upcWidth = width / 2;
  upcHeight = upcWidth * 9 / 16;
  numbers = randomNumbers(12);
  console.log(numbers);
  upc = UPC(numbers, upcWidth, upcHeight);
}

function draw() {
  background(250);
  upc.draw();
}

function keyTyped() {
  if (!isCharNumber(key)) {
    return;
  }
  
}

function isCharNumber(c) {
  return c >= '0' && c <= '9';
}

function randomNumbers(length) {
  var array = [];
  var v;
  for (let i = 0; i < length; i++) {
    v = Math.floor(random(0, 10));
    array.push(v);
  }
  return array;
}
var colors = [];
var coprimes = 0;
var cofactors = 0;
var myPi;
var nRandom = 100000;
var tSize = 48;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colors[0] = color(0, 38, 38);
  colors[1] = color(14, 71, 73);
  colors[2] = color(149, 198, 35);
  colors[3] = color(229, 88, 18);
  colors[4] = color(239, 231, 218);

  rectMode(CENTER);


  // frameRate(10);
}

function draw() {

  if (areCoprimes(getTwoRandomNumbers())) {
    coprimes++;
  } else {
    cofactors++;
  }

  myPi = getPiFromCoprimesAndCofactors(coprimes, cofactors);

  background(colors[0]);
  translate(width/2, height/2);

  noStroke();

  // Bar pi
  fill(colors[2]);
  rect(0, height/3, 10, 50);

  // Bar estimation
  fill(colors[4]);
  var piDiff = myPi - PI;
  var x = map(piDiff, -1, 1, -width/3, width/3);
  rect(x, height/3, 3, 80);

  // Text pi
  textSize(tSize);
  textAlign(CENTER);
  fill(colors[3]);
  text(str(PI.toFixed(10)), 0, -tSize+80);

  // Text estimation
  fill(colors[1]);
  text(str(myPi.toFixed(10)), 0, tSize+80);

  // Pie
  fill(colors[2])
  arc(0, -height/3, width/3, width/3, 0, myPi, PIE);
  stroke(colors[4]);
  line(-width/5, -height/3, width/5, -height/3);

  // Frames
  fill(colors[4]);
  textAlign(RIGHT);
  textSize(24);
  text(str(coprimes + cofactors), width/2*0.9, height/2*0.9);

  //var barIniY =
  var barFinY = (height/2) * 0.8;

}


function getPiFromCoprimesAndCofactors(coprimes, cofactors) {
  var fraction = coprimes / (coprimes + cofactors);
  var pi = Math.sqrt(6 / fraction);
  return pi;
}


function gcd(a, b) {
  if(a === 0 || b === 0) {
    return a+b; // base case
  } else {
    return gcd(b, a%b);
  }
}


function areCoprimes(arr) {
  var gcdAB = gcd(arr[0], arr[1]);
  return gcdAB === 1;
}


function getTwoRandomNumbers() {
  return [floor(random(nRandom)),
          floor(random(nRandom))];
}

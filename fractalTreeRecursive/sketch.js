
var scaling;
var angle;
var initialLength;
var initialBranches = 2;
var seedL;
var seedR;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialLength = height / 4;
  seedL = random(10000);
  seedR = random(10000);
}

function draw() {
  background(50);
  scaling = map(mouseX, 0, width, 0.4, 0.7);
  maxAlpha = map(mouseY, 0, height, 0, 3*PI/4);
  translate(width/2, height);
  branch(initialLength, initialBranches);

}

function branch(len, n) {
  if (len < 4) return;
  stroke(
    map(len, 4, initialLength, 255, 0),
    map(len, 4, initialLength, 150, 0),
    255);
  strokeWeight(map(len, 0, initialLength, 0, 8));
  line(0, 0, 0, -len);
  translate(0, -len);

  var angleL, angleR;
  var nl, nr;

  nl = noise(frameCount/100 + seedL);
  angleL = map(nl, 0, 1, -maxAlpha, 0);
  push();
  rotate(angleL);
  branch(len * scaling, 2);
  pop();

  // nr = noise(frameCount/100 + seedR);
  angleR = map(nl, 0, 1, 0, maxAlpha);
  push();
  rotate(angleR);
  branch(len * scaling, 2);
  pop();


  // for(var i = 0; i < n; i++) {
  //   angle = map(i, 0, n-1, -maxAlpha, maxAlpha);
  //   push();
  //   rotate(angle);
  //   branch(len * scaling, 2);
  //   pop();
  // }
}

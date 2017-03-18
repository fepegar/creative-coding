
var n = 64;
var circles = [];
var sliderA, sliderS;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderA = createSlider(1, 1000, 100);
  sliderS = createSlider(0, 1, 0.8, 0.01);
  sliderA.position(0, 0);
  sliderS.position(0, sliderA.height);

  var center = createVector(width/2, height/2);
  var d = 0.9*min(width, height);
  // var d = 400;
  var points = getPoints(center, d/2, n);
  var circle = new Circle(center, d, points);
  circles.push(circle);
}


function draw() {
  background(255);

  splitCircles();
  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }
}

// function mouseClicked() {
//   var i = floor(random(circles.length));
//   var circle = circles[i];
//   circles.splice(i, 1);
//   circles = circles.concat(circle.split());
// }


function splitCircles() {
  var circle;
  var foundIdx;
  for(var i = 0; i < circles.length; i++) {
    if (circles[i].mouseOver()) {
      circle = circles[i];
      foundIdx = i;
      break;
    }
  }
  if (circle) {

    small = circle.split();
    if (small) {
      circles.splice(foundIdx, 1);
      circles = circles.concat(small);
    }
  }
}



function shift(arr) {
  var n = floor(random(arr.length));
  for (var i = 0; i < n; i++) {
    arr.push(arr.splice(0, 1)[0]);
  }
  return arr;
}


function shuffledIdx(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = i;
  }
  shuffle(arr, true);
  return arr;
}


function getPoints(p, r, n) {
  var points = [];
  var angle, x, y;
  for (var i = 0; i < n; i++) {
    angle = map(i, 0, n, 0, 2*PI);
    x = p.x + r * cos(angle);
    y = p.y + r * sin(angle);
    points.push(new Point(angle, x, y));
  }
  return points;
}


var hist = [];
var offset;
var inc = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  for (var x = 0; x < width; x++) {
    hist[x] = 0;
  }
  background(50);
  offset = random(10000);
  stroke(255);

}

function draw() {
  background(50);
  var n = noise(offset);
  offset += inc;
  var x = floor(map(n, 0, 1, 0, width));
  // point(x, hist[x]);
  hist[x] += 1;
  for(var i = 0; i < hist.length; i++) {
    line(i, 0, i, 5*hist[i])
  }
  ellipse(x, height*0.8, 20);
}

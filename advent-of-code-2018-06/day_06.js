var voronoi;
var coords;
var useManhattan = true;
var threshold;

function setup() {
  createCanvas(windowHeight, windowHeight);
  coords = EXAMPLE;
  threshold = 32;
  voronoi = new Voronoi(coords, useManhattan);
  voronoi.distanceThreshold = threshold;
  voronoi.draw();
  print(voronoi.getMaxArea());
}


function keyPressed() {
  switch (key) {
    case 'v':
      voronoi.useManhattan = !voronoi.useManhattan;
      voronoi.computeDistances();
      break;
    case 'i':
      if (coords == EXAMPLE) {
        coords = INPUT;
        threshold = 10000;
      } else {
        coords = EXAMPLE;
        threshold = 32;
      }
      voronoi = new Voronoi(coords, useManhattan);
      voronoi.distanceThreshold = threshold;
      break;
    case 'd':
      voronoi.showDistances = !voronoi.showDistances;
  }
  voronoi.draw();
}

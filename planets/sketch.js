var circles;
var intersections;


function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}


function draw() {
  colorMode(RGB);
  background(0, 20);
  var intersection_color;
  for (var i = 0; i < circles.length; i++) {
    intersection_color = circles[i].update();
    if (intersection_color) {
      intersections.push(intersection_color);
    }
  }

  for (var i = 0; i < intersections.length; i++) {
    noStroke();
    intersection_color = intersections[i];
    var x = intersection_color[0][0];
    var y = intersection_color[0][1];
    var c = intersection_color[1];
    var cAlpha = color(c[0],
                       c[1],
                       c[2],
                       100);
    fill(cAlpha);
    ellipse(x, y, 5)
  }
}


function init() {
  circles = [];
  intersections = [];
}


function mouseClicked() {
  circle = new Circle(mouseX, mouseY, circles);
  circles.push(circle);
}

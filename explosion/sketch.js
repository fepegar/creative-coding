
var cubes = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(50);

  for(var i = 0; i < 5; i++) {
    var p = createVector(i*10, i*5, 0);
    cubes.push(new Cube(p, 20))
  }

}


function draw() {
  background(50);
  rotateX(0.1);
  for(var i = 0; i < cubes.length; i++) {
    cubes[i].move();
    cubes[i].show();
  }
}


function Cube(p, r) {
  this.p = p;
  this.r = r;
  this.move = function() {

  }

  this.show = function() {
    push();
    translate(this.p.x, this.p.y, this.p.z);
    sphere(this.r);
    pop();
  }
}

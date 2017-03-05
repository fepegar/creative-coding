
var drops = [];
var stop = false;
var wind;
var windStrength = 0.1;
var windSeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windSeed = random(100000);
}

function draw() {
  background('#1C2541');
  wind = windStrength*map(noise(frameCount/100+windSeed), 0, 1, -1, 1);
  removeDrops();
  addDrops(10);
  for (var i = 0; i < drops.length; i++) {
    drop = drops[i];
    drop.update();
    drop.show();
  }
  showWind();
}

function showWind() {
  fill('#6FFFE9');
  noStroke();
  var x = map(wind, -windStrength, windStrength, 0, width);
  ellipse(x, height*0.9, 15);
}

function removeDrops() {
  for (var i = drops.length-1; i >= 0; i--) {
    drop = drops[i];
    if(drop.p.y > height) {
      drops.splice(i, 1);
    }
  }
}


function addDrops(n) {
  for(var i = 0; i < n; i++) {
    var x = random(-width/3, 4/3*width);
    drops.push(new Drop(x, random(-100,-50)));
  }
}


function Drop (x, y) {
  this.p = createVector(x, y);
  this.s = createVector(0, random(4, 10));
  this.g = 0.05;
  this.a = createVector(0, this.g);
  this.l = random(10, 20);

  this.update = function() {
    this.a = createVector(wind, this.g);
    this.s.add(this.a);
    this.p.add(this.s);
  }

  this.show = function() {
    stroke('#6FFFE9');
    line(this.p.x, this.p.y, this.p.x, this.p.y + this.l);
  }
}


function mouseClicked() {
  if (stop) {
    loop();
  } else {
    noLoop();
  }
  stop = !stop;
}



var s;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  p1 = createVector(random(windowWidth), random(windowHeight));
  p2 = createVector(random(windowWidth), random(windowHeight));
  s = new SoundString(p1, p2);
  
} 

function draw() { 
  background(30, 30, 120);
  s.update();
  s.display();
}


function mouseClicked() {
  s.play();
}

var temps= 0.03

function setup() {
  createCanvas(800,600)
  background(0)
  stroke(0, 100);
}

function draw() {
  n=noise(temps)
  var r= 255*n

  n=noise(temps+1989)
  var g= 255*n

  n=noise(temps+1000)
  var b= 255*n

  var c = color(r, g, b);

  fill(c)
  //ellipse(80,60,100,100)
  temps = temps+0.04

  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);

}


function variableEllipse (x,y,px,py) {
  speed = 5;//+ abs(x-px) + abs(y-py);
  var diametre = map(mouseX, 0, width, 0, 200);
  ellipse(x, y, diametre);
}




/*

ell

void draw() {
  // Call the variableEllipse() method and send it the
  // parameters for the current mouse position
  // and the previous mouse position
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}


// The simple method variableEllipse() was created specifically
// for this program. It calculates the speed of the mouse
// and draws a small ellipse if the mouse is moving slowly
// and draws a large ellipse if the mouse is moving quickly

void
}

*/

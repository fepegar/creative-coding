
var initialL;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialL = pow(3,6);

  background('#33032F');
  fill('#97D8B2');
  noStroke();
  rectMode(CENTER);
  recursiveSquare(0, 0, initialL);
}


function recursiveSquare(x, y, l) {
  for(var i = -1; i < 2; i++) {
    for(var j = -1; j < 2; j++) {
      if(i == 0 && j == 0) continue;
      newX = x + (i / 3) * l;
      newY = y + (j / 3) * l;
      if (l < 3) {
        push();
        translate(width/2, height/2);
        rect(newX, newY, l, l);
        pop();
        return;
      } else {
        recursiveSquare(newX, newY, l/3);
      }
    }
  }
}

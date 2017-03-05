
var sponge = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#33032F');
  fill('#97D8B2');
  noStroke();
  sponge.push(new Square(0, 0, 729));// min(width, height)*0.95));
  sponge[0].show();
  noLoop();
}


function Square(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.show = function() {
    rectMode(CENTER);
    push();
    translate(width/2, height/2);
    rect(this.x, this.y, this.r, this.r);
    pop();
  }

  this.generate = function () {
    var squares = [];
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++) {
        if(i == 0 && j == 0) continue;
        x = this.x + (i / 3) * this.r;
        y = this.y + (j / 3) * this.r;
        var newSquare = new Square(x, y, this.r/3);
        squares.push(newSquare);
      }
    }
    return squares;
  }
}


function mouseClicked() {
  if(sponge.length >= 262144) {
    print("max reached");
    return;
  }
  background('#33032F');
  var next = [];
  for(var i = 0; i < sponge.length; i++) {
    square = sponge[i];
    next.push.apply(next, square.generate());
  }
  sponge = next;

  for(var i = 0; i < sponge.length; i++) {
    square = sponge[i];
    square.show();
  }

  print(pow(sponge[0].r, 2) * sponge.length)
}

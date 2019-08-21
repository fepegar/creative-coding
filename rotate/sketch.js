var squares = [];
var square;
var phase = 1;
var beige;
var squareSize;
var gray = 50;

function setup() {
  createCanvas(400, 400);
  squareSize = width / sqrt(2);
  console.log(squareSize);
  beige = color(255, 255, 200);
  square = new Square(200, 200, squareSize, beige, QUARTER_PI);
  initSquares();
}

function draw() {
  switch(phase) {
    case 1:
      console.log(1);
      background(gray);
      square.rotate();
      square.draw();
      if (square.accTheta >= HALF_PI) {
        square.accTheta = 0;
        phase = 2;
      }
      break;

    case 2:
      background(beige);
      drawCorners();
      if (squares[0].y >= 0) {
        initSquares();
        phase = 1;
      }
      break;
  }
}

function initSquares() {
  squares = [];
  squares.push(new Square(0, -height, squareSize, gray, QUARTER_PI));
  squares.push(new Square(width, -height, squareSize, gray, QUARTER_PI));
  squares.push(new Square(0, 0, squareSize, gray, QUARTER_PI));
  squares.push(new Square(width, 0, squareSize, gray, QUARTER_PI));
  squares.push(new Square(0, height, squareSize, gray, QUARTER_PI));
  squares.push(new Square(width, height, squareSize, gray, QUARTER_PI));
}


function drawCorners() {
  squares.forEach(square => {
    square.fall();
    square.draw();
  });
}

function Square(x, y, size, color_, theta) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color_;

  this.theta = theta;
  this.dTheta = 0.01;
  this.dY = 5;
  this.accTheta = 0;

  this.rotate = function() {
    this.theta += this.dTheta;
    this.accTheta += this.dTheta;
  }

  this.fall = function () {
    this.y += this.dY;
  }

  this.draw = function() {
    rectMode(CENTER);

    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.theta);
    rect(0, 0, this.size, this.size);
    pop();
  }
}


var im;
var ready = false;
var pieces = [];
var meanColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  im = loadImage('images/hermanos.jpg', loaded);
}


function loaded() {
  im.resize(600,0)//, 600); // 0);
  im.loadPixels();
  resizeCanvas(im.width, im.height)
  // var d = 0.95 * min(width, height);
  var piece = new Piece(0, 0, width+1, height+1);
  pieces.push(piece);
  meanColor = piece.color;
  ready = true;
  clear();
  piece.draw();
}


function draw() {
  if (!ready) {
    background(
      noise(frameCount / 100)*255,
      noise(frameCount / 100 + 1000)*255,
      noise(frameCount / 100 + 2000)*255)
    return;
  }
  update();
}


function update() {
  if (mouseX == 0) {return;}
  var onePiece;
  for (var i = 0; i < pieces.length; i++) {
    onePiece = pieces[i];
    if (onePiece.mouseOver() && onePiece.canDivide()) {
      var newPieces = onePiece.divide();
      pieces.splice(i, 1);
      pieces = pieces.concat(newPieces);
      //background(meanColor);
      clear();
      for (var i = 0; i < pieces.length; i++) {
        pieces[i].draw();
      }
      break;
    }
  }
}


function Piece(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = im.get(this.x, this.y, this.width, this.height);
  if(this.image.length == 4) {  // one pixel only
    this.pixels = this.image
  } else {
    this.image.loadPixels();
    this.pixels = this.image.pixels;
  }
  this.color = getMeanColor(this.pixels);

  this.draw = function() {
    stroke(this.color);
    fill(this.color);
    ellipse(
      this.x + (width-2)/2,
      this.y + (height-2)/2,
      this.width,
      this.height);
  }

  this.mouseOver = function() {
    var center = createVector(this.x + this.width/2, this.y + this.height/2);
    var d = this.width;
    return dist(mouseX, mouseY, center.x, center.y) < d/2;
  }

  this.divide = function() {
    var newPieces = []
    var minSize = 10;
    if (this.height < 2) {  // Split vertically
      newPieces.push(new Piece(
        this.x, this.y, this.width/2, this.height));
      newPieces.push(new Piece(
        this.x + this.width/2, this.y, this.width/2, this.height));
    }
    else if (this.width < 2) {  // Split horizontally
      newPieces.push(new Piece(
        this.x, this.y, this.width, this.height/2));
      newPieces.push(new Piece(
        this.x, this.y + this.height/2, this.width, this.height/2));
    }
    else {  // Split in 4
      newPieces.push(new Piece(
        this.x, this.y, this.width/2, this.height/2));
      newPieces.push(new Piece(
        this.x + this.width/2, this.y, this.width/2, this.height/2));
      newPieces.push(new Piece(
        this.x, this.y + this.height/2, this.width/2, this.height/2));
      newPieces.push(new Piece(
        this.x + this.width/2, this.y + this.height/2, this.width/2, this.height/2));
    }
    return newPieces;
  }

  this.canDivide = function() {
    return this.width >= 2 || this.height >= 2;
  }
}


function getMeanColor(pixels) {
  var r = [];
  var g = [];
  var b = [];
  for(var i = 0; i < pixels.length; i += 4) {
    if(pixels[i+3] === 0) continue;
    r.push(pixels[i]);
    g.push(pixels[i+1]);
    b.push(pixels[i+2]);
  }
  return color(mean(r), mean(g), mean(b));
}


function mean(arr) {
  return arr.reduce(function(a, b) { return a + b; }) / arr.length;
}

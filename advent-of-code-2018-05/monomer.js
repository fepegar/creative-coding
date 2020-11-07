function Monomer(char, i, j) {
  this.char = char;
  this.ascii = this.char.charCodeAt(0);
  this.length = monomerLength;
  if (this.ascii < 91) {  // 90 = Z
    this.is_capital = true;
  } else {
    this.is_capital = false;
  }
  this.i = i;
  this.j = j;
  this.color = getMonomerColor(this.ascii, this.is_capital);

  this.draw = function() {
    fill(this.color);
    noStroke();
    rectMode(CORNER);
    rect(
      this.j * this.length,
      this.i * this.length,
      this.length,
      this.length,
    );
    // textAlign(CENTER);
    // text(this.char, this.x + this.length / 2, this.y + height/5);
  }
}

function getMonomerColor(ascii, is_capital) {
  A = 65;
  a = 97;
  var color_hue;
  var color_alpha;
  if (is_capital) {
    color_hue = ascii - A;
    color_alpha = 1;
  } else {
    color_hue = ascii - a;
    color_alpha = 0.5;
  }
  return color(color_hue, 100, 100, color_alpha);
}

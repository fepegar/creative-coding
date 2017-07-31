
var bSlider;
var idx = 0;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(50);
  colorMode(HSB, 255, 255, 255);
  bSlider = createSlider(0, 255, 1);
  bSlider.position(0, 0);
  bSlider.size(width);
  bSlider.input(sliderMoved);
  sliderMoved();
}


function draw_() {
  colorMode(HSB, 255, 255, 255);
  loadPixels();
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {

      var s = map(x, 0, width,  0, 255);
      var h = map(y, 0, height, 0, 255);
      var b = bSlider.value();
      var idx = 4 * (x + y * width);

      c = color(h, s, b);

      pixels[idx++] = red(c);
      pixels[idx++] = green(c);
      pixels[idx++] = blue(c);
      pixels[idx++] = 255;
    }
  }
  updatePixels();
}


function sliderMoved() {
  draw_();
}


function mousePressed() {
  var rgb = get(mouseX, mouseY);
  print(rgb);
  colorMode(RGB);
  background(rgb);
}

function mouseReleased() {
  draw_();
}

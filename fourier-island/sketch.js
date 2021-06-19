// Coding Challenge 130.3: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.1-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.3-fourier-transform-drawing.html
// https://youtu.be/7_vKzcgpfvU
// https://editor.p5js.org/codingtrain/sketches/ldBlISrsQ

let x = [];
let fourier;
let time = 0;
let path = [];
let gain = 0.04;
let offset;
let allComponents;
let componentsIdx = 0;
let speed = 2;
let capture = false;
let capturer;
let side;

if (capture) {
  side = 1000;
  capturer = new CCapture({format: 'png', framerate: 60});
} else {
  side = 800;
}

function setup() {

  createCanvas(side, side);
  const skip = 10;
  for (let i = 0; i < drawingUK.length; i += skip) {
    const c = new Complex(gain * drawingUK[i].x, -gain * drawingUK[i].y);
    x.push(c);
  }
  fourier = dft(x);
  fourier.sort((a, b) => b.amp - a.amp);
  //allComponents = [2]; // , 3, 4, 5, 10, 25, 50, 100, 200, x.length];
  allComponents = [2, 3, 4, 5, 10, 25, 50, 100, 200, x.length];
}

function epicycles(x, y, rotation, fourier) {
  offset = createVector(0, 0);
  let N = allComponents[componentsIdx];
  for (let i = 0; i < N; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    strokeWeight(0.5);
    if (i > 0) {
      stroke(255, 100);
      noFill();
      ellipse(prevx, prevy, radius * 2);
      stroke(255, 60);
      line(prevx, prevy, x, y);
    } else {
      offset = createVector(prevx, prevy);
    }
  }
  return createVector(x, y);
}

function draw() {
  background(30, 30, 50);
  fill(180, 30, 30);
  noStroke();
  textAlign(CENTER);
  textSize(20);
  string = allComponents[componentsIdx] + " components"
  text(string, width / 2, height * 0.9);
  let offsetX = fourier[0].amp * cos(fourier[0].freq * time + fourier[0].phase);
  let offsetyY = fourier[0].amp * sin(fourier[0].freq * time + fourier[0].phase);
  let v = epicycles(width / 2 - offsetX, height / 2 - offsetyY, 0, fourier);
  path.unshift(v);

  beginShape();
  noFill();
  strokeWeight(2);
  stroke(220, 250, 40);
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  if (capture) {
    capturer.capture(document.getElementById('defaultCanvas0'));
  }

  const dt = speed * TWO_PI / fourier.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
    componentsIdx += 1;
    if (componentsIdx == allComponents.length) {
      noLoop();
      if (capture) {
        console.log('finished recording.');
        capturer.stop();
        capturer.save();
      }
    }
  }
}


var circle;
var javi;

function preload() {
  javi = loadSound('assets/javi.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	circle = new Circle(width/2, height/2, height/4);
}

function draw() {
  background(0, 255, 0);
	circle.move();
	circle.show();
}

function Circle(x, y, d) {
	this.x = x;
	this.y = y;
	this.d = d;

	this.mouseOver = function() {
		var d = dist(this.x, this.y, mouseX, mouseY);
		return d < this.d/2;
	}

	this.move = function() {
		if (this.mouseOver()) {
      javi.play();
			this.x = random(width);
			this.y = random(height);
		}
	}

	this.show = function() {
		// Cabeza
		noStroke();
	  fill(180, 230, 255);
	  ellipse(this.x, this.y, this.d);

		// Ojos
		fill(255);
		ojo1 = createVector(this.x - this.d/5, this.y - this.d/5);
		ojo2 = createVector(this.x + this.d/5, this.y - this.d/5);
		ellipse(ojo1.x, ojo1.y, this.d/6);
		ellipse(ojo2.x, ojo2.y, this.d/6);
		fill(0);
		ellipse(ojo1.x, ojo1.y, this.d/12);
		ellipse(ojo2.x, ojo2.y, this.d/12);

		// Boca
		boca1 = createVector(ojo1.x, this.y + this.d/8);
		boca2 = createVector(ojo2.x, this.y + this.d/8);
		stroke(0);
		fill(255, 0, 0);
		curve(ojo1.x, ojo1.y-this.d,
					boca1.x, boca1.y,
					boca2.x, boca2.y,
				  ojo2.x, ojo2.y-this.d);


	}
}

var balls = [];
var viridis = [];
var maxDist;
A_MAX = 0.1;
var slow = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  defineViridis();
  maxDist = sqrt(sq(width) + sq(height));
}

function draw() {
  if(slow) {
    background(214, 186, 255);
  } else {
    background(50);
  }
  for(var i = 0; i < balls.length; i++) {
    ball = balls[i];
    ball.move();
    ball.show();
  }
}

function Ball(x, y, d) {
	this.p = createVector(x, y);
	this.v = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
	this.a = createVector(0, 0);
	this.d = d;

	this.move = function() {
		var fromMouse = p5.Vector.sub(this.p, createVector(mouseX, mouseY));
    // this.a = fromMouse.div(1000);
    var d = fromMouse.mag();
    var m = map(d, 0, maxDist, A_MAX, 0);
    this.a = fromMouse;
    this.a.setMag(m);
    this.v.add(this.a);
    this.p.add(this.v);

		if(this.p.x >= width) {
			this.p.x = 0;
		} else if (this.p.x < 0) {
			this.p.x = width;
		} else if (this.p.y >= height) {
			this.p.y = 0;
		} else if (this.p.y < 0) {
			this.p.y = height;
		}
	}

	this.show = function() {
		noStroke();
    if(slow) {
      c = color(255, 204, 0);
    } else {
      var aMag = this.a.mag();
      var mapped = map(aMag, 0, A_MAX, 0, 255)
      colorIdx = round(mapped);
      c = viridis[colorIdx];
      aux = this.a.copy();
      aux.mult(1000);
      aux.setMag(aux.mag() + this.d/2);
      f = p5.Vector.add(this.p, aux);

      stroke(c);
      colorAlpha(stroke, c, 100);
      line(this.p.x, this.p.y, f.x, f.y);
    }
    fill(c);
		ellipse(this.p.x, this.p.y, this.d);
	}
}

function colorAlpha(f, c, a) {
  c = color(red(c), green(c), blue(c), a);
  f(c);
}

function mouseClicked() {
	print('clicke');
  balls.push(new Ball(mouseX, mouseY, random(10, 90)));
}

function keyTyped() {
  switch(key) {
    case 's':
      slow = !slow;
      break;

    case 'm':
      for(var i = 0; i < balls.length; i++) {
        balls[i].v.mult(1.1);
      }
      break;

    case 'l':
      for(var i = 0; i < balls.length; i++) {
        balls[i].v.mult(0.9);
      }
      break;
  }
}

function defineViridis() {
  viridis = [
    color(68, 1, 84),
    color(68, 2, 85),
    color(68, 3, 87),
    color(69, 5, 88),
    color(69, 6, 90),
    color(69, 8, 91),
    color(70, 9, 92),
    color(70, 11, 94),
    color(70, 12, 95),
    color(70, 14, 97),
    color(71, 15, 98),
    color(71, 17, 99),
    color(71, 18, 101),
    color(71, 20, 102),
    color(71, 21, 103),
    color(71, 22, 105),
    color(71, 24, 106),
    color(72, 25, 107),
    color(72, 26, 108),
    color(72, 28, 110),
    color(72, 29, 111),
    color(72, 30, 112),
    color(72, 32, 113),
    color(72, 33, 114),
    color(72, 34, 115),
    color(72, 35, 116),
    color(71, 37, 117),
    color(71, 38, 118),
    color(71, 39, 119),
    color(71, 40, 120),
    color(71, 42, 121),
    color(71, 43, 122),
    color(71, 44, 123),
    color(70, 45, 124),
    color(70, 47, 124),
    color(70, 48, 125),
    color(70, 49, 126),
    color(69, 50, 127),
    color(69, 52, 127),
    color(69, 53, 128),
    color(69, 54, 129),
    color(68, 55, 129),
    color(68, 57, 130),
    color(67, 58, 131),
    color(67, 59, 131),
    color(67, 60, 132),
    color(66, 61, 132),
    color(66, 62, 133),
    color(66, 64, 133),
    color(65, 65, 134),
    color(65, 66, 134),
    color(64, 67, 135),
    color(64, 68, 135),
    color(63, 69, 135),
    color(63, 71, 136),
    color(62, 72, 136),
    color(62, 73, 137),
    color(61, 74, 137),
    color(61, 75, 137),
    color(61, 76, 137),
    color(60, 77, 138),
    color(60, 78, 138),
    color(59, 80, 138),
    color(59, 81, 138),
    color(58, 82, 139),
    color(58, 83, 139),
    color(57, 84, 139),
    color(57, 85, 139),
    color(56, 86, 139),
    color(56, 87, 140),
    color(55, 88, 140),
    color(55, 89, 140),
    color(54, 90, 140),
    color(54, 91, 140),
    color(53, 92, 140),
    color(53, 93, 140),
    color(52, 94, 141),
    color(52, 95, 141),
    color(51, 96, 141),
    color(51, 97, 141),
    color(50, 98, 141),
    color(50, 99, 141),
    color(49, 100, 141),
    color(49, 101, 141),
    color(49, 102, 141),
    color(48, 103, 141),
    color(48, 104, 141),
    color(47, 105, 141),
    color(47, 106, 141),
    color(46, 107, 142),
    color(46, 108, 142),
    color(46, 109, 142),
    color(45, 110, 142),
    color(45, 111, 142),
    color(44, 112, 142),
    color(44, 113, 142),
    color(44, 114, 142),
    color(43, 115, 142),
    color(43, 116, 142),
    color(42, 117, 142),
    color(42, 118, 142),
    color(42, 119, 142),
    color(41, 120, 142),
    color(41, 121, 142),
    color(40, 122, 142),
    color(40, 122, 142),
    color(40, 123, 142),
    color(39, 124, 142),
    color(39, 125, 142),
    color(39, 126, 142),
    color(38, 127, 142),
    color(38, 128, 142),
    color(38, 129, 142),
    color(37, 130, 142),
    color(37, 131, 141),
    color(36, 132, 141),
    color(36, 133, 141),
    color(36, 134, 141),
    color(35, 135, 141),
    color(35, 136, 141),
    color(35, 137, 141),
    color(34, 137, 141),
    color(34, 138, 141),
    color(34, 139, 141),
    color(33, 140, 141),
    color(33, 141, 140),
    color(33, 142, 140),
    color(32, 143, 140),
    color(32, 144, 140),
    color(32, 145, 140),
    color(31, 146, 140),
    color(31, 147, 139),
    color(31, 148, 139),
    color(31, 149, 139),
    color(31, 150, 139),
    color(30, 151, 138),
    color(30, 152, 138),
    color(30, 153, 138),
    color(30, 153, 138),
    color(30, 154, 137),
    color(30, 155, 137),
    color(30, 156, 137),
    color(30, 157, 136),
    color(30, 158, 136),
    color(30, 159, 136),
    color(30, 160, 135),
    color(31, 161, 135),
    color(31, 162, 134),
    color(31, 163, 134),
    color(32, 164, 133),
    color(32, 165, 133),
    color(33, 166, 133),
    color(33, 167, 132),
    color(34, 167, 132),
    color(35, 168, 131),
    color(35, 169, 130),
    color(36, 170, 130),
    color(37, 171, 129),
    color(38, 172, 129),
    color(39, 173, 128),
    color(40, 174, 127),
    color(41, 175, 127),
    color(42, 176, 126),
    color(43, 177, 125),
    color(44, 177, 125),
    color(46, 178, 124),
    color(47, 179, 123),
    color(48, 180, 122),
    color(50, 181, 122),
    color(51, 182, 121),
    color(53, 183, 120),
    color(54, 184, 119),
    color(56, 185, 118),
    color(57, 185, 118),
    color(59, 186, 117),
    color(61, 187, 116),
    color(62, 188, 115),
    color(64, 189, 114),
    color(66, 190, 113),
    color(68, 190, 112),
    color(69, 191, 111),
    color(71, 192, 110),
    color(73, 193, 109),
    color(75, 194, 108),
    color(77, 194, 107),
    color(79, 195, 105),
    color(81, 196, 104),
    color(83, 197, 103),
    color(85, 198, 102),
    color(87, 198, 101),
    color(89, 199, 100),
    color(91, 200, 98),
    color(94, 201, 97),
    color(96, 201, 96),
    color(98, 202, 95),
    color(100, 203, 93),
    color(103, 204, 92),
    color(105, 204, 91),
    color(107, 205, 89),
    color(109, 206, 88),
    color(112, 206, 86),
    color(114, 207, 85),
    color(116, 208, 84),
    color(119, 208, 82),
    color(121, 209, 81),
    color(124, 210, 79),
    color(126, 210, 78),
    color(129, 211, 76),
    color(131, 211, 75),
    color(134, 212, 73),
    color(136, 213, 71),
    color(139, 213, 70),
    color(141, 214, 68),
    color(144, 214, 67),
    color(146, 215, 65),
    color(149, 215, 63),
    color(151, 216, 62),
    color(154, 216, 60),
    color(157, 217, 58),
    color(159, 217, 56),
    color(162, 218, 55),
    color(165, 218, 53),
    color(167, 219, 51),
    color(170, 219, 50),
    color(173, 220, 48),
    color(175, 220, 46),
    color(178, 221, 44),
    color(181, 221, 43),
    color(183, 221, 41),
    color(186, 222, 39),
    color(189, 222, 38),
    color(191, 223, 36),
    color(194, 223, 34),
    color(197, 223, 33),
    color(199, 224, 31),
    color(202, 224, 30),
    color(205, 224, 29),
    color(207, 225, 28),
    color(210, 225, 27),
    color(212, 225, 26),
    color(215, 226, 25),
    color(218, 226, 24),
    color(220, 226, 24),
    color(223, 227, 24),
    color(225, 227, 24),
    color(228, 227, 24),
    color(231, 228, 25),
    color(233, 228, 25),
    color(236, 228, 26),
    color(238, 229, 27),
    color(241, 229, 28),
    color(243, 229, 30),
    color(246, 230, 31),
    color(248, 230, 33),
    color(250, 230, 34),
    color(253, 231, 36)];
}

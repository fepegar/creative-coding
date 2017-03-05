// For keys that make a numeric value change fast
function catchKeys() {
  if (!keyIsPressed) {
    return;
  }

  var i;
  var ball;

  switch (keyCode) {

    // Add one ball
    case UP_ARROW:
      addBall();
      break;

      // Remove one ball
    case DOWN_ARROW:
      removeBall();
      break;

      // Decrease balls tails
    case LEFT_ARROW:
      tail--;
      console.log('New tail: ', tail);
      break;

      // Increase balls tails
    case RIGHT_ARROW:
      tail++;
      console.log('New tail: ', tail);
      break;
  }


  switch (key) {

    // Attract balls to the center
    case ' ':
      for (i = 0; i < balls.length; i++) {
        balls[i].toCenter = true;
      }
      break;

      // Decrease gravity
    case 'f':
      gravity -= GRAVITY_STEP;
      if (gravity < 0) {
        gravity = 0;
      }
      for (i = 0; i < balls.length; i++) {
        balls[i].a.y = gravity;
      }
      break;

      // Increase gravity
    case 'h':
      gravity += GRAVITY_STEP;
      for (i = 0; i < balls.length; i++) {
        balls[i].a.y = gravity;
      }
      break;

      // Increase border opacity
    case 'o':
      for (i = 0; i < balls.length; i++) {
        ball = balls[i];
        ball.strokeAlpha += 5;
        if (ball.strokeAlpha > 255) {
          ball.strokeAlpha = 255;
        }
      }
      break;

      // Decrease border opacity
    case 'i':
      for (i = 0; i < balls.length; i++) {
        ball = balls[i];
        ball.strokeAlpha -= 5;
        if (ball.strokeAlpha < 0) {
          ball.strokeAlpha = 0;
        }
      }
      break;

      // Increase balls diameter
    case 'm':
      for (i = 0; i < balls.length; i++) {
        balls[i].d *= 1.01;
      }
      break;

      // Decrease balls diameter
    case 'l':
      for (i = 0; i < balls.length; i++) {
        balls[i].d *= 0.99;
        if (balls[i].d * 0.99 > 1) {
          balls[i].d *= 0.99;
        }
      }
      break;

      // Decrease noise effect
    case 'q':
      for (i = 0; i < balls.length; i++) {
        if (balls[i].noisy) {
          balls[i].maxNoiseValue *= 0.99;
        }
      }
      break;

      // Increase noise effect
    case 'e':
      for (i = 0; i < balls.length; i++) {
        if (balls[i].noisy) {
          balls[i].maxNoiseValue *= 1.01;
        }
      }
      break;
  }
}



// For keys that should make something work just once
function keyTyped() {
  var i;

  switch (key) {

    // Stop everything
    case 'p':
      stopDrawing = !stopDrawing;
      break;

      // Remove all balls
    case 'r':
      print('Removing all balls');
      removeAllBalls();
      break;

      // Change background color
    case 'b':
      drawBG = !drawBG;
      break;

      // Invert balls direction
    case 'n':
      for (i = 0; i < balls.length; i++) {
        balls[i].v.mult(-1);
      }
      break;

      // Add Perlin noise to balls
    case 'w':
      noisyBalls = !noisyBalls;
      for (i = 0; i < balls.length; i++) {
        balls[i].noisy = noisyBalls;
      }
      break;

      // Remove gravity
    case 'g':
      for (i = 0; i < balls.length; i++) {
        balls[i].a.mult(0);
      }
      break;

      // Make balls diameters shrink and grow
    case 'v':
      for (i = 0; i < balls.length; i++) {
        balls[i].pulse = !balls[i].pulse;
        balls[i].pulseDiameterRef = balls[i].d;
      }
      break;
  }
}


function keyReleased() {
  if (key == ' ') {
    for (var i = 0; i < balls.length; i++) {
      balls[i].toCenter = false;
    }
  }
}
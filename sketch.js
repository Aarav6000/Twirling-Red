var sq, ball, button;
var pic1, ball1, ball2, bg;
var ding, dong;
var gameState = "start";
var score = 0;
var func = true;

function preload() {
  pic1 = loadImage("resource/sq1.png");
  ball1 = loadImage("resource/ball.png");
  ball2 = loadImage("resource/ball2.png");
  bg = loadImage("resource/ballbg.jpg");
  ding = loadSound("resource/ding.mp3");
  dong = loadSound("resource/dong.mp3")
}

function setup() {
  createCanvas(400, 600);

  sq = createSprite(width / 2, 200, 100, 100);
  sq.addImage(pic1);
  sq.scale = 1.3;

  ball = createSprite(width / 2, 300, 20, 20);
  ball.addImage(ball1);
  ball.scale = 0.15;

  button = createButton('Start!');
  button.style('background-color', color(25, 23, 200, 50));
  button.position(225, 115);
}

function draw() {
  background(bg);

  if (mouseIsPressed && gameState !== 0 && func === true) {
    ball.velocityY = -10;
    func = false;
    setTimeout(() => {
      func = true;
    }, 500);
  }

  if (gameState === "start") {
    button.mousePressed(i);
  }
  else if (gameState === 0) {
    textSize(18);
    fill(5, 100, 255);
    text("Game Over", 160, 450);

    if (keyDown("r")) {
      reset();
    }
  } else if (gameState === 1) {
    if (frameCount % 15 === 0) {
      sq.rotation = sq.rotation + 90;
    }
    button.hide();

    if (ball.isTouching(sq)) {
      if (sq.rotation % 360 === 0) {
        score++;
        ding.play();
      } else {
        gameState = 0;
        dong.play();
      }
    }

    if (score >= 10) {
      gameState = 2;
    }
  }
  else if (gameState === 2) {
    if (frameCount % 10 === 0) {
      sq.rotation = sq.rotation + 90;
    }
    button.hide();

    ball.addImage(ball2);

    if (ball.isTouching(sq)) {
      if (sq.rotation % 360 === 0) {
        score++;
        ding.play();
      } else {
        gameState = 0;
        dong.play();
      }
    }

    if (score >= 20) {
      gameState = 3;
    }
  }
  else if (gameState === 3) {
    if (frameCount % 8 === 0) {
      sq.rotation = sq.rotation + 90;
    }

    if (ball.isTouching(sq)) {
      if (sq.rotation % 360 === 0) {
        score++;
        ding.play();
      } else {
        gameState = 0;
        dong.play();
      }
    }
  }

  if (ball.y < 290) {
    ball.y = 300;
    ball.velocityY = 0;
  }

  drawSprites();
  textSize(18);
  fill(5, 100, 255);
  text("Score: " + score, 170, 400);

  //Intructions
  text("Rules:", 90, 460);
  textSize(12);
  text("Press up arrow to hit the square's red side", 90, 480);
  text("Hitting the wrong side will result in game over", 90, 495);
}

function reset() {
  gameState = "start";
  score = 0;
  button.show();
  sq.rotation = 0;
}

function i() {
  gameState = 1;
}
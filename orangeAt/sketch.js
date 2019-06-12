let x = 240;
let x1 = 258;
let score = 0;
let health = 5;
let opelsins = [];
let ecllipseOpelsin = [];
let monsterimg;
let meteorimg;
let inGameSound;
let opelsinimg;
let gameOverSound;
let backgroundsun;
let gameoverScreen;
let staringScreen;
let gameStarted = false;

function collideRectangleCircle(rx, ry, rw, rh, cx, cy, cr) {
  return rx + rw > cx - cr && cx + cr > rx && ry + rh > cy - cr && cy + cr > ry;
}

function Opelsin() {
  this.x = random(40, 560);
  this.y = random(-200, -190);
  this.speed = random(3, 10);

  this.fall = function() {
    this.y = this.y + this.speed;
    if (this.y > height) {
      this.y = random(-200, -100);
      this.x = random(40, 560);
      this.speed = random(3, 10);
    }
  };
  this.show = function() {
    fill(255);
    ellipse(this.x + 15, this.y + 34, 10, 10);
    image(opelsinimg, this.x, this.y, 40, 40);
  };
}

function opelsinmodel() {
  this.x = random(0, 600);
  this.y = random(-300, -310);
  this.speed = random(3, 10);
  this.show = function() {
    ellipse(this.x, this.y, 20, 20);
  };
}
function setup() {
  createCanvas(600, 400);
  frameRate(300);
  inGameSound.setVolume(1);
  inGameSound.loop();
  interval = setInterval(scoreCount, 500);
}

function gameOver() {
  textSize(20);
  text("GAME OVER", 250, 200);
  text("SCORE: " + score, 270, 220);

  fill(255);
}
function keyPressed() {
  if (keyCode === 32) {
    gameStarted = true;
  }

  if (health != 0) {
    return;
  }

  resetSketch();
  loop();
}

function resetSketch() {
  health = 5;
  score = 0;
  opelsins = [];
  inGameSound.loop();
  gameOverSound.stop();
}

function preload() {
  soundFormats("m4a");
  startingScreen = loadImage("assets/startingScreen.jpg");
  monsterimg = loadImage("assets/monster.png");
  opelsinimg = loadImage("assets/opelsin.png");
  inGameSound = loadSound("assets/spaceBotInGameMusic.m4a");
  gameOverSound = loadSound("assets/gameOverInGameSound.m4a");
  backgroundsun = loadImage("assets/backgroundsun.jpg");
  gameoverScreen = loadImage("assets/gameOverScreen.png");
}

function scoreCount() {
  if (gameStarted == true) {
    score++;
  }
}

function draw() {
  if (!gameStarted) {
    image(startingScreen, 0, 0, 600, 400);
  } else {
    image(backgroundsun, 0, 0, 700, 400);

    if (score == 0) {
      for (let i = 0; i < 5; i++) {
        opelsins[i] = new Opelsin();
        ecllipseOpelsin[i] = new opelsinmodel();
      }
    }
    if (score == 50) {
      for (let i = 0; i < 10; i++) {
        opelsins[i] = new Opelsin();
        ecllipseOpelsin[i] = new opelsinmodel();
      }
    }
    if (score == 100) {
      for (let i = 0; i < 15; i++) {
        opelsins[i] = new Opelsin();
        ecllipseOpelsin[i] = new opelsinmodel();
      }
    }
    if (score == 150) {
      for (let i = 0; i < 20; i++) {
        opelsins[i] = new Opelsin();
        ecllipseOpelsin[i] = new opelsinmodel();
      }
    }
    if (score == 200) {
      for (let i = 0; i < 25; i++) {
        opelsins[i] = new Opelsin();
        ecllipseOpelsin[i] = new opelsinmodel();
      }
    }

    if (keyIsDown(LEFT_ARROW) && x > -14) {
      x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) && x < 550) {
      x += 5;
    }
    if (keyIsDown(LEFT_ARROW) && x1 > 9) {
      x1 -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && x1 < 565) {
      x1 += 5;
    }
    fill(255, 255, 0);

    rect(x1, 345, 20, 20);
    image(monsterimg, x, 310, 60, 60);

    for (let opelsin of opelsins) {
      opelsin.fall();
      opelsin.show();
    }

    textSize(20);
    text("Health: " + health, 10, 20);
    fill(255);
    textSize(20);
    text("Score: " + score, 10, 40);
    fill(255);
    for (let opelsin of opelsins) {
      hit = collideRectCircle(x1, 335, 20, 30, opelsin.x, opelsin.y, 40);
      if (hit == true) {
        health -= 1;
        opelsin.y = height + 1;
      }
    }
    if (health == 0) {
      inGameSound.stop();
      gameOverSound.setVolume(1);
      gameOverSound.loop();
      image(gameoverScreen, 0, 0, 600, 400);
      gameOver();
      noLoop();
    }
  }
}

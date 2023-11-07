
let player, playerImage, enemyImage, bgImage, bullets, enemies, score, gameOver;
let bgY = 0; // For the scrolling background

function preload() {
  playerImage = loadImage('turkey.png');
  enemyImage = loadImage('oven.png');
  bgImage = loadImage('background.jpg');
}

function setup() {
  createCanvas(800, 600);
  player = { x: width / 2, y: height - 60, speed: 5 };
  bullets = [];
  enemies = [];
  score = 0;
  gameOver = false;

  // Create some enemies
  for (let i = 0; i < 6; i++) {
    enemies.push(createEnemy());
  }
}

function draw() {
  if (!gameOver) {
    // Scrolling background
    image(bgImage, 0, bgY - height);
    image(bgImage, 0, bgY);
    bgY += 2;
    if (bgY > height) {
      bgY = 0;
    }

    // Player movement
    if (keyIsDown(LEFT_ARROW)) {
      player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += player.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      player.y -= player.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      player.y += player.speed;
    }

    // Constrain player to canvas
    player.x = constrain(player.x, 0, width - playerImage.width);
    player.y = constrain(player.y, 0, height - playerImage.height);

    // Display player
    image(playerImage, player.x, player.y);

    // Update and display bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speed;
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      } else {
        fill(255, 204, 0);
        noStroke();
        ellipse(bullets[i].x, bullets[i].y, 4, 10);
      }
    }

    // Update and display enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].y += enemies[i].speed;
      if (enemies[i].y > height) {
        enemies[i] = createEnemy();
      } else {
        image(enemyImage, enemies[i].x, enemies[i].y);
      }
    }

    // Collision detection
    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (collides(enemies[i], bullets[j])) {
          score += 10;
          enemies[i] = createEnemy();
          bullets.splice(j, 1);
          break;
        }
      }
      if (collides(enemies[i], {x: player.x, y: player.y, width: playerImage.width, height: playerImage.height})) {
        gameOver = true;
      }
    }

    // Display score
    fill(255);
    textSize(32);
    text('Score: ' + score, 10, 30);
  } else {
    textSize(64);
    textAlign(CENTER);
    text('Game Over', width / 2, height / 2);
    textSize(32);
    text('Final Score: ' + score, width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (keyCode === 32) { // Spacebar to shoot
    bullets.push({ x: player.x + playerImage.width / 2, y: player.y, speed: 10 });
  }
}

function createEnemy() {
  return { x: random(0, width - enemyImage.width), y: -enemyImage.height, speed: random(1, 3) };
}

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

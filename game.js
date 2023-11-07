/** @format */

let turkey; // The player as a turkey
let ovens = []; // Array to hold the oncoming ovens
let shots = []; // Array to hold the shots fired by the turkey
let score = 0; // The player's score
let bg; // Variable to store background image
let bgY = 0; // Background scroll position
let ovenImage; // Variable to store oven image

function preload() {
  // Preload the background image
  bg = loadImage("background.jpg"); // Replace with the actual path to your background image
  ovenImage = loadImage("oven.png"); // Replace with the actual path to your oven image
  turkeyImage = loadImage("turkey.png"); // Replace with the actual path to your turkey image
}

function setup() {
  
  let canvasWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let canvasHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(devicePixelRatio); // Adjust for high-DPI displays

  turkey = new Turkey(width / 2, height - 60); // Place turkey at the bottom center
  // If you have a custom font, preload it in the preload() function and set it here
  // textFont('your-custom-font');
  // Initialize the background Y offset to align the bottom of the image with the bottom of the canvas
  bgY = -bg.height + height;
}


function touchMoved() {
  // Check if the touch is on the left or right side of the screen
  if (touchX < width / 2) {
    turkey.move(-1);
  } else {
    turkey.move(1);
  }
  // prevent default
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  // Scrolling background
  // Draw the background image twice to cover the whole canvas and create a seamless effect
  image(bg, 0, bgY);
  image(bg, 0, bgY + bg.height);

  // Update the background Y position
  bgY += 2;
  if (bgY >= 0) {
    // Once the background scrolls past the canvas, reset it to start from the bottom again
    bgY = -bg.height + height;
  }
  translate(0, -bgY);
  for (let i = -height; i < height; i += height) {
    fill(100, 100, 250); // Blueish background for contrast - replace with a background image if desired
    rect(0, i, width, height);
  }
  translate(0, bgY); // Reset translation for other elements

  // Player input
  if (keyIsDown(LEFT_ARROW)) {
    turkey.move(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    turkey.move(1);
  }

  // Turkey display
  turkey.show();
  turkey.update();

  // Shooting
  if (frameCount % 60 === 0) {
    shots.push(new Shot(turkey.x + 20, height - 60));
  }

  // Display and move shots
  for (let i = shots.length - 1; i >= 0; i--) {
    shots[i].show();
    shots[i].move();
    if (shots[i].y < 0) {
      shots.splice(i, 1);
    }
  }

  // Generate ovens
  if (frameCount % 120 === 0) {
    ovens.push(new Oven(random(width), -40));
  }

  // Update and display ovens with new side-to-side motion
  for (let i = ovens.length - 1; i >= 0; i--) {
    ovens[i].update();
    ovens[i].display();
    if (ovens[i].offscreen()) {
      ovens.splice(i, 1);
    }
  }

  // Collision detection
  for (let i = ovens.length - 1; i >= 0; i--) {
    for (let j = shots.length - 1; j >= 0; j--) {
      if (shots[j].hits(ovens[i])) {
        // Increment score
        score++;
        // Remove the oven and the shot
        ovens.splice(i, 1);
        shots.splice(j, 1);
        break; // Each shot only hits one oven
      }
    }
  }

  // Handle shots
  for (let j = shots.length - 1; j >= 0; j--) {
    shots[j].move();
    shots[j].display();
    if (shots[j].offscreen()) {
      shots.splice(j, 1);
    } else {
      // Check for collision with ovens
      for (let i = ovens.length - 1; i >= 0; i--) {
        if (shots[j].hits(ovens[i])) {
          score++;
          ovens.splice(i, 1);
          shots.splice(j, 1);
          break;
        }
      }
    }
  }

  turkey.display();
  turkey.move();

  // Display the score
  fill(255); // White color for the score text
  textSize(24); // Bigger text size for better visibility
  text("Score: " + score, 10, 30);
}

// Sound effects placeholders
function playShootSound() {
  // TODO: Replace this with actual sound effect code or library usage
  console.log("Pew! Pew!"); // Placeholder for shooting sound
}

function playHitSound() {
  // TODO: Replace this with actual sound effect code or library usage
  console.log("Boom!"); // Placeholder for hit sound
}

// Turkey 
  translate(0, -bgY);
  for (let i = -height; i < height; i += height) {
    fill(100, 100, 250); // Blueish background for contrast - replace with a background image if desired
    rect(0, i, width, height);
  }
  translate(0, bgY); // Reset translation for other elements

  // Player input
  if (keyIsDown(LEFT_ARROW)) {
    turkey.move(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    turkey.move(1);
  }

  // Turkey display
  turkey.show();
  turkey.update();

  // Shooting
  if (frameCount % 60 === 0) {
    shots.push(new Shot(turkey.x + 20, height - 60));
  }

  // Display and move shots
  for (let i = shots.length - 1; i >= 0; i--) {
    shots[i].show();
    shots[i].move();
    if (shots[i].y < 0) {
      shots.splice(i, 1);
    }
  }

  // Generate ovens
  if (frameCount % 120 === 0) {
    ovens.push(new Oven(random(width), -40));
  }

  // Update and display ovens with new side-to-side motion
  for (let i = ovens.length - 1; i >= 0; i--) {
    ovens[i].update();
    ovens[i].display();
    if (ovens[i].offscreen()) {
      ovens.splice(i, 1);
    }
  }

  // Collision detection
  for (let i = ovens.length - 1; i >= 0; i--) {
    for (let j = shots.length - 1; j >= 0; j--) {
      if (shots[j].hits(ovens[i])) {
        // Increment score
        score++;
        // Remove the oven and the shot
        ovens.splice(i, 1);
        shots.splice(j, 1);
        break; // Each shot only hits one oven
      }
    }
  }

  // Handle shots
  for (let j = shots.length - 1; j >= 0; j--) {
    shots[j].move();
    shots[j].display();
    if (shots[j].offscreen()) {
      shots.splice(j, 1);
    } else {
      // Check for collision with ovens
      for (let i = ovens.length - 1; i >= 0; i--) {
        if (shots[j].hits(ovens[i])) {
          score++;
          ovens.splice(i, 1);
          shots.splice(j, 1);
          break;
        }
      }
    }
  }

  turkey.display();
  turkey.move();

  // Display the score
  fill(255); // White color for the score text
  textSize(24); // Bigger text size for better visibility
  text("Score: " + score, 10, 30);
}

// Sound effects placeholders
function playShootSound() {
  // TODO: Replace this with actual sound effect code or library usage
  console.log("Pew! Pew!"); // Placeholder for shooting sound
}

function playHitSound() {
  // TODO: Replace this with actual sound effect code or library usage
  console.log("Boom!"); // Placeholder for hit sound
}

// Turkey class using an image
class Turkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = width * 0.1; // Turkey size as 10% of the width
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    // Constrain to canvas boundaries
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  display() {
    imageMode(CENTER);
    image(turkeyImage, this.x, this.y, this.size, this.size); // Display turkey at its current size and position
  }
}

// Shot class


  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    // Constrain to canvas boundaries
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  display() {
    imageMode(CENTER);
    image(turkeyImage, this.x, this.y, this.size, this.size); // Display turkey at its current size and position
  }
}

// Shot class
class Shot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(50, 0, 200);
    noStroke();
    rect(this.x, this.y, 4, 10); // Simple rectangle to represent the shot
  }

  move() {
    this.y -= 5;
  }

  hits(oven) {
    let d = dist(this.x, this.y, oven.x, oven.y);
    return d < 20; // Simple hit test
  }
}

// Add a new shot on spacebar press or screen tap
function keyPressed() {
  if (keyCode === 32) {
    // keyCode for spacebar
    shots.push(new Shot(turkey.x, height - 70));
  }
}

function touchStarted() {
  shots.push(new Shot(turkey.x, height - 70));
  return false; // Prevent default
}

// Oven class with modified display size to 10% of the canvas width
class Oven {
  constructor() {
    this.size = width * 0.1; // Size of the oven as 10% of screen width
    this.x = random(this.size / 2, width - this.size / 2);
    this.y = -this.size; // Start above the screen
    this.xdir = random(1) < 0.5 ? -1 : 1;
    this.speed = 2;
    this.amplitude = random(2, 5);
    this.period = random(100, 200);
    this.startTime = millis();
  }

  update() {
    // Oven update logic with side-to-side motion...
    // Make sure to update this.x within the constraints of screen and oven size
    this.y += this.speed;
    let timePassed = millis() - this.startTime;
    this.x += this.xdir * sin(timePassed / this.period) * this.amplitude;

    // Reverse direction at screen edges, taking into account the oven's size
    if (this.x > width - this.size || this.x < 0) {
      this.xdir *= -1;
    }

    // Ensure oven stays within horizontal bounds of the screen
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  display() {
    // Display the oven with constrained size
    // Use the imageMode(CENTER) if you want the x,y to represent the center of the oven image
    imageMode(CENTER);
    image(ovenImage, this.x, this.y, this.size, this.size); // Draw oven with constrained size
  }

  offscreen() {
    // Offscreen logic...
    return this.y > height + this.size; // Plus size so it fully disappears offscreen before being removed
  }
}

// Run the game
function keyPressed() {
  if (key === " ") {
    shots.push(new Shot(turkey.x, height - 60));
  }
}

// Start the game
function startGame() {
  ovens = [];
  shots = [];
  loop();
}

// Call this function to start the game
startGame();

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, -5);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 16);
  }
}

// Function to create a particle effect
function createExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    let p = new Particle(x, y);
    particles.push(p);
  }
}

// We'll assume the 'particles' array exists and add it to the game if not present.
// Ensure that there's an array to store the particles
if (typeof particles === "undefined") {
  var particles = [];
}

// Integrate particles system update and drawing into the game loop
function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

// LaserParticle class extends Particle
class LaserParticle extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = 0; // laser particles go straight up
    this.vy = random(-3, -6); // faster than explosion particles
    this.color = [random(50, 255), random(50, 255), 0]; // color for laser particles
  }

  // Overriding the show method to use laser particle's color and size
  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, 4, 12); // elongated laser particle shape
  }
}

// Function to create a laser effect
function createLaserEffect(x, y) {
  for (let i = 0; i < 5; i++) {
    // fewer particles for a laser shot
    let p = new LaserParticle(x, y);
    particles.push(p);
  }
}

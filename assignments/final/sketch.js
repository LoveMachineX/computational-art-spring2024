let img;
let imgWidth = 60;
let imgHeight = 48;
let freeze = false;  
let staticImage;  
let player = null;
let squareGenerated = false;
let gold;
// let jumpSound;
// let victory;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createCapture(VIDEO);
  img.size(imgWidth, imgHeight);
  img.hide();
  pixelDensity(1);
  background(200);

  player = new Player(100, 100); // Initial player position
  gold = new Gold(30, 30); //initial gold
    document.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            toggleFreeze();
        } else {
            player.setMovement(event.key.toLowerCase(), true);
        }
    });

    document.addEventListener('keyup', function(event) {
        player.setMovement(event.key.toLowerCase(), false);
    });

}

function draw() {
  background(200);
  if (!freeze) {
    img.loadPixels();
    obstacles = [];
    processVideo();
  } else {
    image(staticImage, 0, 0, width, height);
    gold.draw();
  }
  player.update(obstacles);
  player.draw();
  if (checkCollision()) {
    playVictoryMusic();
  }
}

function preload() {
  victory = loadSound('https://lovemachinex.github.io/computational-art-spring2024/assignments/final/sound/victory.wav')
  jumpSound = loadSound('https://lovemachinex.github.io/computational-art-spring2024/assignments/final/sound/drum.wav');
}


function checkCollision() {
  return (player.x < gold.x + gold.width && player.x + player.width > gold.x &&
          player.y < gold.y + gold.height && player.y + player.height > gold.y);
}

function playVictoryMusic() {
  victory.play();
  setTimeout(function() {
    window.location.reload();  
  }, 5000);
}

function processVideo() {
  background(0, 0, 0, 10);
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let avg = (r + g + b) / 3;

      let threshold = 128;
      let fillCol = avg < threshold ? 255 : 0;
      fill(fillCol);
      if (fillCol === 0) {
        obstacles.push({ x: x * 30, y: y * 30 });
      }

      let xPos = x * 30; // Position squares based on grid without oscillation
      let yPos = y * 30; // Position squares based on grid without oscillation
      square(xPos, yPos, 30);
    }
  }
}

function toggleFreeze() {
  freeze = !freeze;
  if (freeze) {
      staticImage = get();  // Capture the current canvas as the static image
      gold.placeRandomly(obstacles, width, height); // Place gold square randomly on freeze
  }
}

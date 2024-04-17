let synth, drum, reverb;
let scale;
let circles = [];

function preload() {
  drum = loadSound('https://lovemachinex.github.io/computational-art-spring2024/assignments/08_sound/samples/drum.wav');
}

function setup() {
  createCanvas(800, 600);
  synth = new p5.PolySynth();
  reverb = new p5.Reverb();

  // Connect reverb to synth with 3 seconds decay at a reverb level of 2%
  reverb.process(synth, 3, 2);
  scale = scales['natural minor'].map(x => midiToFreq(60 + x)); // C natural minor

  // Create circles with initial random positions and velocities
  for (let i = 0; i < 5; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: 30,
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }
}

function draw() {
  background(30);

  // Draw and move circles
  for (let circle of circles) {
    fill(255, 100, 100, 150);
    noStroke();
    ellipse(circle.x, circle.y, circle.size * 2);

    // Update position
    circle.x += circle.vx;
    circle.y += circle.vy;

    // Reflect off edges
    if (circle.x < 0 || circle.x > width) circle.vx *= -1;
    if (circle.y < 0 || circle.y > height) circle.vy *= -1;

    // Check for collisions
    for (let other of circles) {
      if (other !== circle && dist(circle.x, circle.y, other.x, other.y) < circle.size + other.size) {
        handleCollision(circle, other);
      }
    }
  }
}

function mouseClicked() {
  let note = random(scale);
  synth.play(note, 0.5, 0, 0.2); // Play a random note from the scale when clicked
  drum.play(); // Play the drum sample on click
}

function handleCollision(circle1, circle2) {
  // Play a random scale note when circles collide
  if (!circle1.colliding && !circle2.colliding) {
    let note = random(scale);
    synth.play(note, 0.5, 0, 0.5);
    circle1.colliding = circle2.colliding = true; // Prevent continuous playing while touching
    setTimeout(() => { circle1.colliding = circle2.colliding = false; }, 500); // Reset collision state
  }
}

// Define the Boid class
class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  // Add cohesion and separation methods here following a similar pattern to align

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration.add(alignment);
    // Add cohesion and separation forces to acceleration
  }
}

//Define Predator class
class Predator {
  constructor(x, y) {
    this.position = createVector(x || random(width), y || random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxSpeed = 6;
    this.maxForce = 0.5;
    this.lastMealTime = millis();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    let theta = this.velocity.heading() + radians(90); // Calculate the orientation of the predator
    fill(255, 0, 0); // Fill color for the predator
    stroke(255, 0, 0); // Border color for the predator
    strokeWeight(1);
    push(); // Start a new drawing state
    translate(this.position.x, this.position.y); // Move to the predator's position
    rotate(theta); // Rotate to the predator's heading
    beginShape();
    // Draw an isosceles triangle with a longer hypotenuse and a shorter base
    vertex(0, -10); // Point of the triangle
    vertex(-5, 10); // Base left vertex
    vertex(5, 10); // Base right vertex
    endShape(CLOSE); // Complete the shape
    pop(); // Restore original state
  }

  seek(target) {
    let desired = p5.Vector.sub(target.position, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  eat(flock) {
    for (let i = flock.boids.length - 1; i >= 0; i--) {
      let boid = flock.boids[i];
      let d = this.position.dist(boid.position);
      if (d < 10) { // If close enough to eat
        flock.boids.splice(i, 1); // Remove the boid from the flock
        return true; // Indicate that the predator has eaten
      }
    }
    return false; // No boid was eaten
  }

  hunt(flock) {
    if (flock.boids.length > 0) {
      let target = random(flock.boids); // Randomly selects one of the boids to chase
      let steeringForce = this.seek(target);
      this.acceleration.add(steeringForce);
    }
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}

// Define the Flock class
class Flock {
  constructor() {
    this.boids = [];
  }

  addBoid(boid) {
    this.boids.push(boid);
  }

  run() {
    for (let boid of this.boids) {
      boid.flock(this.boids);
      boid.update();
      boid.edges();
      boid.show();
    }
  }
}

let flock;
let predators = [];

function setup() {
  createCanvas(640, 360);
  flock = new Flock();
  for (let i = 0; i < 100; i++) {
    let boid = new Boid();
    flock.addBoid(boid);
  }
}

function draw() {
  background(51);
  flock.run();

  for (let i = predators.length - 1; i >= 0; i--) {
    let predator = predators[i];
    predator.hunt(flock); // Predator hunts a boid
    let eaten = predator.eat(flock);
  }

  for (let i = predators.length - 1; i >= 0; i--) {
    let predator = predators[i];
    let eaten = predator.eat(flock); // Check if the predator eats a boid
    if (eaten) {
      predator.lastMealTime = millis(); // Reset the timer on a successful eat
      // Reproduce a new predator at the position of the eaten boid
      predators.push(new Predator(predator.position.x, predator.position.y));
    }
    else if (millis() - predator.lastMealTime > 15000) { // 15 seconds without eating
      // Predator "dies" and is removed
      predators.splice(i, 1);

      // Replace the predator with three new boids at its position
      for (let n = 0; n < 3; n++) {
        flock.addBoid(new Boid(predator.position.x, predator.position.y));
      }
      continue; // Move to the next predator (if any)
    }
    predator.update();
    predator.edges();
    predator.show();
  }
}

// Add mousePressed function to add new predactor
function mousePressed() {
  predators.push(new Predator(mouseX,mouseY));
}
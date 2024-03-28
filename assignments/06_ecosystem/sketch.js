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

    this.eatenRecently = false; 
    this.seekingMate = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  show() {
    let theta = this.velocity.heading() + radians(90); 
    fill(255, 0, 0); 
    stroke(255, 0, 0); 
    strokeWeight(1);
    push(); 
    translate(this.position.x, this.position.y); 
    rotate(theta); 
    beginShape();
    vertex(0, -10); 
    vertex(-5, 10); 
    vertex(5, 10); 
    endShape(CLOSE); 
    pop(); 
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
        this.eatenRecently = true;
        this.seekingMate = true; // After eating, the predator seeks a mate
        return true;
      }
    }
    return false; // No boid was eaten
  }

  seekMate(predators) {
    if (this.seekingMate) {
      let closest = null;
      let closestD = Infinity;
      for (let predator of predators) {
        if (predator !== this && predator.eatenRecently) {
          let d = this.position.dist(predator.position);
          if (d < closestD) {
            closest = predator;
            closestD = d;
          }
        }
      }
      if (closest) {
        return this.seek(closest);
      }
    }
    return createVector(0, 0); 
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

  for (let i = 0; i < predators.length; i++) {
    let predator = predators[i];
    predator.update();
    predator.edges();

    if (predator.eatenRecently) {
      let force = predator.seekMate(predators); // Seek a mate
      predator.applyForce(force);
    } else {
      predator.hunt(flock); // Hunt if not seeking a mate
    }

    let eaten = predator.eat(flock);
    if (eaten) {
      setTimeout(() => predator.eatenRecently = false, 5000); // Resets eating behavior after 5 seconds
    }

    // Check for predator mating
    for (let j = i + 1; j < predators.length; j++) {
      let otherPredator = predators[j];
      if (predator.position.dist(otherPredator.position) < 10 && predator.eatenRecently && otherPredator.eatenRecently) {
        predators.push(new Predator((predator.position.x + otherPredator.position.x) / 2, (predator.position.y + otherPredator.position.y) / 2)); // Spawn a new predator at their meeting point
        predator.eatenRecently = false; // Reset their states
        otherPredator.eatenRecently = false;
      }
    }

    predator.show();
  }


  for (let i = predators.length - 1; i >= 0; i--) {
    let predator = predators[i];
    predator.hunt(flock);
    let eaten = predator.eat(flock); // Check if the predator eats a boid
    if (eaten) {
      predator.lastMealTime = millis(); // Reset the timer on a successful eat
    }
    else if (millis() - predator.lastMealTime > 15000) { // 15 seconds without eating
      // Predator "dies" 
      predators.splice(i, 1);

      // Replace the predator with three new boids at its position
      for (let n = 0; n < 3; n++) {
        flock.addBoid(new Boid(predator.position.x, predator.position.y));
      }
      continue; 
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
class Particle {
  constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(random(-1, 1), random(-2, -1));
      this.acc = createVector(0, 0);
      this.lifetime = 255; // Use alpha for lifetime to fade out
      this.size = random(4, 10);
  }

  applyForce(force) {
      this.acc.add(force);
  }

  update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); // Reset acceleration each frame
      this.lifetime -= 1; // Decrease the lifetime to fade the particle
      this.vel.mult(0.95); // Simulate air resistance by slightly reducing velocity over time
  }

  show() {
      noStroke();
      fill(255, this.lifetime); 
      ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
      return this.lifetime < 0;
  }
}

class ParticleSystem {
  constructor(offsetX, offsetY) {
      this.offset = createVector(offsetX, offsetY); // Offset from the mouse position
      this.particles = [];
  }

  addParticle() {
      // Calculate the emission point based on mouse position and offset
      let emitX = mouseX + this.offset.x;
      let emitY = mouseY + this.offset.y;
      this.particles.push(new Particle(emitX, emitY));
  }

  update() {
      this.addParticle(); // Continuously add particles

      for (let i = this.particles.length - 1; i >= 0; i--) {
          let p = this.particles[i];
          p.applyForce(createVector(0, -0.05)); // Slight upward force
          p.update();
          if (p.isDead()) {
              this.particles.splice(i, 1);
          }
      }
  }

  show() {
      for (let p of this.particles) {
          p.show();
      }
  }
}

// sketch.js
let smokeSystem;

function setup() {
    createCanvas(600, 400);
    // Initialize the particle system with an offset for the smoke emission
    smokeSystem = new ParticleSystem(20, -10); 
}

function draw() {
    background(0);
    drawPipe();
    smokeSystem.update();
    smokeSystem.show();
}

function drawPipe() {
    // Pipe dimensions and position
    let pipeLength = 60;
    let pipeHeight = 20;
    let pipeX = mouseX;
    let pipeY = mouseY;

    // Draw the pipe
    fill(150);
    noStroke();
    rect(pipeX, pipeY, pipeLength, pipeHeight); // Main pipe body
    rect(pipeX + pipeLength, pipeY + 5, 20, 10); // Pipe's end
}


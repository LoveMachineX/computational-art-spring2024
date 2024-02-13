class Ball {
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(1, 3)); 
    this.r = r;
    this.m = r * 0.1; 
    this.gravity = new p5.Vector(0, 0.2 * this.m); 
  }

  update() {
    this.velocity.add(this.gravity); 
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    if (this.position.x > width - this.r || this.position.x < this.r) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height - this.r) {
      this.velocity.y *= -1;
      this.position.y = height - this.r;
    }
  }

  display() {
    noStroke();
    fill(204);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}

class Cup {
  constructor(x, y, w, h) {
    this.position = new p5.Vector(x, y);
    this.w = w;
    this.h = h;
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  contains(ball) {
    return ball.position.x > this.position.x - this.w / 2 &&
           ball.position.x < this.position.x + this.w / 2 &&
           ball.position.y + ball.r > this.position.y - this.h / 2 &&
           ball.position.y - ball.r < this.position.y + this.h / 2;
  }
}

let balls = [];
let cup;
let spawnRate = 60; 

function setup() {
  createCanvas(710, 400);
  cup = new Cup(width / 2, height - 20, 100, 50);
}

function draw() {
  background(51);

  
  if (frameCount % spawnRate == 0) {
    balls.push(new Ball(random(width), 0, random(20, 50)));
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    b.update();
    b.checkBoundaryCollision();
    b.display();
    
    
    if (cup.contains(b)) {
      balls.splice(i, 1);
    }
  }

  
  cup.position.x = mouseX;
  cup.display();
}

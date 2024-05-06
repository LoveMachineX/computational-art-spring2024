class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 0; // Vertical speed
        this.speedX = 0;
        this.collided = false; // Collision state
        this.windForce = 0;
        this.windDirection = 1;  // 1 for right, -1 for left
        this.windChangeTimer = 0;
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.gravity = 0.5;
        this.maxFallSpeed = 10;
    }

    draw() {
        fill(255, 0, 0);
        noStroke();
        square(this.x, this.y, 30);
    }

    update(obstacles) {
        this.applyWind();
        this.x += this.speedX;

        if (this.movingUp && !this.collided && this.jumpCount < 2) {
            this.jump();
        }
        if (this.movingDown && !this.collision(this.x, this.y + 1, obstacles)) {
            this.y += 5;
        }
        if (this.movingLeft && !this.collision(this.x - 1, this.y, obstacles)) {
            this.x -= 5;
        }
        if (this.movingRight && !this.collision(this.x + 1, this.y, obstacles)) {
            this.x += 5;
        }
        this.manageJumpCooldown();
        this.applyGravity(obstacles);
    }

    jump() {
        this.speedY = -10; 
        this.jumpCount++;
        this.jumpCooldown = 180;  
    }

    manageJumpCooldown() {
        if (this.jumpCooldown > 0) {
            this.jumpCooldown--;
        } else {
            this.jumpCount = 0;  
        }
    }

    applyWind() {
        if (this.windChangeTimer <= 0) {
            this.windDirection *= -1;  // Change wind direction
            this.windForce = 0;  // Reset wind force to simulate gradual increase
            this.windChangeTimer = 900;  // Reset timer (15 seconds at 60 fps)
        } else {
            this.windForce = min(this.windForce + 0.01, 2);  // Gradually increase force to a max
            this.windChangeTimer--;
        }
        this.speedX = this.windForce * this.windDirection;
    }


    applyGravity(obstacles) {
        this.y += this.speedY;
        this.speedY += this.gravity;
        if (this.collision(this.x, this.y, obstacles)) {
            this.collided = true;
            this.speedY = 0;
        } else {
            this.collided = false;
        }
    }

    collision(x, y, obstacles) {
        for (let obstacle of obstacles) {
            if (x + 30 > obstacle.x && x < obstacle.x + 30 && y + 30 > obstacle.y && y < obstacle.y + 30) {
              return true; // Collision detected if any part of the red square overlaps with a black square
            }
          }
          if (y + 30 > height || y < 0 || x < 0 || x + 30 > width) {
            return true; // Boundary collision
          }
          return false;
    }

    setMovement(key, isPressing) {
        switch (key) {
            case 'w': this.movingUp = isPressing; break;
            case 's': this.movingDown = isPressing; break;
            case 'a': this.movingLeft = isPressing; break;
            case 'd': this.movingRight = isPressing; break;
        }
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 0; // Vertical speed
        this.collided = false; // Collision state
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
        if (this.movingUp && !this.collided) {
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

        this.applyGravity(obstacles);
    }

    jump() {
        if (!this.collided) {
            this.speedY = -10;  
            if (jumpSound.isLoaded()) {
                jumpSound.play();  
            }
        }
    }

    


    applyGravity(obstacles) {
        this.y += this.speedY;
        this.speedY += this.gravity;
        if (this.collision(this.x, this.y, obstacles)) {
            while (this.collision(this.x, this.y, obstacles)) {
                this.y -= Math.sign(this.speedY); // Adjust to not overlap
            }
            this.speedY = 0;
            this.collided = true;
        } else {
            this.collided = false;
        }
        this.speedY = Math.min(this.speedY, this.maxFallSpeed);
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

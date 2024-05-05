class Gold {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }

    // Method to place the Gold square randomly on the canvas where there are no obstacles
    placeRandomly(obstacles, canvasWidth, canvasHeight) {
        let placed = false;
        while (!placed) {
            this.x = Math.floor(Math.random() * (canvasWidth - this.width));
            this.y = Math.floor(Math.random() * (canvasHeight - this.height));
            
            if (!this.collides(obstacles)) {
                placed = true;
            }
        }
    }

    // Method to check collision with any given obstacles
    collides(obstacles) {
        for (let obstacle of obstacles) {
            if (this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height && this.y + this.height > obstacle.y) {
                return true;
            }
        }
        return false;
    }

    // Method to draw the square on the canvas
    draw() {
        fill(255, 215, 0); // Gold color
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
}

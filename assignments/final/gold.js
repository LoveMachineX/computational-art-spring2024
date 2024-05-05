class Gold {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;

    }

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

    collides(obstacles) {
        for (let obstacle of obstacles) {
            if (this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height && this.y + this.height > obstacle.y) {
                return true;
            }
        }
        return false;
    }

    draw() {
        if (this.visible){
            fill(255, 215, 0); 
            noStroke();
            rect(this.x, this.y, this.width, this.height);
        }
    }


}

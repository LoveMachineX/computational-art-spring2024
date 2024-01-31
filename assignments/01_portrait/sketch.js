let thing, thing2, squareThing, triangleThing;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);

  
  circle1 = new Thing(100, 100, "circle");
  circle2 = new Thing(200, 200, "circle");
  Square = new Thing(150, 200, "square");
  Triangle = new Thing(100, 400, "triangle");
}

function draw() {
  background(0, 0, 100);

  circle1.update();
  circle2.update();
  Square.update();
  Triangle.update();
}

class Thing {
  constructor(x, y, shape) {
    this.hue = 0;
    this.shape = shape;

    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
  }

  update() {
    let saturation = mouseX / width * 100;
    fill(this.hue % 360, saturation, 100);

    switch(this.shape) {
      case "circle":
        circle(this.position.x, this.position.y, 100);
        break;
      case "square":
        square(this.position.x - 50, this.position.y - 50, 100);
        break;
      case "triangle":
        triangle(this.position.x, this.position.y - 50, 
                 this.position.x - 50, this.position.y + 50, 
                 this.position.x + 50, this.position.y + 50);
        break;
    }
  }
}
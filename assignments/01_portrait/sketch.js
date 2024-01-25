let thing;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);

  thing = new Thing(100, 100);
  thing2 = new Thing(200, 200)
}

function draw() {
  background(0, 0, 100);

  thing.update();
  thing2.update2();
}


class Thing {
  constructor(x, y) {
    this.hue = 0;

    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
  }

  update() {

    this.hue += 5; // hue = hue + 1;
    let saturation = mouseX / width * 100;
  
    fill(this.hue % 360, saturation, 100);
    circle(this.position.x, this.position.y, 100);
  }

  update2(){
    this.hue += 3; // hue = hue + 1;
    let saturation = mouseX / width * 100;
  
    fill(this.hue % 360, saturation, 100);
    circle(this.position.x, this.position.y, 100);
  }
}
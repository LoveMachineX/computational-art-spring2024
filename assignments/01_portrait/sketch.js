let hue = 0;
let x;
let y;

function setup() {
  createCanvas(400, 300);
  
  x= width/2;
  y = height/2;
  
  colorMode(HSB);
}

function draw() {
  background (0, 0, 100);
  hue += 5; //hue = hue + 1;
  let saturation = mouseX / width * 100;
  
  fill(hue % 360, saturation, 100);
  
  circle(x, y, 100);
}

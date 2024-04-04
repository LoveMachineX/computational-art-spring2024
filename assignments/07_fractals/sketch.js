let angleOffset = 0;

function setup() {
  createCanvas(400, 400);
  noFill();
  colorMode(HSB, 360, 100, 100); 
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  rotate(angleOffset);
  drawCircle(0, 0, 200, 0);
  angleOffset += 0.01; 
}

function drawCircle(x, y, radius, depth) {
  let hue = (frameCount + depth * 10) % 360; 
  stroke(hue, 100, 100); 
  
  ellipse(x, y, radius * 2);
  
  if(radius > 8) {
    let newDepth = depth + 1;
    
    let rotationAmount = (depth % 2 === 0) ? -0.05 : 0.05;
    
    push();
    rotate(rotationAmount);
    
    drawCircle(x + radius / 2, y, radius / 2, newDepth);
    drawCircle(x - radius / 2, y, radius / 2, newDepth);
    drawCircle(x, y - radius / 2, radius / 2, newDepth);
    drawCircle(x, y + radius / 2, radius / 2, newDepth);
    pop();
  }
}

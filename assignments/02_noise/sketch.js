function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(360);
  let c = map(mouseX, 0, width, 0, 360);
  fill(255, c, 0);
  ellipse(mouseX, mouseY, 100, 100);
  
  let xoff = mouseX * 0.01;
  for(let i = 0; i < 100; i ++){
    let x = map(i,0,100,0,width);
    let hue = map(i, 0, 100, 0, 360);
    let tallness = map(noise(xoff), 0, 1, 10, 300);
    
    fill(hue, 80, 100);
    ellipse(x, height/2, width/100, tallness);
    
    xoff += 0.1;
  }
}
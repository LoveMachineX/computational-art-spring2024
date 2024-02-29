function setup() {
  createCanvas(400, 400);
  noiseDetail(24); 
}

function draw() {
  background(220);
  let grid = 10; 
  let cell = width / grid;
  
  for (let x = 0; x < grid; x++) {
    for (let y = 0; y < grid; y++) {
      
      let noiseScale = 0.05; 
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      
      
      let dynamicSize = sin(frameCount * 0.1 + noiseVal * PI) * 25 + 50;
      
      // Calculate position
      let posX = x * cell + cell / 2;
      let posY = y * cell + cell / 2;
      fill(255,dynamicSize);
      
      rect(posX, posY, dynamicSize, dynamicSize);
    }
  }
  
}

function setup() {
  createCanvas(400, 400);
  noiseDetail(24); 
}

function draw() {
  background(220);
  let gridSize = 10; 
  let cellSize = width / gridSize;
  
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      
      let noiseScale = 0.05; 
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      
      
      let dynamicSize = sin(frameCount * 0.1 + noiseVal * PI) * 25 + 50;
      
      // Calculate position
      let posX = x * cellSize + cellSize / 2;
      let posY = y * cellSize + cellSize / 2;
      fill(255,dynamicSize);
      
      rect(posX, posY, dynamicSize, dynamicSize);
    }
  }
  
}

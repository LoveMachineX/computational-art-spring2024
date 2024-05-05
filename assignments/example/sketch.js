let grid = [];
let cellCountX = 10;
let cellCountY =10;



function setup(){
    createCanvas(600,400);
    colorMode(HSB);

    for (let x = 0; x < cellCountX; x++){
        grid[x] = [];
        for(let y = 0; y < cellCountY; y++){
            grid[x][y] = new Cell(x, y, random() < 0.5);
        }
    }
}

function draw(){
    background(0,0,100);
}
class Cell{
    constructor(indexX, indexY){
            this.indexX = indexX;
            this.indexY = indexY;

            this.alive = alive;
    }

    show(){
        if(this.alive){
            fill(0,0, 100);
        }
        else {
            fill(0,0,0);
        }

        let x = this.indexX * cellWidth;
        let y = this.indexY * cellHeight

    }
}
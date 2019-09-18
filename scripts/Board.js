class Board {
   constructor (boardArray) {
     this.array = boardArray;
     this.blocks = [[],[],[],[],[],[],[],[],[],[]];
  }

  populate() {
    this.clear();
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        let block;
        if (this.array[i][j] == 1) {
          block = new Block(i+""+j, j, i, "regular");
        } else if (this.array[i][j] == 0){
          block = new Block(i+""+j, j, i, "dead");
        } else if (this.array[i][j] == 2) {
          block = new Block(i+""+j, j, i, "goal");
        } else if (this.array[i][j] == 3) {
          block = new Block(i+""+j, j, i, "regular");
          playerStartPosition = new Position(i,j,null);
          if (i != 0){
            if (this.array[i-1][j] == 4) {
              playerStartPosition = new Position(i,j,"N");
            }
          }
          if (j != 0) {
            if (this.array[i][j-1] == 4) {
              playerStartPosition = new Position(i,j,"W");
            }
          }
        } else {
          block = new Block(i+""+j, j, i, "regular");
        }
        this.blocks[i][j] = block;
      }
    }
  }

  clear() {
    this.blocks = [[],[],[],[],[],[],[],[],[],[]];
    while (this.getView().hasChildNodes()) {
      this.getView().removeChild(this.getView().firstChild);
    }
  }

  display() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        let block = this.blocks[i][j];
        block.displayAsChildOf(this.getView());
      }
    }
  }

  getView(){
    return document.getElementById("playArea");
  }
}

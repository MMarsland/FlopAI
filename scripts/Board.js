class Board {
   constructor (boardArray) {
     this.array = boardArray;
     this.blocks = [[],[],[],[],[],[],[],[],[],[]];
  }

  populate() {
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
          playerStartLocation = [i,j];
        }
        this.blocks[i][j] = block;
      }
    }
  }

  clear() {
    this.blocks = [];
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
    return document.getElementById("board");
  }
}

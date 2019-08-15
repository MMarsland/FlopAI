class Board {
   constructor (boardArray) {
     this.array = boardArray;
     this.blocks = [];
  }

  populate() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        let block;
        if (this.array[i][j] == 1) {
          block = new Block(i+""+j, j, i, "regular");
        } else if (this.array[i][j] == 0){
          block = new Block(i+""+j, j, i, "dead");
        } else if (this.array[i][j] == -1) {
          block = new Block(i+""+j, j, i, "goal");
        } else if (this.array[i][j] == 5) {
          block = new Block(i+""+j, j, i, "regular");
          playerStartLocation = [i,j];
        }
        this.blocks.push(block);
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
    for (let blockIndex in this.blocks) { let block = this.blocks[blockIndex];
      block.displayAsChildOf(this.getView());
    }

  }

  getView(){
    return document.getElementById("board");
  }
}

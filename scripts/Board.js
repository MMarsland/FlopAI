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
        } else {
          block = new Block(i+""+j, j, i, "goal");
        }
        this.blocks.push(block);
      }
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

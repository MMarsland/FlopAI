class Map {
  constructor(mapArray, name) {
    this.array = mapArray;
    this.playerStartPosition;
    this.goalId;
    if (name == undefined) {
      name = Map.getNewName();
    }
    this.name = name;
    this.init();
  }

  init() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        if (this.array[i][j] == 2) {
            this.goalId = i+""+j;
        } else if (this.array[i][j] == 3) {
          this.playerStartPosition = new Position(i,j,null);
          if (i != 0){
            if (this.array[i-1][j] == 4) {
              this.playerStartPosition = new Position(i,j,"N");
            }
          }
          if (j != 0) {
            if (this.array[i][j-1] == 4) {
              this.playerStartPosition = new Position(i,j,"W");
            }
          }
        }
      }
    }
  }

  static getNewName() {
    let i=0;
    while (mapManager.hasOwnProperty(i)) {
      i++;
    }
    this.name = i;
  }

  getMapText() {
    return (new Matrix(this.array)).toString();
  }
}

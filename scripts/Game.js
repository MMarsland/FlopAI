class Game {
  constructor () {
    this.board;
    this.player;
    this.moveNum = 0;
  }

  selectLevel(levelNumber) {
    // TEMP: Until the new map system is implemented
    let mapArray;
    let maps = [mapAI1, mapAI2, map3, map4, map5];
    if (levelNumber >= 1 || levelNumber <= 5) {
      mapArray = maps [levelNumber -1];
    } else {
      mapArray = mapAI1;
    }
    //Start the map
    this.startLevel(new Map(mapArray));
  }

  startLevel(map) {
    console.log("Loading Map");
    this.board = new Board(map);
    this.board.populate();
    this.board.display();
    this.player = new Player(map.playerStartPosition.x, map.playerStartPosition.y, map.playerStartPosition.direction.name);
    this.player.display();
    app.changeViewTo("board");
    this.reset();
  }

  reset() {
    this.player.erase();
    this.player = new Player(this.board.map.playerStartPosition.x,this.board.map.playerStartPosition.y,this.board.map.playerStartPosition.direction.name);
    this.player.display();
    app.changeViewTo("board");
    this.moveNum = 0;
    app.updateSidebar();
  }

  victory() {
    ai.running = false;
    // Update Victory display with move number
    document.getElementById("victoryMoveNum").innerHTML = ("Moves: "+this.moveNum);
    app.changeViewTo("victory");
  }
}

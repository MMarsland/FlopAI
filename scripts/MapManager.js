class MapManager {
  constructor() {
    this.maps = new Object({length: 0,});
    this.editing = false;
    this.placingGoal = false;
    this.placingPlayer = false;
    this.testPlayer;
  }

  clickBlock(event) {
    event.preventDefault();
    if(this.editing) {
      if (this.placingGoal) {
        if ( !(event.target.classList.contains("player") || event.target.classList.contains("playerSecond")) ) {
          event.target.classList.remove("dead");
          event.target.classList.add("regular", "goal");
          document.getElementById("playArea").classList.remove("placingGoal");
          this.placingGoal = false;
          this.updateMap("goal");
        }
      } else if (this.placingPlayer) {
        if (!event.target.classList.contains("goal")) {
          event.target.classList.remove("dead");
          event.target.classList.add("regular", "player");
          document.getElementById("playArea").classList.remove("placingPlayer");
          this.placingPlayer = false;
          this.updateMap("player");
        }
      } else if (event.target.classList.contains("player")) {
        this.movePlayer(event);
      } else if (event.target.classList.contains("playerSecond")) {
      } else if (event.target.classList.contains("goal")) {
        this.moveGoal(event);
      } else if (event.target.classList.contains("regular")) {
        event.target.classList.remove("regular");
        event.target.classList.add("dead");
      } else {
        event.target.classList.remove("dead");
        event.target.classList.add("regular");
      }
    }
  }

  specialBlock(event) {
    event.preventDefault();
    if(this.editing) {


    }
  }

  getMapArray() {
    var mapArray = [[],[],[],[],[],[],[],[],[],[]];
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        let blockId = i+""+j;
        let block = document.getElementById(blockId);
        if (block.classList.contains("player")) {
          mapArray[i][j] = 3;
        } else if (block.classList.contains("playerSecond")) {
          mapArray[i][j] = 4;
        } else if (block.classList.contains("goal")) {
          mapArray[i][j] = 2;
        } else if (block.classList.contains("regular")) {
          mapArray[i][j] = 1;
        } else {
          mapArray[i][j] = 0;
        }
      }
    }
    return mapArray;
  }

  saveMap() {
    //Make maps a dictionary!
    let map = new Map(this.getMapArray());
  }

  downloadMap(mapArray) {
    // Saves a map array
    let mapText = "[";
    for (let i=0; i<10; i++) {
      mapText += "[";
      for (let j=0; j<10; j++) {
        mapText += mapArray[i][j] + "";
        mapText += (j==9)? "" : ",";
      }
      mapText += (i==9)? "]" : "],\n";
    }
    mapText += "];";
    console.log(mapText);
    download("map", mapText);
  }

  editSave() {
    if (this.editing) {
      this.save();
    } else {
      this.edit();
    }
  }

  edit() {
    document.getElementById("editSave").innerHTML = "Save";
    document.getElementById("editSave").setAttribute("onClick", "mapManager.save()");
    document.getElementById("playArea").classList.add("editing");
    //document.getElementsByClassName("editButtons")[0].classList.remove("hidden");
    //document.getElementsByClassName("editButtons")[1].classList.remove("hidden");
    this.editing = true;
  }

  save() {
    document.getElementById("editSave").innerHTML = "Edit";
    document.getElementById("editSave").setAttribute("onclick", "mapManager.edit()");
    document.getElementById("playArea").classList.remove("editing");
    //document.getElementsByClassName("editButtons")[0].classList.add("hidden");
    //document.getElementsByClassName("editButtons")[1].classList.add("hidden");
    this.editing = false;
  }

  movePlayer(event) {
    if (game.player.position.direction.getNumber() == 0) {
      let block = event.target;
      block.classList.remove("player");
      this.placingPlayer = true;
      document.getElementById("playArea").classList.add("placingPlayer");
    }
  }

  moveGoal(event) {
    let block = event.target;
    block.classList.remove("goal");
    this.placingGoal = true;
    document.getElementById("playArea").classList.add("placingGoal");
  }

  updateMap(type) {
    game.board.map = new Map(this.getMapArray());
    console.log("Setting new Player");
    this.testPlayer = new Player(game.board.map.playerStartPosition.x, game.board.map.playerStartPosition.y, game.board.map.playerStartPosition.direction.name);
    game.player = this.testPlayer;
  }
}

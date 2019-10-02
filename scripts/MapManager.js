class MapManager {
  constructor() {
    this.maps = [];

  }

  activateBlock(event) {
    event.preventDefault();
    event.target.classList.remove("regular");
    event.target.classList.add("dead");
  }

  killBlock(event) {
    event.preventDefault();
    event.target.classList.remove("dead");
    event.target.classList.add("regular");
  }

  getMapArray() {
    let playerPos = game.player.getLocationId(0,0);
    var mapArray = [[],[],[],[],[],[],[],[],[],[]];
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        let blockId = i+""+j;
        let style = document.getElementById(blockId).classList[1];
        if (playerPos == blockId)
        {
          mapArray[i][j] = 3;
        } else {
          switch (style) {
            case "regular":
              mapArray[i][j] = 1;
              break;
            case "dead":
              mapArray[i][j] = 0;
              break;
            case "goal":
              mapArray[i][j] = 2;
              break;
            default:
              console.log("ERROR!!!");
              alert("ERROR!!!");
              break;
          }
        }
      }
    }
    return mapArray;
  }

  saveMap() {
    //Make maps a dictionary!
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
}

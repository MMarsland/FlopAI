let board;
let player;
let goalId;
let map;
let level;
let playerStartLocation;
let currentView = "home";

function reset() {
  player.erase();
  player = new Player(playerStartLocation[0],playerStartLocation[1], new Direction(null));
  player.display();
  changeViewTo("board");
}

function back() {
  // Back to home
  changeViewTo("home");
  board.clear();
}
/*
function changeColor(event) {
  event.preventDefault();
  event.target.classList.remove("regular");
  event.target.classList.add("dead");
}

function changeColorBack(event) {
  event.preventDefault();
  event.target.classList.remove("dead");
  event.target.classList.add("regular");
}
*/
function changeViewTo(viewName) {
  switch (viewName) {
    case "home":
      reset();
      getVictoryView().classList.add("hidden");
      getBoardView().classList.add("hidden");
      getHomeView().classList.remove("hidden");
      currentView = "home";
      break;
    case "board":
      getVictoryView().classList.add("hidden");
      getHomeView().classList.add("hidden");
      getBoardView().classList.remove("hidden");
      currentView = "board";
      break;
    case "victory":
      getBoardView().classList.add("hidden");
      getHomeView().classList.add("hidden");
      getVictoryView().classList.remove("hidden");
      currentView = "victory";
      break;
    default:
      console.log("ERROR!");
      alert("ERROR!");
      break;
  }
}

function getBoardView() {
  return document.getElementById("board");
}

function getHomeView() {
  return document.getElementById("home");
}

function getVictoryView() {
  return document.getElementById("victory");
}

function victory() {
  changeViewTo("victory");
}

function selectLevel(level) {
  switch(level)
  {
    case 2:
      map = map2;
      break;
    case 3:
      map = map3;
      break;
    case 4:
      map = map4;
      break;
    case 5:
      map = map5;
      break;
    default:
      map = map1;
  }

  console.log("Loading");
  board = new Board(map);
  board.populate();
  board.display();
  player = new Player(playerStartLocation[0],playerStartLocation[1], new Direction(null));
  player.display();
  goalId = document.getElementsByClassName("goal")[0].getAttribute("id");
  changeViewTo("board");
}

function saveMap() {
  let playerPos = player.getLocationId(0,0);
  var mapText = "[";
  for (let i=0; i<10; i++) {
    mapText += "[";
    for (let j=0; j<10; j++) {
      let blockId = i+""+j;
      let style = document.getElementById(blockId).classList[1];
      console.log(style);
      if (playerPos == blockId)
      {
        mapText += "3";
      } else {
        console.log(style);
        console.log(board.blocks[i][j]);
        switch (style) {
          case "regular":
            mapText += "1";
            break;
          case "dead":
            mapText += "0";
            break;
          case "goal":
            mapText += "2";
            break;
          default:
            console.log("ERROR!!!");
            alert("ERROR!!!");
            break;
        }
      }
      mapText += (j==9)? "" : ",";
    }
    mapText += (i==9)? "]" : "],\n";
  }
  mapText += "];";
  console.log(mapText);
  //Save map to file?
}

function keyPressed(keyCode) {
  //comment
  console.log(keyCode);
  if (currentView != "home") {
    if (keyCode == 87 || keyCode == 38) {
      player.moveN();
    } else if (keyCode == 65 || keyCode == 37) {
      player.moveW();
    } else if (keyCode == 83 || keyCode == 40) {
      player.moveS();
    } else if (keyCode == 68 || keyCode == 39) {
      player.moveE();
    } else if (keyCode == 82) {
      reset();
    } else if (keyCode == 66) {
      back();
    } else if (keyCode == 77 && currentView == "board") {
      saveMap();
    }
    //console.log(player);
    //Check victory
    if (player.getLocationId(0,0) == goalId && player.direction.name() == null){
      victory();
    }
  }
}

document.onkeydown = function (e) {
    e = e || window.event;
    // use e.keyCode
    keyPressed(e.keyCode);
};

let board;
let player;
let goalId;
let map;
let level;
let playerStartLocation;
let currentView = "home";
let aIRunning = false;
let moveNum = 0;
let decodedMapDirections;

// Nural Network Functions
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function readBrain() {
  let input = document.getElementById("brainInput");
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(){
        decodeBrain(reader.result);
      };
      reader.readAsText(input.files[0]);
  }
}

function decodeBrain(text) {
  console.log(text);
}

async function runAI() {
  // Also Words
  console.log("Starting the AI");
  //Loop AI forever (Until victory)

  //Decode the map!
  console.log("Decoding the map!");
  decodedMapDirections = decode(getMapArray());
  console.log(decodedMapDirections);

  while(aIRunning) {
    // Decide On move
    let chosenMove = pickMove();
    // Make Move
    moveAI(chosenMove);
    // Wait for the right time
    await sleep(1);
    // Repeat
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function moveAI(direction) {
  console.log("Moving: "+direction);
  switch(direction) {
    case "N":
      player.move("N");
      break;
    case "E":
      player.move("E");
      break;
    case "S":
      player.move("S");
      break;
    case "W":
      player.move("W");
      break;
    default:
      console.log("ERROR!");
      alert("ERROR!");
      break;
  }
}

function pickMove() {
  // Words
  console.log("Selecting a move...");
  // Get Inputs
  // Use Nural Network to decide on move

  // Temporary (Just Move Randomly!)
  /*
  let moveInt = getRandInt(0,3);
  let direction;
  switch(moveInt) {
    case 0:
      direction = "N";
      break;
    case 1:
      direction = "E";
      break;
    case 2:
      direction = "S";
      break;
    case 3:
      direction = "W";
      break;
    default:
      console.log("ERROR!");
      alert("ERROR!");
      break;
  } */


  // TEMP 2: Use the Map Decoder to determine the best move based on current position!
  direction = getBestNextDirection(player.x_position, player.y_position, player.direction.getNumber());


  // Return Move
  return direction;
}

function getRandInt(min, max) {
    let realMax = max+1;
    var random = (Math.floor(Math.random() * (realMax-min)) + min);
    return random;
}

function getBestNextDirection(x,y,z) {
  let directions = decodedMapDirections;
  return directions[z][x][y];
}













// Display Functions
function updateSidebar() {
  // Update Move count
  document.getElementById("moveNum").innerHTML = ("Moves: "+moveNum);
}



// Regular Game Functions
function keyPressed(keyCode) {
  //comment
  //console.log(keyCode);
  if (keyCode == 87 || keyCode == 38 && currentView == "board") { // W
    player.move("N");
  } else if (keyCode == 65 || keyCode == 37 && currentView == "board") { // A
    player.move("W");
  } else if (keyCode == 83 || keyCode == 40 && currentView == "board") { // S
    player.move("S");
  } else if (keyCode == 68 || keyCode == 39 && currentView == "board") { // D
    player.move("E");
  } else if (keyCode == 82 && currentView != "home") { // R
    reset();
  } else if (keyCode == 66 && currentView != "home") { // B
    back();
  } else if (keyCode == 77 && currentView != "home") { // M
    saveMap(getMapArray());
  } else if (keyCode == 71 && currentView == "board") { // G
    if (!aIRunning) {
      aIRunning = true;
      runAI();
    } else {
      aIRunning = false;
    }
  }
}

function victory() {
  changeViewTo("victory");
  aIRunning = false;
  document.getElementById("victoryMoveNum").innerHTML = ("Moves: "+moveNum);
}

function reset() {
  player.erase();
  player = new Player(playerStartLocation[0],playerStartLocation[1], new Direction(null));
  player.display();
  changeViewTo("board");
  moveNum = 0;
  updateSidebar();
}

function back() {
  // Back to home
  changeViewTo("home");
  board.clear();
}

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

function selectLevel(level) {
  switch(level)
  {
    case 1:
      map = mapAI1;
      break;
    case 2:
      map = mapAI2;
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
  }

  console.log("Loading");
  board = new Board(map);
  board.populate();
  board.display();
  player = new Player(playerStartLocation[0], playerStartLocation[1], new Direction(null));
  player.display();
  goalId = document.getElementsByClassName("goal")[0].getAttribute("id");
  changeViewTo("board");
  reset();
}

document.onkeydown = function (e) {
    e = e || window.event;
    // use e.keyCode
    keyPressed(e.keyCode);
};

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

function getMapArray() {
  let playerPos = player.getLocationId(0,0);
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

function saveMap(mapArray) {
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

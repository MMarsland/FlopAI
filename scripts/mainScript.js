let board;
let player;
let goalId;
let map;
let names = map5;
let level;
let playerStartPosition;
let currentView = "home";
let aIRunning = false;
let moveNum = 0;
let decodedMapDirections;
let brain = new Brain();
let sessionName = "";
let gameSessionReady = false;
let smartMode = false;



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

function readGameFile() {
  let input = document.getElementById("gameFileInput");
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(){
        processGameFile(reader.result);
      };
      reader.readAsText(input.files[0]);
  }
}

function processGameFile(gameText) {
  brain.encodeBrain(gameText);
  readyGameSession();
}

async function runAI() {
  // Also Words
  console.log("Starting the AI");
  //Loop AI forever (Until victory)

  //Decode the map!
  console.log("Decoding the map!");
  decodedMapDirections = decode(getMapArray());
  console.log(decodedMapDirections);

  while(aIRunning && currentView == "board") {
    // Decide On move
    let chosenMove = pickMove();
    // Make Move
    moveAI(chosenMove);
    // Wait for the right time
    await sleep(100);
    // Repeat
  }
  aIRunning = false;
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

  if (smartMode) {
    // TEMP 2: Use the Map Decoder to determine the best move based on current position!
    direction = getBestNextDirection(player.position);
  } else {
    // Real : use the Nural Network to pick a direction
    direction = brain.getMove(brain.getOutputs(getInputs()));
  }





  // Return Move
  return direction;
}

function getRandInt(min, max) {
    let realMax = max+1;
    let random = (Math.floor(Math.random() * (realMax-min)) + min);
    return random;
}

function getRandPMNormal() {
  let random = (Math.random()*2 - 1);
  return random;
}

function getRandNormal() {
  let random = (Math.random());
  return random;
}

function getBestNextDirection(position) {
  let directions = decodedMapDirections;
  return directions[position.direction.getNumber()][position.x][position.y];
}

function copy1DArray(array) {
  let temp = [];
  for (let i=0;i<array.length;i++){
    temp[i] = array[i];
  }
  return temp;
}

// Display Functions
function updateSidebar() {
  // Update Move count
  document.getElementById("moveNum").innerHTML = ("Moves: "+moveNum);
  document.getElementById("brainName").innerHTML = "Name: "+brain.name;
  document.getElementById("brainTraits").innerHTML = "Traits: "+brain.traits;
}

// Regular Game Functions
document.onkeydown = function (e) {
    e = e || window.event;
    // use e.keyCode
    keyPressed(e.keyCode);
};

function keyPressed(keyCode) {
  //comment
  console.log(keyCode);
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
  } else if (keyCode == 66) { // B
    back();
  } else if (keyCode == 77 && currentView != "home") { // M
    saveMap(getMapArray());
  } else if (keyCode == 80 && currentView != "home") { // P
    saveGame();
  } else if (keyCode == 84 && currentView != "home") { // T
    testBrain(); // In Brain
  } else if (keyCode == 67 && currentView != "home") { // C "CheatMode"
    if (!smartMode) {
      smartMode = true;
    } else {
      smartMode = false;
    }
  } else if (keyCode == 89 && currentView != "home") { // Y
    brain.randomizeBrain();
    if (currentView == "board") {
        updateSidebar();
    }
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
  player = new Player(playerStartPosition.x,playerStartPosition.y,playerStartPosition.direction.name);
  player.display();
  changeViewTo("board");
  moveNum = 0;
  updateSidebar();
}

function back() {
  // Back to home
  //Find current getLocation and go back based on that
  // victory&board -> home -> welcome -> N/A
  changeViewTo(getBackView(currentView));
}

function getBackView(view) {
  let backView;
  if (view == "board" || view == "victory") {
    backView = "home";
  } else {
    backView = "welcome";
  }
  return backView;
}

function getView() {
  return currentView;
}

function changeViewTo(viewName) {
  // Add hidden to all views
  //Remove Hidden from desired view
  // set the currentView variable
  let frames = document.getElementsByClassName("frame");
  for (let i=0; i<frames.length; i++) { let frame = frames[i];
    frame.classList.add("hidden");
  }
  let view = document.getElementById(viewName);
  view.classList.remove("hidden");
  currentView = viewName;
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
  player = new Player(playerStartPosition.x,playerStartPosition.y,playerStartPosition.direction.name);
  player.display();
  goalId = document.getElementsByClassName("goal")[0].getAttribute("id");
  changeViewTo("board");
  reset();
}

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

function startDefault() {
  // Add more here later to upload defaults
  if (confirm("Are you sure you want to start a new game file?")) {
    brain.randomizeBrain();
    readyGameSession();
  }
}

function readyGameSession() {
  gameSessionReady = true;
  document.getElementById("play").classList.remove("disabledPlay");
  document.getElementById("play").classList.add("pulse");
}

function play() {
  if (gameSessionReady) {
    changeViewTo("home");
  }
}

function saveGame() {
  if (sessionName == "") {
    saveAs();
  } else {
    saveGameFile(sessionName);
  }
}

function saveAs() {
  let name = prompt("What would you like to save your game as?", "BestGame");
  if (name == null) { // Null or empty str
    return;
  }
  if (name == "") {
    name = "gameFile";
  }
  saveGameFile(name);
  sessionName = name;
}

function saveGameFile(name) {
  let text = "FlopAI Game File:\n"
  text += "Name: "+name+"\n";
  text += brain.getBrainText();
  download(name, text);
}

function getRandomName() {
  let nameKey = getRandInt(0, namesList.length-1);
  return namesList[nameKey];
}

function getRandomTrait() {
  let adjectiveKey = getRandInt(0, adjectivesList.length-1);
  let adj = adjectivesList[adjectiveKey]
  return adj.charAt(0).toUpperCase() + adj.slice(1);
}

function getRandomTraitsText() {
  let numTraits = getRandInt(1,3);
  let traits = "";
  for (let i=0;i<numTraits;i++) {
    traits += getRandomTrait() + ", ";
  }
  return traits.substring(0, traits.length-2);
}

function startUp() {
  readyGameSession(); // Initalize the game with a fresh start
}

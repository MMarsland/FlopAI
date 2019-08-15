let board;
let player;
let goalId;
let map;
let level;
let playerStartLocation;

function reset() {
  player.erase();
  player = new Player(playerStartLocation[0],playerStartLocation[1], new Direction(null));
  player.display();
  document.getElementById("victory").style.display = "none";
  board.getView().style.display = "block";
}

function back() {
  console.log("Hiding Victory");
  reset();
  board.getView().style.display = "none";
  document.getElementById("home").style.display = "flex";
  board.clear();
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

function keyPressed(keyCode) {
  //Comment
  //console.log(keyCode);
  if (keyCode == 119) {
    player.moveN();
  } else if (keyCode == 97) {
    player.moveW();
  } else if (keyCode == 115) {
    player.moveS();
  } else if (keyCode == 100) {
    player.moveE();
  } else if (keyCode == 114) {
    reset();
  } else if (keyCode == 98) {
    back();
  }
  //console.log(player);
  //Check victory
  if (player.getLocationId(0,0) == goalId && player.direction.name() == null){
    victory();
  }
}

document.onkeypress = function (e) {
    e = e || window.event;
    console.log("Pressed1");
    // use e.keyCode
    keyPressed(e.keyCode);
};


function victory() {
  board.getView().style.display = "none";
  document.getElementById("victory").style.display = "block";
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
  document.getElementById("home").style.display = "none";
  board.getView().style.display = "block";
}

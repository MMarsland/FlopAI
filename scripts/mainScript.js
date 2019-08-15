let board;
let player;
let goalId;

function main() {
  console.log("Loaded");
  board = new Board(mapArray);
  board.populate();
  board.display();

  player = new Player(9,9, new Direction(null));
  player.display();

  goalId = document.getElementsByClassName("goal")[0].getAttribute("id");
}

function reset() {
  player.erase();
  player = new Player(9,9, new Direction(null));
  player.display();
  document.getElementById("victory").style.display = "none";
  board.getView().style.display = "block";

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
  }
  console.log(player);
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

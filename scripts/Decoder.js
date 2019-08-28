// Puzzle Decoder functions
  // Assign Values
  // Repeat // Until all squares have a direction.
    // Assign Directions and Propagate Value
var pieces = [[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]]];
// Takes a blank map and returns a map of correct directions
var currentMapArray;
function decode(mapArray) {
  currentMapArray = mapArray;
  // Assign Values to all pieces
  for (let z=0; z<3; z++) {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        // Find Goal (Assign 1)
        if (z == 0) { // Up, North, East, South, West.
          // i.e. standing on goal
          pieces[z][i][j] = (mapArray[i][j] == 2)? "G" : null;
        } else {
          pieces[z][i][j] = null;
        }
      }
    }
  }

  // Repeat (Until all pieces have a value)
  let tempPieces = clone(pieces);
  let itrCount = 0;
  while (itrCount < 50) {
    let dir;
    for (let z=0; z<3; z++) {
      for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
          // Don't re-assess peices with a direction
          if (pieces[z][i][j] == null) {
            // Limit to legal positions
            if (isLegalPosition(i, j, z)) {
              dir = getDirectionFor(i, j, z);
              tempPieces[z][i][j] = dir;
            }
          }
        }
      }
    }
    itrCount++;
    pieces = clone(tempPieces);
  }
  return tempPieces;
}

function getCoordsFrom(x,y,z,direction) {
  //console.log("Starting Coords: ("+x+", "+y+", "+z+", "+direction+")");
  let coords = [-1,-1,-1];
  if (z == 0) {
    if (direction == "N") {
      coords = [x-1, y, 1];
    } else if (direction == "E") {
      coords = [x, y+2, 2];
    } else if (direction == "S") {
      coords = [x+2, y, 1];
    } else if (direction == "W") {
      coords = [x, y-1, 2];
    }
  } else if (z == 1) {
    if (direction == "N") {
      coords = [x-2, y, 0];
    } else if (direction == "E") {
      coords = [x, y+1, 1];
    } else if (direction == "S") {
      coords = [x+1, y, 0];
    } else if (direction == "W") {
      coords = [x, y-1, 1];
    }
  } else if (z == 2) {
    if (direction == "N") {
      coords = [x-1, y, 2];
    } else if (direction == "E") {
      coords = [x, y+1, 0];
    } else if (direction == "S") {
      coords = [x+1, y, 2];
    } else if (direction == "W") {
      coords = [x, y-2, 0];
    }
  }
  //console.log("Final Coords: ("+coords[0]+", "+coords[1]+", "+coords[2]+")");
  return coords;
}

function getDirectionFor(x,y,z) {
  let north,east,south,west;
  north = isLegalMove(x,y,z,"N")? true : false;
  east = isLegalMove(x,y,z,"E")? true : false;
  south = isLegalMove(x,y,z,"S")? true : false;
  west = isLegalMove(x,y,z,"W")? true : false;
  return getRandDirection(x,y,z,north,east,south,west);
}

function getRandDirection(x, y, z, north, east, south, west) {
  // Returns a random direction from the nearby directions or null.
  //console.log("Getting a Random Direction for ("+x+", "+y+", "+z+") in the ( "+ (north?"North ":"")+(east?"East ":"")+(south?"South ":"")+(west?"West )":")"));
  let directions = [];
  let coords, dir;
  if (north) {
    coords = getCoordsFrom(x,y,z, "N");
    dir = pieces[coords[2]][coords[0]][coords[1]];
    if (dir != null) {
      directions.push("N");
    }
  }
  if (east) {
    coords = getCoordsFrom(x,y,z, "E");
    dir = pieces[coords[2]][coords[0]][coords[1]];
    if (dir != null) {
      directions.push("E")
    }
  }
  if (south) {
    coords = getCoordsFrom(x,y,z, "S");
    dir = pieces[coords[2]][coords[0]][coords[1]];
    if (dir != null) {
      directions.push("S")
    }
  }
  if (west) {
    coords = getCoordsFrom(x,y,z, "W");
    dir = pieces[coords[2]][coords[0]][coords[1]];
    if (dir != null) {
      directions.push("W")
    }
  }
  // Directions Array established!
  // Pick a random one!
  if (directions.length == 0) {
    return null;
  } else {
    return directions[getRandInt(0,directions.length-1)];
  }
}

function clone(array) {
  let temp = [[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]]];
  for (let z=0; z<3; z++) {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        temp[z][i][j] = array[z][i][j];
      }
    }
  }
  return temp;
}

function isLegalPosition(x, y, z) {
  // Check Edges
  if (z == 1 && x == 0) {
    return false;
  } else if (z == 2 && y == 9) {
    return false;
  }
  // Check dead squares
  if (z == 0 && currentMapArray[x][y] == "0") {
    return false;
  } else if (z == 1 && (currentMapArray[x][y] == "0" || currentMapArray[x-1][y] == "0")) {
    return false;
  } else if (z == 2 && (currentMapArray[x][y] == "0" || currentMapArray[x][y-1] == "0")) {
    return false;
  }
  return true;
}

function isLegalMove(x,y,z, direction) {
  let illegalDirections = [];
  if (z == 0) {
    if (x == 0 || x == 1) {
      illegalDirections.push("N");
    } else if (x == 8 || x == 9) {
      illegalDirections.push("S");
    }
    if (y == 0 || y == 1) {
      illegalDirections.push("W");
    } else if (y == 8 || y == 9) {
      illegalDirections.push("E");
    }
  }
  else if (z == 1) {
    if (x == 0 || x == 1) {
      illegalDirections.push("N");
    } else if (x == 9) {
      illegalDirections.push("S");
    }
    if (y == 0) {
      illegalDirections.push("W");
    } else if (y == 9) {
      illegalDirections.push("E");
    }
  }
  else if (z == 2) {
    if (x == 0) {
      illegalDirections.push("N");
    } else if (x == 9) {
      illegalDirections.push("S");
    }
    if (y == 0 || y == 1) {
      illegalDirections.push("W");
    } else if (y == 9) {
      illegalDirections.push("E");
    }
  }

  if (illegalDirections.includes(direction)) {
    return false;
  }
  return true;
}

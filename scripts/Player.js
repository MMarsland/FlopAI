class Player {
  constructor (x_position, y_position, direction) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.direction = direction;
  }


  display() {
    let mainBlockView = this.findBlockById(this.getLocationId(0,0));
    mainBlockView.classList.add("player");
    if (this.direction.name()) {
      let secondaryBlockView = this.findBlockById(this.getLocationId(this.direction.x(), this.direction.y()));
      secondaryBlockView.classList.add("player");
    }
  }

  erase() {
    let mainBlockView = this.findBlockById(this.getLocationId(0,0));
    mainBlockView.classList.remove("player");
    if (this.direction.name()) {
      let secondaryBlockView = this.findBlockById(this.getLocationId(this.direction.x(), this.direction.y()));
      secondaryBlockView.classList.remove("player");
    }
  }

  findBlockById(blockId) {
    return document.getElementById(blockId);
  }

  getLocationId(x_offset, y_offset) {
    return (this.x_position+x_offset)+""+(this.y_position+y_offset);
  }

  moveN() {
    // 5 cases.
    if ((this.direction.name() == null) && this.x_position > 1 && !(this.findBlockById(this.getLocationId(-1,0)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(-2,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position--;
      this.direction = new Direction("N");
      this.display();
    } else
    if ((this.direction.name() == "N") && this.x_position > 1 && !(this.findBlockById(this.getLocationId(-1,0)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(-2,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position -= 2;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "S") && this.x_position > 0 && !(this.findBlockById(this.getLocationId(-1,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position--;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "E") && this.x_position > 0 && !(this.findBlockById(this.getLocationId(-1,0)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(-1,1)).classList.contains("dead"))) {
      this.erase();
      this.x_position--;
      this.display();
    } else
    if ((this.direction.name() == "W") && this.x_position > 0 && !(this.findBlockById(this.getLocationId(-1,0)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(-1,-1)).classList.contains("dead"))) {
      this.erase();
      this.x_position--;
      this.display();
    }
  }

  moveS() {
    // 5 cases.
    if ((this.direction.name() == null) && this.x_position < 8 && !(this.findBlockById(this.getLocationId(1,0)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(2,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position++;
      this.direction = new Direction("S");
      this.display();
    } else
    if ((this.direction.name() == "N") && this.x_position < 9 && !(this.findBlockById(this.getLocationId(1,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position++;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "S") && this.x_position < 8 && !(this.findBlockById(this.getLocationId(1,0)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(2,0)).classList.contains("dead"))) {
      this.erase();
      this.x_position += 2;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "E") && this.x_position < 9 && !(this.findBlockById(this.getLocationId(1,0)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(1,1)).classList.contains("dead"))) {
      this.erase();
      this.x_position++;
      this.display();
    } else
    if ((this.direction.name() == "W") && this.x_position < 9 && !(this.findBlockById(this.getLocationId(1,0)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(1,-1)).classList.contains("dead"))) {
      this.erase();
      this.x_position++;
      this.display();
    }
  }

  moveE() {
    // 5 cases.
    if ((this.direction.name() == null) && this.y_position < 8 && !(this.findBlockById(this.getLocationId(0,1)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(0,2)).classList.contains("dead"))) {
      this.erase();
      this.y_position++;
      this.direction = new Direction("E");
      this.display();
    } else
    if ((this.direction.name() == "N") && this.y_position < 9 && !(this.findBlockById(this.getLocationId(0,1)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(-1,1)).classList.contains("dead"))) {
      this.erase();
      this.y_position++;
      this.display();
    } else
    if ((this.direction.name() == "S") && this.y_position < 9 && !(this.findBlockById(this.getLocationId(0,1)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(1,1)).classList.contains("dead"))) {
      this.erase();
      this.y_position++;
      this.display();
    } else
    if ((this.direction.name() == "E") && this.y_position < 8 && !(this.findBlockById(this.getLocationId(0,1)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(0,2)).classList.contains("dead"))) {
      this.erase();
      this.y_position += 2;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "W") && this.y_position < 9 && !(this.findBlockById(this.getLocationId(0,1)).classList.contains("dead"))) {
      this.erase();
      this.y_position++;
      this.direction = new Direction(null);
      this.display();
    }
  }

  moveW() {
    // 5 cases.
    if ((this.direction.name() == null) && this.y_position > 1 && !(this.findBlockById(this.getLocationId(0,-1)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(0,-2)).classList.contains("dead"))) {
      this.erase();
      this.y_position--;
      this.direction = new Direction("W");
      this.display();
    } else
    if ((this.direction.name() == "N") && this.y_position > 0 && !(this.findBlockById(this.getLocationId(0,-1)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(-1,-1)).classList.contains("dead"))) {
      this.erase();
      this.y_position--;
      this.display();
    } else
    if ((this.direction.name() == "S") && this.y_position > 0 && !(this.findBlockById(this.getLocationId(0,-1)).classList.contains("dead")) &&!(this.findBlockById(this.getLocationId(1,-1)).classList.contains("dead"))) {
      this.erase();
      this.y_position--;
      this.display();
    } else
    if ((this.direction.name() == "E") && this.y_position > 0 && !(this.findBlockById(this.getLocationId(0,-1)).classList.contains("dead"))) {
      this.erase();
      this.y_position--;
      this.direction = new Direction(null);
      this.display();
    } else
    if ((this.direction.name() == "W") && this.y_position > 1 && !(this.findBlockById(this.getLocationId(0,-1)).classList.contains("dead")) && !(this.findBlockById(this.getLocationId(0,-2)).classList.contains("dead"))) {
      this.erase();
      this.y_position -= 2;
      this.direction = new Direction(null);
      this.display();
    }
  }





}

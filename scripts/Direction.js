class Direction {
  constructor(direction) {
    this.direction = direction;
    if (direction == "N"){
      this.x_direction = -1;
      this.y_direction = 0;
    } else if (direction == "S") {
      this.x_direction = 1;
      this.y_direction = 0;
    } else if (direction == "E") {
      this.x_direction = 0;
      this.y_direction = 1;
    } else if (direction == "W") {
      this.x_direction = 0;
      this.y_direction = -1;
    } else {
      this.x_direction = 0;
      this.y_direction = 0;
    }
  }

  name() {
    return this.direction;
  }
  x() {
    return this.x_direction;
  }
  y() {
    return this.y_direction;
  }
  getNumber() {
    if (this.direction == null) {
      return 0;
    } else if (this.direction == "N") {
      return 1;
    } else if (this.direction == "E") {
      return 2;
    } else if (this.direction == "S") {
      return 3;
    } else if (this.direction == "W") {
      return 4;
    }
  }
}

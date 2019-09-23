class Position {
  constructor(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = new Direction(direction);
  }

  getCoords() {
    return [this.x, this.y, this.direction.getNumber()];
  }
}

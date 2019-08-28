class decoderPiece {
  constructor (direction) {
    this.direction = direction;
  }

  hasDirction() {
    if (this.direction != null) {
      return true;
    }
    return false;
  }
}

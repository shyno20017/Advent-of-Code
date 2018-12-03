class Layer {
  constructor(depth, range) {
    this.depth = depth;
    this.range = range-1;
  }

  isAtTop(time) {
    return (time % (this.range * 2)) === 0;
  }
}

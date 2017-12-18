class Layer {
  constructor(depth, range) {
    this.depth = depth;
    this.range = range-1;
    if (range > 0) {
      this.scanner = 0;
      this.dir = 1;
    }
  }

  isAtTop(time) {
    return (time % (this.range * 2)) === 0;
  }

  static advance(arr) {
    for (let layer of arr) {
      if (layer.range > 0) {
        layer.scanner += layer.dir;
        if (layer.scanner === layer.range || layer.scanner === 0) {
          layer.dir *= -1;
        }
      }
    }
  }
}

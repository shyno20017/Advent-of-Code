class Generator {
  constructor(init, mult) {
    this.val = init;
    this.mult = mult;
  }

  generate() {
    this.val *= this.mult;
    this.val %= 2147483647;
    return this.val;
  }
}

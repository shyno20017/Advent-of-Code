class Register {
  constructor(id) {
    this.id = id;
    this.connections = [];
    this.grouped = false;
  }

  static connect(r1, r2) {
    if (!r1.connections.includes(r2)) {
      r1.connections.push(r2);
    }
    if (!r2.connections.includes(r1)) {
      r2.connections.push(r1);
    }
  }

  getNumOfRegisters(passed=[]) {
    if (!passed.includes(this)) {
      passed.push(this);
      for (let i = 0; i < this.connections.length; i++) {
        this.connections[i].getNumOfRegisters(passed)
      }
      return passed.length;
    } else {
      return undefined;
    }
  }

  assignGroup(passed=[]) {
    if (!passed.includes(this)) {
      passed.push(this);
      this.grouped = true;
      for (let i = 0; i < this.connections.length; i++) {
        this.connections[i].assignGroup(passed);
      }
      return;
    } else {
      return;
    }
  }
}

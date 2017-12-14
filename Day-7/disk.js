class Disk {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
    this.parent = undefined;
    this.children = [];
    this.totalWeight = undefined;
  }

  setParent(obj) {
    this.parent = obj;
  }

  addChild(obj) {
    this.children.push(obj);
  }

  findWeight() {
    if (this.totalWeight === undefined) {
      let total = this.weight;
      for (child of this.children) {
        total += child.findWeight();
      }
      this.totalWeight = total;
      return total;
    } else {
      return this.totalWeight;
    }
  }
}

class Particle {
  constructor(p, v, a, i) {
    this.pos = p;
    this.vel = v;
    this.acc = a;
    this.id = i;
    this.remove = false;
  }

  update() {
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.vel[2] += this.acc[2];

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos[2] += this.vel[2];
  }

  distance() {
    return (Math.abs(this.pos[0]) + Math.abs(this.pos[1]) + Math.abs(this.pos[2]));
  }

  collide(arr) {
    for (let blob of arr) {
      if (this !== blob && this.pos.equals(blob.pos)) {
        this.remove = true;
      }
    }
    return false;
  }
}


function findFurthest(arr) {
  let record = -Infinity;
  let holder;
  for (let blob of arr) {
    if (blob.distance() > record) {
      record = blob.distance();
      holder = blob;
    }
  }
  return holder;
}




Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

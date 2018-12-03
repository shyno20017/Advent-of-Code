// Advent of Code Day 18

let input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 735
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

let test = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;


function getRecover(data) {
  data = data.split('\n').map(current => current.split(' '));
  regs = {};
  for (let instruction of data) {
    if (isNaN(parseInt(instruction[1])) && !regs.hasOwnProperty(instruction[1])) {
      regs[instruction[1]] = 0;
    }
  }
  let last;
  for (let i = 0; i < data.length; i++) {
    ins = data[i];
    if (ins[0] === 'set') {
      regs[ins[1]] = getVal(regs, ins[2]);
    } else if (ins[0] === 'add') {
      regs[ins[1]] += getVal(regs, ins[2]);
    } else if (ins[0] === 'mul') {
      regs[ins[1]] *= getVal(regs, ins[2]);
    } else if (ins[0] === 'mod') {
      regs[ins[1]] %= getVal(regs, ins[2]);
    } else if (ins[0] === 'jgz') {
      if (getVal(regs, ins[1]) > 0 && getVal(regs, ins[2]) !== 0) {
        i += getVal(regs, ins[2]);
        i--;
      }
    } else if (ins[0] === 'snd') {
      last = getVal(regs, ins[1]);
    } else if (ins[0] === 'rcv') {
      if (getVal(regs, ins[1]) !== 0) {
        return last;
      }
    }
  }
}


function runTwice(data) {
  data = data.split('\n').map(current => current.split(' '));
  let regs0 = {p: 0};
  let regs1 = {p: 1};

  for (let instruction of data) {
    if (isNaN(parseInt(instruction[1])) && !regs0.hasOwnProperty(instruction[1])) {
      regs0[instruction[1]] = 0;
      regs1[instruction[1]] = 0;
    }
  }

  let index0 = 0;
  let index1 = 0;
  let back0 = [];
  let back1 = [];
  let exit0 = false;
  let exit1 = false;
  let counter = 0;
  while (!(exit0 && exit1)) {
    for (let i = index0; i <= data.length; i++) {
      ins = data[i] || [];
      if (ins[0] === 'set') {
        regs0[ins[1]] = getVal(regs0, ins[2]);
      } else if (ins[0] === 'add') {
        regs0[ins[1]] += getVal(regs0, ins[2]);
      } else if (ins[0] === 'mul') {
        regs0[ins[1]] *= getVal(regs0, ins[2]);
      } else if (ins[0] === 'mod') {
        regs0[ins[1]] %= getVal(regs0, ins[2]);
      } else if (ins[0] === 'jgz') {
        if (getVal(regs0, ins[1]) > 0 && getVal(regs0, ins[2]) !== 0) {
          i += getVal(regs0, ins[2]);
          i--;
        }
      } else if (ins[0] === 'snd') {
        back1.push(getVal(regs0, ins[1]));
        exit1 = false;
      } else if (ins[0] === 'rcv') {
        if (back0.length > 0) {
          regs0[ins[1]] = back0.shift();
          exit0 = false;
        } else {
          index0 = i;
          exit0 = true;
          break;
        }
      } else {
        index0 = i;
        exit0 = true;
        break;
      }
    }

    for (let j = index1; j < data.length; j++) {
      ins = data[j] || [];
      if (ins[0] === 'set') {
        regs1[ins[1]] = getVal(regs1, ins[2]);
      } else if (ins[0] === 'add') {
        regs1[ins[1]] += getVal(regs1, ins[2]);
      } else if (ins[0] === 'mul') {
        regs1[ins[1]] *= getVal(regs1, ins[2]);
      } else if (ins[0] === 'mod') {
        regs1[ins[1]] %= getVal(regs1, ins[2]);
      } else if (ins[0] === 'jgz') {
        if (getVal(regs1, ins[1]) > 0 && getVal(regs1, ins[2]) !== 0) {
          j += getVal(regs1, ins[2]);
          j--;
        }
      } else if (ins[0] === 'snd') {
        back0.push(getVal(regs1, ins[1]));
        counter++;
        exit0 = false;
      } else if (ins[0] === 'rcv') {
        if (back1.length > 0) {
          regs1[ins[1]] = back1.shift();
          exit1 = false;
        } else {
          index1 = j;
          exit1 = true;
          break;
        }
      } else {
        index1 = j;
        exit1 = true;
        break;
      }
    }
  }
  return counter;
}


function getVal(obj, x) {
  let val;
  if (isNaN(parseInt(x))) {
    val = obj[x];
  } else {
    val = parseInt(x);
  }
  return val;
}



console.log(getRecover(input));
console.log(runTwice(input));

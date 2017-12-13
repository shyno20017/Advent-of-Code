// Advent of Code Day 6

let input = `2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14`;

function reCycles(data) {
  data = data.split('\t');
  data = data.map(current => parseInt(current));
  let memory = [];

  let current = data.concat();

  let num = 0;
  while (!includesArr(memory, current)) {
    memory.push(current.concat());
    let largest = -Infinity;
    let largestIndex;
    for (let i = 0; i < current.length; i++) {
      if (current[i] > largest) {
        largest = current[i];
        largestIndex = i;
      }
    }
    let val = current[largestIndex];
    current[largestIndex] = 0;
    for (let j = 1; j <= val; j++) {
      current[(largestIndex + j) % current.length]++;
    }
    num++;
  }

  return num;
}





function reCyclesLength(data) {
  data = data.split('\t');
  data = data.map(current => parseInt(current));
  let memory = [];

  let current = data.concat();

  let num = 0;
  while (!includesArr(memory, current)[0]) {
    memory.push(current.concat());
    let largest = -Infinity;
    let largestIndex;
    for (let i = 0; i < current.length; i++) {
      if (current[i] > largest) {
        largest = current[i];
        largestIndex = i;
      }
    }
    let val = current[largestIndex];
    current[largestIndex] = 0;
    for (let j = 1; j <= val; j++) {
      current[(largestIndex + j) % current.length]++;
    }
    num++;
  }

  return num - includesArr(memory, current)[1];
}





function includesArr(arr, elt) {
  for (piece of arr) {
    for (var i = 0; i < piece.length; i++) {
      if (piece[i] !== elt[i]) {
        break;
      } else if (i === piece.length-1) {
        return [true, arr.indexOf(piece)];
      }
    }
  }
  return [false];
}

console.log(reCycles(input));
console.log(reCyclesLength(input));

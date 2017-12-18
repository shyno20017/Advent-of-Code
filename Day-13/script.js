// Advent of Code Day 13

let input = `0: 3
1: 2
2: 4
4: 4
6: 5
8: 6
10: 6
12: 8
14: 6
16: 6
18: 9
20: 8
22: 8
24: 8
26: 12
28: 8
30: 12
32: 12
34: 12
36: 10
38: 14
40: 12
42: 10
44: 8
46: 12
48: 14
50: 12
52: 14
54: 14
56: 14
58: 12
62: 14
64: 12
66: 12
68: 14
70: 14
72: 14
74: 17
76: 14
78: 18
84: 14
90: 20
92: 14`

function calcSeverity(data) {
  data = data.split('\n').map(current => current.split(' ').map(x => parseInt(x)));
  let reformatted = [[], []];
  for (let instruction of data) {
    reformatted[0].push(instruction[0]);
    reformatted[1].push(instruction[1]);
  }

  let layers = [];
  for (let i = 0; i <= data[data.length-1][0]; i++) {
    let range = 0;
    if (reformatted[0].includes(i)) {
      range = reformatted[1][reformatted[0].indexOf(i)];
    }
    layers.push(new Layer(i, range));
  }

  return getSeverity(layers);
}


function findWait(data) {
  data = data.split('\n').map(current => current.split(' ').map(x => parseInt(x)));
  let reformatted = [[], []];
  for (let instruction of data) {
    reformatted[0].push(instruction[0]);
    reformatted[1].push(instruction[1]);
  }

  let layers = [];
  for (let i = 0; i <= data[data.length-1][0]; i++) {
    let range = 0;
    if (reformatted[0].includes(i)) {
      range = reformatted[1][reformatted[0].indexOf(i)];
    }
    layers.push(new Layer(i, range));
  }

  let wait = 0;
  while (true) {
    if (!isCaught(layers, wait)) {
      return wait;
    }
    wait++;
  }
}



function getSeverity(arr) {
  let severity = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isAtTop(i)) {
      severity += (arr[i].depth * (arr[i].range + 1));
    }
  }
  return severity;
}


function isCaught(arr, off) {
  for (var i = 0; i < arr.length; i++) {
    let time = i + off;
    if (arr[i].range !== -1 && arr[i].isAtTop(time)) {
      return true;
    }
  }
  return false;
}






console.log(calcSeverity(input));
console.log(findWait(input));

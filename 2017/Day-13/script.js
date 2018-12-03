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
  let layers = data.split('\n').map(current => new Layer(...current.split(' ').map(x => parseInt(x))));

  let severity = 0;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].isAtTop(layers[i].depth)) {
      severity += (layers[i].depth * (layers[i].range + 1));
    }
  }
  return severity;
}


function findWait(data) {
  let layers = data.split('\n').map(current => new Layer(...current.split(' ').map(x => parseInt(x))));

  let wait = 0;
  while (true) {
    if (!isCaught(layers, wait)) {
      return wait;
    }
    wait++;
  }
}



function isCaught(layers, off) {
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].isAtTop(layers[i].depth + off)) {
      return true;
    }
  }
  return false;
}



console.log(calcSeverity(input));
console.log(findWait(input));

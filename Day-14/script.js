// Advent of Code Day 14

let input = 'vbqugkhl';
let test = 'flqrgnkx';


function calcUsed(data) {
  let used = 0;
  for (let i = 0; i < 128; i++) {
    let hash = knotHash(data + '-' + i);
    for (let letter of hash) {
      switch (letter) {
        case '1':
        case '2':
        case '4':
        case '8':
          used++;
          break;

        case '3':
        case '5':
        case '6':
        case '9':
        case 'a':
        case 'c':
          used += 2;
          break;

        case '7':
        case 'b':
        case 'd':
        case 'e':
          used += 3;
          break;

        case 'f':
          used += 4;
          break;

        default:
          break;
      }
    }
  }

  return used;
}


function calcRegions(data) {
  let map = [];
  for (let i = 0; i < 128; i++) {
    let hash = knotHash(data + '-' + i);
    let bin = '';
    for (let letter of hash) {
      switch (letter) {
        case '0':
          bin += '0000';
          break;
        case '1':
          bin += '0001';
          break;
        case '2':
          bin += '0010';
          break;
        case '3':
          bin += '0011';
          break;
        case '4':
          bin += '0100';
          break;
        case '5':
          bin += '0101';
          break;
        case '6':
          bin += '0110';
          break;
        case '7':
          bin += '0111';
          break;
        case '8':
          bin += '1000';
          break;
        case '9':
          bin += '1001';
          break;
        case 'a':
          bin += '1010';
          break;
        case 'b':
          bin += '1011';
          break;
        case 'c':
          bin += '1100';
          break;
        case 'd':
          bin += '1101';
          break;
        case 'e':
          bin += '1110';
          break;
        case 'f':
          bin += '1111';
          break;
      }
    }
    map.push(bin)

  }
  map = map.map(current => current.split(''));
  map = map.map(current => current.map(x => new Square(x)));
  let groups = 0;
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      if (!map[i][j].grouped && map[i][j].used === '1') {
        groups++;
        map[i][j].group(i, j, map, map[i][j].used);
      }
    }
  }

  return groups;
}

function index(i, j) {
  return i*128 + j;
}


function knotHash(data) {
  data = (data.split('').map((current) => {return current.charCodeAt()}).join(',') + ',17,31,73,47,23').split(',').map((current) => {return parseInt(current)});
  let hash = (new Array(256)).fill(0).map((current, index) => {return index});
  let pos = 0;
  let skip = 0;
  for (let i = 0; i < 64; i++) {
    for (instruction of data) {
      let toRev = [];
      for (let i = 0; i < instruction; i++) {
        toRev.push(hash[(pos + i) % 256]);
      }
      toRev.reverse();
      for (let j = 0; j < instruction; j++) {
        hash[(pos + j) % 256] = toRev[j];
      }
      pos = (pos + instruction + skip) % 256;
      skip++
    }
  }
  let ans = [];
  for (let j = 0; j < 16; j++) {
    let i = j * 16;
    ans.push(hash[i] ^ hash[i+1] ^ hash[i+2] ^ hash[i+3] ^ hash[i+4] ^ hash[i+5] ^ hash[i+6] ^ hash[i+7] ^ hash[i+8] ^ hash[i+9] ^ hash[i+10] ^ hash[i+11] ^ hash[i+12] ^ hash[i+13] ^ hash[i+14] ^ hash[i+15])
  }
  ans = ans.map((current) => {return current.toString(16)});
  for (let i = 0; i < ans.length; i++) {
    if (ans[i].length === 1) {
      ans[i] = '0' + ans[i];
    }
  }
  return ans.join('');
}





console.log(calcUsed(input));
console.log(calcRegions(input));

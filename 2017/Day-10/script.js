// Advent of Code Day 10

let input = '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70';


function loopHash(data) {
  data = data.split(',').map(x => parseInt(x));
  let hash = (new Array(256)).fill(0).map((current, index) => {return index});
  let pos = 0;
  let skip = 0;
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
  return hash[0] * hash[1];
}

function complexHash(data) {
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

console.log(loopHash(input));
console.log(complexHash(input));

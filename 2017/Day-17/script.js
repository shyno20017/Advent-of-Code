// Advent of Code Day 17

let input = 370;


function spinLockAfter(step) {
  let arr = [0];
  let pos = 0;
  for (let i = 1; i < 2018; i++) {
    pos = (pos + step) % arr.length;
    arr.splice(pos+1, 0, i);
    pos++;
  }
  return arr[pos+1];
}


function spinLockEnd(step) {
  let pos = 0;
  let length = 1;
  let ans;
  for (let i = 1; i <= 50000000; i++) {
    pos = (pos + step) % length;
    if (pos === 0) {
      ans = i;
    }
    pos++;
    length++;
    // if (i % 1000000 === 0) {
    //   console.log(i);
    // }
  }
  return ans;
}


console.log(spinLockAfter(input));
console.log(spinLockEnd(input));

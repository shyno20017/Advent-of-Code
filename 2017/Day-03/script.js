// Advent of Code Day 3

let input = 265149;


function manDistance(n) {
  let right = 0;
  let up = 0;
  let left = 0;
  let down = 0;
  let change = 1;
  let next = 1;
  let dir = 0;

  for (var i = 1; i < n; i++) {
    switch (dir) {
      case 0:
        right++;
        break;
      case 1:
        up++;
        break;
      case 2:
        left++;
        break;
      case 3:
        down++;
        break;
    }
    change--;
    if (change == 0) {
      dir = (dir + 1) % 4;
      if (dir === 0 || dir === 2) {
        next++;
      }
      change = next;
    }
  }
  up = Math.abs(up - down);
  right = Math.abs(right - left);
  return up + right;
}

console.log(manDistance(input));

function calculateChecksum(data) {
  let ids = data.split('\n').map(s => s.split(''));
  let twos = 0;
  let threes = 0;
  for (let id of ids) {
    let numChars = countAllChars(id);
    if (numChars.includes(2)) {
      twos++;
    }
    if (numChars.includes(3)) {
      threes++;
    }
  }
  return twos * threes;
}

function findIdenticalLetters(data) {
  let ids = data.split('\n').map(s => s.split(''));
  for (let i = 0; i < ids.length - 1; i++) {
    let currentId = ids[i]
    for (let j = i + 1; j < ids.length; j++) {
      let compId = ids[j]

      let numError = 0;
      for (let k = 0; k < 26; k++) {
        if (currentId[k] !== compId[k]) {
          numError++;
        }
        if (numError >= 2) {
          break;
        }
      }

      if (numError == 1) {
        let ans = '';
        for (let x = 0; x < 26; x++) {
          if (currentId[x] == compId[x]) {
            ans = ans + currentId[x]
          }
        }
        return ans;
      }
    }
  }
}

console.log(calculateChecksum(data));
console.log(findIdenticalLetters(data));



function countAllChars(id) {
  let chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let arr = [];
  for (let char of chars) {
    arr.push(countChar(id, char));
  }
  return arr
}

function countChar(id, char) {
  let search = (function(total, current) {
    if (current == char) {
      return total + 1;
    } else {
      return total;
    }
  });

  return id.reduce(search, 0);
}

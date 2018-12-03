function sumFrequency(data) {
  return data.split('\n').map(n => parseInt(n)).reduce((total, current) => total + current);
}

function findRepeatFrequency(data) {
  let history = [0];
  let changes = data.split('\n').map(n => parseInt(n));
  let index = 0;
  while (true) {
    let value = history[history.length - 1] + changes[index];
    if (history.includes(value)) {
      return value;
    }
    history.push(value);
    index = (index + 1) % changes.length;
  }
}

console.log(sumFrequency(data));
console.log(findRepeatFrequency(data));

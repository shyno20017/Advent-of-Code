// Advent of Code Day 15

// Format: (Starting value of A),(Starting value of B)
let input = '783,325';
let test = '65,8921';

function calcMatches(data) {
  data = data.split(',').map(x => parseInt(x));
  let a = new Generator(data[0], 16807);
  let b = new Generator(data[1], 48271);
  let matches = 0;
  for (let i = 0; i < 40000000; i++) {
    let valA = a.generate().toString(2);
    let valB = b.generate().toString(2);
    valA = valA.substr(-16);
    valB = valB.substr(-16);
    if (valA == valB) {
      matches++;
    }
    // if (i % 100000 === 0) {
    //   console.log(i);
    // }
  }

  return matches;
}

function independentMatches(data) {
  data = data.split(',').map(x => parseInt(x));
  let a = new Generator(data[0], 16807);
  let b = new Generator(data[1], 48271);
  let matches = 0;
  let backA = [];
  let backB = [];
  let pairs = 0;
  while (true) {
    let valA = a.generate();
    if (valA % 4 === 0) {
      backA.push(valA)
    }
    let valB = b.generate();
    if (valB % 8 === 0) {
      backB.push(valB)
    }
    if (backA.length > 0 && backB.length > 0) {
      let va = backA.shift();
      let vb = backB.shift();
      va = va.toString(2).substr(-16);
      vb = vb.toString(2).substr(-16);
      if (va == vb) {
        matches++;
      }
      pairs++;
      if (pairs >= 5000000) {
        break;
      }
      // if (pairs % 100000 === 0) {
      //   console.log(pairs);
      // }
    }
  }

  return matches;
}




console.log(calcMatches(input));
console.log(independentMatches(input));

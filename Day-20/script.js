// Advent of Code Day 20

let test = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;

function getClosest(data) {
  let particles = data.split('\n').map(current => current.split(', ')).map(current => {
    return current.map(x => {
      return x.substring(3, x.length-1).split(',').map(y => parseInt(y));
    });
  }).map((current, index) => new Particle(current[0], current[1], current[2], index));

  while (particles.length > 1) {
    particles.forEach(x => x.update());
    let furthest = findFurthest(particles);
    if (Math.abs(furthest.pos[0]) > 1000000 && (furthest.pos[0] * furthest.acc[0]) > 0) {
      particles.splice(particles.indexOf(furthest), 1);
    } else if (Math.abs(furthest.pos[1]) > 1000000 && (furthest.pos[1] * furthest.acc[1]) > 0) {
      particles.splice(particles.indexOf(furthest), 1);
    } else if (Math.abs(furthest.pos[2]) > 1000000 && (furthest.pos[2] * furthest.acc[2]) > 0) {
      particles.splice(particles.indexOf(furthest), 1);
    }
  }

  return particles[0].id;
}


function getNumberAfterCollisions(data) {
  let particles = data.split('\n').map(current => current.split(', ')).map(current => {
    return current.map(x => {
      return x.substring(3, x.length-1).split(',').map(y => parseInt(y));
    });
  }).map((current, index) => new Particle(current[0], current[1], current[2], index));

  let remaining = 0;
  while (particles.length > 0) {
    particles.forEach(x => {x.update()});
    particles.forEach(x => {x.collide(particles)});
    particles = particles.filter(x => !x.remove);
    let furthest = findFurthest(particles);
    if (Math.abs(furthest.pos[0]) > 100 && (furthest.pos[0] * furthest.acc[0]) >= 0) {
      particles.splice(particles.indexOf(furthest), 1);
      remaining++;
    } else if (Math.abs(furthest.pos[1]) > 100 && (furthest.pos[1] * furthest.acc[1]) >= 0) {
      particles.splice(particles.indexOf(furthest), 1);
      remaining++;
    } else if (Math.abs(furthest.pos[2]) > 100 && (furthest.pos[2] * furthest.acc[2]) >= 0) {
      particles.splice(particles.indexOf(furthest), 1);
      remaining++;
    }
  }

  return remaining;
}




console.log(getClosest(input));
console.log(getNumberAfterCollisions(input));

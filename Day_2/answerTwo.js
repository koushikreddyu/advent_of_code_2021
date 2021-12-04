const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json'));
const newLocation = data.reduce((v, step) => {
  if(step.forward) {
    return {
      ...v,
      horizontal: v.horizontal + step.forward,
      depth: v.depth + (step.forward * v.aim)
    }
  }
  if(step.up) {
    return {
      ...v,
      aim: v.aim - step.up
    }
  }
  if(step.down) {
    return {
      ...v,
      aim: v.aim + step.down
    }
  }
  return v;
}, {horizontal: 0, depth: 0, aim: 0})

console.log(newLocation.horizontal * newLocation.depth);

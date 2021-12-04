const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json'));
const newLocation = data.reduce((v, step) => {
  if(step.forward) {
    return {
      ...v,
      horizontal: v.horizontal + step.forward
    }
  }
  if(step.up) {
    return {
      ...v,
      depth: v.depth - step.up
    }
  }
  if(step.down) {
    return {
      ...v,
      depth: v.depth + step.down
    }
  }
  return v;
}, {horizontal: 0, depth: 0})

console.log(newLocation.horizontal * newLocation.depth);

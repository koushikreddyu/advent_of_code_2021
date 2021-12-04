const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json'));

console.log(data.reduce((s, e, i) => {
  if(i > 0 && e > data[i-1]) {
    s = s + 1;
  }
  return s
}, 0));

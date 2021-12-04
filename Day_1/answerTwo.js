const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json'));
// const data = [
//   199,
//   200,
//   208,
//   210,
//   200,
//   207,
//   240,
//   269,
//   260,
//   263
// ]
const reducedData = data.reduce((reducedData, e, i) => {
  if(i > 1 && data[i]) {
    reducedData.push(data[i] + data[i - 1] + data[i - 2]);
  }
  return reducedData;
}, []);

console.log(reducedData);

console.log(reducedData.reduce((s, e, i) => {
  if(i > 0 && e > reducedData[i-1]) {
    console.log('new one');
    console.log(e);
    console.log(reducedData[i-1]);
    s = s + 1;
  }
  return s
}, 0));

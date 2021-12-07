// const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./data.json'));

const data = [3];

let resultArr = [...data];
const noOfDays = 256;

let zeroCount = 0;

for(let i = 0; i < noOfDays; i++) {
  let tempArr = [];
  let currentZeroCount = zeroCount;
  zeroCount = 0;
  resultArr.forEach(d => {
    let tempVal = d - 1;
    if (tempVal === 0) {
      zeroCount++;
    }
    if (tempVal < 0) {
      tempVal = 6;
    }
    tempArr.push(tempVal)
  })
  for (let j = 0; j < currentZeroCount; j++) {
    tempArr.push(8);
  }
  resultArr = [...tempArr];
}

console.log(resultArr.length);
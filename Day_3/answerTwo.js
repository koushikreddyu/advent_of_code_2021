const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010'
// ]
const newData = data.map(d => d.split(''));
let oxygen = [...newData];
let co2 = [...newData];
const lengthOfBits = 12;

const getCount = (dataForLoop, i) => {
  let zeroCount = 0;
  let oneCount = 0;
  
  dataForLoop.forEach(d => {
    d[i] == 0 ? zeroCount++ : oneCount++;
  })
  
  let firstCount = null;
  if(zeroCount > oneCount) {
    firstCount = '0'
  } else if(oneCount > zeroCount) {
    firstCount = '1'
  } else if(oneCount == zeroCount) {
    firstCount = '1'
  }

  return firstCount;
}

for (let i = 0; i < lengthOfBits; i++) {
  let oxyzenCountValue = getCount(oxygen, i);
  let co2CountValue = getCount(co2, i) == '1' ? '0' : '1';
  if(oxygen.length !== 1) {
    oxygen = oxygen.filter(e => e[i] == oxyzenCountValue)
  }
  if(co2.length !== 1) {
    co2 = co2.filter(e => e[i] == co2CountValue)
  }
}
console.log(co2);
console.log(oxygen);

const lifesupport = parseInt(oxygen[0].join(''), 2) * parseInt(co2[0].join(''), 2);

console.log(lifesupport);
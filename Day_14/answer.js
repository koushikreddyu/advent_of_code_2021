// const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./data.json'));
// const input = 'KOKHCCHNKKFHBKVVHNPN';

const data = {
  CH : 'B',
  HH : 'N',
  CB : 'H',
  NH : 'C',
  HB : 'C',
  HC : 'B',
  HN : 'C',
  NN : 'C',
  BH : 'H',
  NC : 'B',
  NB : 'B',
  BN : 'B',
  BB : 'N',
  BC : 'B',
  CC : 'N',
  CN : 'C',
}

const input = 'NNCB';

let resultOutput = input;
const steps = 20;

for(let i = 0; i < steps; i++) {
  let tempInput = resultOutput.split('');
  let tempOutput = [tempInput[0]];
  for(let j = 0; j < tempInput.length; j++) {
    // tempOutput.push(tempInput[j])
    if(tempInput[j+1]) {
      tempOutput.push(data[tempInput[j] + tempInput[j+1]])
      tempOutput.push(tempInput[j+1])
    }
  }
  resultOutput = tempOutput.join('');
}

// console.log(resultOutput);
let resultArr = resultOutput.split('')
let resultObject =resultArr.reduce((obj, element) => {
  if(!obj[element]) {
    obj[element] = 0
  }
  obj[element]++
  return obj
}, {});
console.log(resultOutput);
console.log(resultObject);
// let lowVal = 0
// let highVal = 0

// for(const key in resultObject) {
//   if(lowVal === 0 || lowVal > resultObject[key]) {
//     lowVal = resultObject[key]
//   }
//   if(highVal < resultObject[key]) {
//     highVal = resultObject[key]
//   }
// }

// console.log((highVal - lowVal));
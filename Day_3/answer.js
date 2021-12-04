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
const lengthOfBits = 12;
const gammaData = [];
const epsilonData = [];

for (let i = 0; i < lengthOfBits; i++) {
  let zeroCount = 0;
  let oneCount = 0;
  newData.forEach(d => {
    d[i] == 0 ? zeroCount++ : oneCount++;
  })
  gammaData.push(zeroCount > oneCount ? '0' : '1');
  epsilonData.push(zeroCount > oneCount ? '1' : '0');
}
console.log(gammaData);

const gama = parseInt(gammaData.join(''), 2);
const epsilon = parseInt(epsilonData.join(''), 2);
console.log(gama);
const powerConsumption = gama * epsilon;

console.log(powerConsumption);
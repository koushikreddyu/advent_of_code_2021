const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));
const basicString = 'KOKHCCHNKKFHBKVVHNPN';
const input = []
for(let i = 0; i < basicString.length - 1; i++) {
  input.push(basicString[i]+basicString[i+1])
}
console.log(input);
// const data = {
//   CH : 'B',
//   HH : 'N',
//   CB : 'H',
//   NH : 'C',
//   HB : 'C',
//   HC : 'B',
//   HN : 'C',
//   NN : 'C',
//   BH : 'H',
//   NC : 'B',
//   NB : 'B',
//   BN : 'B',
//   BB : 'N',
//   BC : 'B',
//   CC : 'N',
//   CN : 'C',
// }

// const input = ['NN', 'NC', 'CB']

const steps = 40;
let pairs = new Map()

input.forEach(element => {
  pairs.set(element, pairs.has(element) ? pairs.get(element) + 1 : 1)
});

for(let i = 0; i < steps; i++) {
  let newPairCount = new Map();
  for(let key of pairs) {
    let pair = key[0]
    let pairVal = parseInt(key[1])
    let insert = data[pair]
    let pairOne = pair[0] + insert
    let pairTwo = insert + pair[1]
    newPairCount.set(pairOne, newPairCount.has(pairOne) ? newPairCount.get(pairOne) + pairVal : pairVal)
    newPairCount.set(pairTwo, newPairCount.has(pairTwo) ? newPairCount.get(pairTwo) + pairVal : pairVal)
  }
  // console.log('pair count at :: ', i, ' :: ', newPairCount);
  pairs = newPairCount;
}

let counts = new Map();

for(let key of pairs) {
  let pair = key[0]
  let pairVal = key[1]
  counts.set(pair[0], counts.has(pair[0]) ? counts.get(pair[0]) + pairVal : pairVal)
  counts.set(pair[1], counts.has(pair[1]) ? counts.get(pair[1]) + pairVal : pairVal)
}

// console.log(pairs);
console.log(counts);

let lowVal = 0
let highVal = 0

for(const key of counts) {
  if(lowVal === 0 || lowVal > key[1]) {
    lowVal = key[1]
  }
  if(highVal < key[1]) {
    highVal = key[1]
  }
}

console.log(lowVal/2);
console.log(highVal/2);

console.log(parseInt(((highVal/2) - (lowVal/2)) + 1));
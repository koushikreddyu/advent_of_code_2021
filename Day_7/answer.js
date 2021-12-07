const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [16,1,2,0,4,2,7,1,2,14];

const memoryObj = {};

const sortedArray = data.sort(function(a, b){return a - b})
const leastNo = sortedArray[0]
const maxNo = sortedArray[sortedArray.length - 1]
let leastSum = 0;
// console.log(sortedArray);
// console.log(leastNo);
// console.log(maxNo);

for(let j = 0; j < data.length; j++) {
  for(let i = leastNo; i <= maxNo; i++) {
    if(memoryObj[i] && memoryObj[i][data[j]]) {
      memoryObj[i][data[j]] = Math.abs(i - data[j]);
      memoryObj[i]['total'] += memoryObj[i][data[j]]
    } else if(memoryObj[data[j]] && memoryObj[data[j]][i]) {
      memoryObj[i][data[j]] = Math.abs(i - data[j]);
      memoryObj[i]['total'] += memoryObj[data[j]][i]
    } else {
      if (!memoryObj[i]) {
        memoryObj[i] = {
          'total' : 0
        }
      }
      memoryObj[i][data[j]] = Math.abs(i - data[j]);
      memoryObj[i]['total'] += Math.abs(i - data[j]);
    }
  }
  if(j === (data.length - 1)) {
    leastSum = memoryObj[j]['total'];
  }
}

for(const item in memoryObj) {
  if(memoryObj[item]['total'] < leastSum) {
    leastSum = memoryObj[item]['total'];
  }
}

console.log(leastSum);
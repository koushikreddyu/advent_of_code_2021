const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [16,1,2,0,4,2,7,1,2,14];

const memoryObj = {};

const sortedArray = data.sort(function(a, b){return a - b})
const leastNo = sortedArray[0]
const maxNo = sortedArray[sortedArray.length - 1]
let leastSum = 0;

const getNumberCount = (num) => {
  let total = 0
  for(let i = 1; i <= num; i++) {
    total += i;
  }
  return total;
}

for(let j = 0; j < data.length; j++) {
  for(let i = leastNo; i <= maxNo; i++) {
    if(memoryObj[i] && memoryObj[i][data[j]]) {
      memoryObj[i][data[j]] = getNumberCount(Math.abs(i - data[j]));
      memoryObj[i]['total'] += memoryObj[i][data[j]]
    } else if(memoryObj[data[j]] && memoryObj[data[j]][i]) {
      memoryObj[i][data[j]] = getNumberCount(Math.abs(i - data[j]));
      memoryObj[i]['total'] += memoryObj[data[j]][i]
    } else {
      if (!memoryObj[i]) {
        memoryObj[i] = {
          'total' : 0
        }
      }
      let total = getNumberCount(Math.abs(i - data[j]));
      memoryObj[i][data[j]] = total;
      memoryObj[i]['total'] += total;
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
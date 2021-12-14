const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));
// const data = [
//   [2,1,9,9,9,4,3,2,1,0],
//   [3,9,8,7,8,9,4,9,2,1],
//   [9,8,5,6,7,8,9,8,9,2],
//   [8,7,6,7,8,9,6,7,8,9],
//   [9,8,9,9,9,6,5,6,7,8]
// ]

const smallElements = [];

// const mapData = Array(data.length).fill().map(() => Array(data[0].length).fill(false))

const isVariableSmall = (compareValue, compareArray) => {
  let counter = 0
  for(let i = 0; i < compareArray.length; i++) {
    if(compareValue < compareArray[i]) {
      counter++
    }
  }

  if(counter === compareArray.length) {
    return true;
  } else {
    return false;
  }
}

for(let i = 0; i < data.length; i++) {
  for(let j = 0; j < data[i].length; j++) {
    let compareValue = data[i][j];
    let compareArray = [];

    if(data[i-1] && typeof(data[i-1][j]) !== 'undefined') {
      compareArray.push(data[i-1][j]);
    }
    if(data[i+1] && typeof(data[i+1][j]) !== 'undefined') {
      compareArray.push(data[i+1][j]);
    }
    if(typeof(data[i][j-1]) !== 'undefined') {
      compareArray.push(data[i][j-1]);
    }
    if(typeof(data[i][j+1]) !== 'undefined') {
      compareArray.push(data[i][j+1]);
    }

    const isSmall = isVariableSmall(compareValue, compareArray);

    // mapData[i][j] = isSmall;
    if(isSmall) {
      // console.log('data here :: ', data[i][j]);
      smallElements.push(data[i][j])
      // if(mapData[i-1] && mapData[i-1][j]) {mapData[i-1][j] = false} 
      // if(mapData[i+1] && mapData[i+1][j]) {mapData[i+1][j] = false} 
      // if(mapData[i][j-1]) {mapData[i][j-1] = false} 
      // if(mapData[i][j+1]) {mapData[i][j+1] = false} 
    }
  }
}

// console.log(mapData);

const total = smallElements.reduce((sum, e) => {
  sum = sum + e + 1
  return sum;
}, 0)

console.log(total);
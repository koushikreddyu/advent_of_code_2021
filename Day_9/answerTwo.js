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
const counterElements = [];

const mapData = Array(data.length).fill().map(() => Array(data[0].length).fill(false))
const trackData = Array(data.length).fill().map(() => Array(data[0].length).fill(false))

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

    if(data[i-1] && typeof(data[i-1][j]) !== 'undefined' && data[i-1][j] !== 9) {
      mapData[i-1][j] = true;
      compareArray.push(data[i-1][j]);
    }
    if(data[i+1] && typeof(data[i+1][j]) !== 'undefined' && data[i+1][j] !== 9) {
      mapData[i+1][j] = true;
      compareArray.push(data[i+1][j]);
    }
    if(typeof(data[i][j-1]) !== 'undefined' && data[i][j-1] !== 9) {
      mapData[i][j-1] = true;
      compareArray.push(data[i][j-1]);
    }
    if(typeof(data[i][j+1]) !== 'undefined' && data[i][j+1] !== 9) {
      mapData[i][j+1] = true;
      compareArray.push(data[i][j+1]);
    }

    const isSmall = isVariableSmall(compareValue, compareArray);

    if(isSmall) {
      smallElements.push(
        {
          value: data[i][j],
          i,
          j
        }
      )
    }
  }
}

// console.log(smallElements);

const largest = [];

for (let i = 0; i < smallElements.length; i++) {
  const visited = {};
  const toVisit = [];
  toVisit.push(smallElements[i])
  while(toVisit.length > 0) {
    let nextPoint = toVisit.shift();
    if (visited[nextPoint.i+'_'+nextPoint.j]) {
      continue;
    }
    visited[nextPoint.i+'_'+nextPoint.j] = nextPoint;
    let row = nextPoint.i
    let col = nextPoint.j
    if(row - 1 >= 0 && data[row-1][col] !== 9) {
      if(!visited[row-1+'_'+col]) {
        toVisit.push({
          value: data[row-1][col],
          i: row-1,
          j: col
        })
      }
    }
    if(row + 1 < data.length && data[row+1][col] !== 9) {
      if(!visited[row+1+'_'+col]) {
        toVisit.push({
          value: data[row+1][col],
          i: row+1,
          j: col
        })
      }
    }
    if(col - 1 >= 0 && data[row][col - 1] !== 9) {
      if(!visited[row+'_'+(col-1)]) {
        toVisit.push({
          value: data[row][col-1],
          i: row,
          j: col-1
        })
      }
    }
    if(col + 1 < data[row].length && data[row][col + 1] !== 9) {
      if(!visited[row+'_'+(col+1)]) {
        toVisit.push({
          value: data[row][col+1],
          i: row,
          j: col+1
        })
      }
    }
  }

  largest.push(Object.keys(visited).length)
}

largest.sort(function(a, b){return b - a})
console.log(largest[0] * largest[1] * largest[2])
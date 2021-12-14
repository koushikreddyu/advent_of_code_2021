const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   [5,4,8,3,1,4,3,2,2,3],
//   [2,7,4,5,8,5,4,7,1,1],
//   [5,2,6,4,5,5,6,1,7,3],
//   [6,1,4,1,3,3,6,1,4,6],
//   [6,3,5,7,3,8,5,4,7,8],
//   [4,1,6,7,5,2,4,6,4,5],
//   [2,1,7,6,8,4,1,7,2,1],
//   [6,8,8,2,8,8,1,1,3,4],
//   [4,8,4,6,8,4,8,5,5,4],
//   [5,2,8,3,7,5,1,5,2,6]
// ]

const noOfSteps = 500;
let totalFlashes = 0;
let flashPoint = 0;

const checkIfAllAreFlashed = () => {
  let flashPoint = true;
  for(let row = 0; row < data.length; row++) {
    for(let col = 0; col < data[row].length; col++) {
      if(data[row][col] !== 0) {
        flashPoint = false;
        break;
      }
    }
  }
  return flashPoint;
}

for(let i = 0; i < noOfSteps; i++) {
  const toVisit = [];
  for(let row = 0; row < data.length; row++) {
    for(let col = 0; col < data[row].length; col++) {
      if(data[row][col] === 9) {
        totalFlashes++
        data[row][col] = 0
        toVisit.push({row, col})
      } else {
        data[row][col]++
      }
    }
  }

  if(toVisit.length > 0) {
    while (toVisit.length > 0) {
      const row = toVisit[0]['row']
      const col = toVisit[0]['col']

      if((row - 1) >= 0) {
        if((col - 1) >= 0) {
          if(data[row-1][col-1] === 9) {
            totalFlashes++
            data[row-1][col-1] = 0
            toVisit.push({row: row-1, col: col-1})
          } else if(data[row-1][col-1] !== 0) {
            data[row-1][col-1]++
          }
        }
        if((col + 1) < data[row].length) {
          if(data[row-1][col+1] === 9) {
            totalFlashes++
            data[row-1][col+1] = 0
            toVisit.push({row: row-1, col: col+1})
          } else if(data[row-1][col+1] !== 0) {
            data[row-1][col+1]++
          }
        }
        if(data[row-1][col] === 9) {
          totalFlashes++
          data[row-1][col] = 0
          toVisit.push({row: row-1, col: col})
        } else if(data[row-1][col] !== 0) {
          data[row-1][col]++
        }
      }
      // }

      if((row + 1) < data.length) {
        if((col - 1) >= 0) {
          if(data[row+1][col-1] === 9) {
            totalFlashes++
            data[row+1][col-1] = 0
            toVisit.push({row: row+1, col: col-1})
          } else if(data[row+1][col-1] !== 0) {
            data[row+1][col-1]++
          }
        }
        if((col + 1) < data[row].length) {
          if(data[row+1][col+1] === 9) {
            totalFlashes++
            data[row+1][col+1] = 0
            toVisit.push({row: row+1, col: col+1})
          } else if(data[row+1][col+1] !== 0) {
            data[row+1][col+1]++
          }
        }
        if(data[row+1][col] === 9) {
          totalFlashes++
          data[row+1][col] = 0
          toVisit.push({row: row+1, col: col})
        } else if(data[row+1][col] !== 0) {
          data[row+1][col]++
        }
      }

      if((col - 1) >= 0) {
        if(data[row][col-1] === 9) {
          totalFlashes++
          data[row][col-1] = 0
          toVisit.push({row: row, col: col-1})
        } else if(data[row][col-1] !== 0) {
          data[row][col-1]++
        }
      }

      if((col + 1) < data[row].length) {
        if(data[row][col+1] === 9) {
          totalFlashes++
          data[row][col+1] = 0
          toVisit.push({row: row, col: col+1})
        } else if(data[row][col+1] !== 0) {
          data[row][col+1]++
        }
      }
      toVisit.shift()
    }
  }

  if(checkIfAllAreFlashed()) {
    console.log('Came to flash point');
    flashPoint = i + 1;
    break;
  }
}

// console.log(data);
console.log(totalFlashes);
console.log(flashPoint);
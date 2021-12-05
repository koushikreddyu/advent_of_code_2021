const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   {'x1':0, 'y1':9, 'x2':5, 'y2':9},
//   {'x1':8, 'y1':0, 'x2':0, 'y2':8},
//   {'x1':9, 'y1':4, 'x2':3, 'y2':4},
//   {'x1':2, 'y1':2, 'x2':2, 'y2':1},
//   {'x1':7, 'y1':0, 'x2':7, 'y2':4},
//   {'x1':6, 'y1':4, 'x2':2, 'y2':0},
//   {'x1':0, 'y1':9, 'x2':2, 'y2':9},
//   {'x1':3, 'y1':4, 'x2':1, 'y2':4},
//   {'x1':0, 'y1':0, 'x2':8, 'y2':8},
//   {'x1':5, 'y1':5, 'x2':8, 'y2':2}
// ]

const resultArr = [];

const getXArray = (x1, x2) => {
  const result = [];
  if (x1 > x2) {
    for (let i = x2; i <= x1; i++) {
      result.push(i);
    }
  }
  if (x2 > x1) {
    for (let i = x1; i <= x2; i++) {
      result.push(i);
    }
  }
  return result;
}

data.forEach((d, x)=> {
  if(d.x1 === d.x2 || d.y1 === d.y2) {
    let xArray = null;
    if (d.x1 !== d.x2) {
      xArray = getXArray(d.x1, d.x2);
    } else {
      xArray = [d.x1];
    }
    xArray.forEach(x => {
      if(!resultArr[x]) {
        resultArr[x] = [];
      }
      let y1 = d.y1, y2 = d.y2;
      if(y2 > y1) {
        for(let i = y1; i <= y2; i++) {
          resultArr[x][i] = resultArr[x][i] ? resultArr[x][i] + 1 : 1
        }
      } else if(y1 > y2) {
        for(let i = y2; i <= y1; i++) {
          resultArr[x][i] = resultArr[x][i] ? resultArr[x][i] + 1 : 1
        }
      } else if(y1 === y2) {
        resultArr[x][y1] = resultArr[x][y1] ? resultArr[x][y1] + 1 : 1
      }
    })
  }
})

const getCount = (arr) => {
  let count = 0;
  arr.forEach(a => {
    if(a >= 2) {
      count++
    }
  })
  return count;
}
const resultCounter = resultArr.reduce((sum, arr) => {
  const arrayReturn = getCount(arr);
  if(arrayReturn > 0) {
    sum = sum + arrayReturn;
  }
  return sum;
}, 0)

console.log(resultCounter);
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

const fold = [
  {x:655},
  {y:447},
  {x:327},
  {y:223},
  {x:163},
  {y:111},
  {x:81},
  {y:55},
  {x:40},
  {y:27},
  {y:13},
  {y:6},
]

// const data = [
//   [6,10],
//   [0,14],
//   [9,10],
//   [0,3],
//   [10,4],
//   [4,11],
//   [6,0],
//   [6,12],
//   [4,1],
//   [0,13],
//   [10,12],
//   [3,4],
//   [3,0],
//   [8,4],
//   [1,10],
//   [2,14],
//   [8,10],
//   [9,0],
// ]
// const fold = [
//   {x:5},
//   {y:7}
// ]

let xMax = 0
let yMax = 0

data.forEach(d => {
  if(d[1] > yMax) {
    yMax = d[1]
  }
  if(d[0] > xMax) {
    xMax = d[0]
  }
})
let mapData = Array(yMax+1).fill().map(() => Array(xMax+1).fill('.'));
// console.log(mapData);
data.forEach(d => {
  if(!mapData[d[1]]) {
    mapData[d[1]] = Array(xMax).fill('.');
  }
  mapData[d[1]][d[0]] = '#'
})


let foldedArr = [...mapData];

const foldThePaper = (x, y) => {
  if(y) {
    let tempFoldArry = []
    for(let i = 0; i < y; i++) {
      const overLapArrayPoint = foldedArr.length - i;
      const overLapArr = foldedArr[overLapArrayPoint - 1]
      tempFoldArry.push(foldedArr[i]);
      for(let j = 0; j < overLapArr.length; j++) {
        if(tempFoldArry[i][j] !== '#') {
          tempFoldArry[i][j] = overLapArr[j];
        }
      }
    }
    foldedArr = [...tempFoldArry]
  }
  if(x) {
    let tempFoldArry = []
    for(let i = 0; i < foldedArr.length; i++) {
      const xLength = foldedArr[i].length - 1;
      let newArray = Array(x).fill('.')
      for(let j = 0; j < x; j++) {
        newArray[j] = foldedArr[i][j];
        if(newArray[j] !== '#') {
          newArray[j] = foldedArr[i][xLength - j]
        }
      }
      tempFoldArry.push(newArray);
    }
    foldedArr = [...tempFoldArry]
  }
}

fold.forEach(f=> {
  if(f.y) {
    foldThePaper(null, f.y)
  }
  if(f.x) {
    foldThePaper(f.x, null)
  }
})

// const count = (arr) => {
//   let count = 0;
//   for(let i = 0; i < arr.length; i++) {
//     for(let j = 0; j < arr[i].length; j++) {
//       if(arr[i][j] === '#') {
//         count++
//       }
//     }
//   }
//   return count
// }
console.log(foldedArr);

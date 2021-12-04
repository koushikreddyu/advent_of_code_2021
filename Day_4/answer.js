const fs = require('fs')

const input = JSON.parse(fs.readFileSync('./input.json'));
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   [
//     [22, 13, 17, 11, 0],
//     [8, 2, 23, 4, 24],
//     [21, 9, 14, 16, 7],
//     [6, 10, 3, 18, 5],
//     [1, 12, 20, 15, 19]
//   ],
//   [
//     [3, 15,  0,  2 ,22],
//     [9, 18, 13, 17,  5],
//     [19, 8, 7, 25, 23],
//     [20, 11, 10, 24,  4],
//     [14, 21, 16, 12,  6]
//   ],
//   [
//     [14, 21, 17, 24,  4],
//     [10, 16, 15,  9, 19],
//     [18,  8, 23, 26, 20],
//     [22, 11, 13,  6,  5],
//     [2,  0, 12,  3,  7]
//   ]
// ]
// const input = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]
const d = {};

let anyMatch = false;
let matchArr = null;
let matchVal = null;
let matchSum = null;
let alreadyMarked = [];

const setArrayValues = (arr) => {
  let resultSum = 0;
  arr.forEach((row, i) => {
    row.forEach((col, j) => {
      if(alreadyMarked.indexOf(col) === -1) {
        resultSum += col;
      }
    })
  })
  return resultSum;
}

const markArray = (arr, input, d, di) => {
  arr.forEach((row, i) => {
    row.forEach((col, j) => {
      if(col === input && !anyMatch) {
        if(!d[i]) {
          d[i] = [];
        }
        if(!di[j]) {
          di[j] = [];
        }
        d[i].push(j);
        di[j].push(i);
        if(d[i].length === 5) {
          anyMatch = true;
          matchArr = d;
          matchVal = input;
          matchSum = setArrayValues(arr);
        }
        if(di[j].length === 5) {
          anyMatch = true;
          matchArr = di;
          matchVal = input;
          matchSum = setArrayValues(arr);
        }
      }
    })
  })

}

input.forEach(input => {
  if(!anyMatch) {
    alreadyMarked.push(input);
    data.forEach((k, index) => {
      if(!d[index]) d[index] = {}
      if(!d[index + 'i']) d[index + 'i'] = {}
      markArray(k, input, d[index], d[index + 'i']);
    })
  }
})

console.log(matchSum * matchVal);
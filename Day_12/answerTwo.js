const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   "dc-end",
//   "HN-start",
//   "start-kj",
//   "dc-start",
//   "dc-HN",
//   "LN-dc",
//   "HN-end",
//   "kj-sa",
//   "kj-HN",
//   "kj-dc"
// ]

// const data = [
//   "start-A",
//   "start-b",
//   "A-c",
//   "A-b",
//   "b-d",
//   "A-end",
//   "b-end"
// ]
const mapData = {}

data.forEach(d => {
  let temp = d.split('-')
  if(!mapData[temp[0]]) {
    mapData[temp[0]] = []
  }
  if(!mapData[temp[1]]) {
    mapData[temp[1]] = []
  }
  mapData[temp[0]].push(temp[1])
  mapData[temp[1]].push(temp[0])
})

const paths = [];

let routeCount = 0;

const startArray = mapData['start'];

const validateCharecter = (char) => {
  let upperChar = char.toUpperCase();
  let lowerChar = char.toLowerCase();
  if(char === upperChar) {
    return false;
  }
  if(char === lowerChar) {
    return true;
  }
}

const getPathCount = (element, path) => {
  let pathArr = path.split('_');
  let count = 0;
  pathArr.forEach(p => {
    if(p === element) {
      count++
    }
  })
  return count;
}

const getRouteCount = (arr, path, doubleCave) => {
  // console.log('received array here :: ', arr);
  let count = 0;
  if(arr) {
    let pathArr = path.split('_');
    for(let i = 0; i <arr.length; i++) {
      if(arr[i] === 'end') {
        paths.push(path)
        count++
      } else if(arr[i] === 'start') {
        continue;
      } else if(!validateCharecter(arr[i]) || pathArr.indexOf(arr[i]) === -1) {
        let tempArr = [];
        if(mapData[arr[i]]) {
          tempArr.push(...mapData[arr[i]])
        }
        count += getRouteCount(tempArr, path+'_'+arr[i], doubleCave);
      } else if(!doubleCave && getPathCount(arr[i], path) === 1){
        let tempArr = [];
        if(mapData[arr[i]]) {
          tempArr.push(...mapData[arr[i]])
        }
        count += getRouteCount(tempArr, path+'_'+arr[i], true);
      }
    }
  }
  return count;
}

let path = `start`
routeCount += getRouteCount(startArray, path, false);

console.log(routeCount);
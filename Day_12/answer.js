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
const mapData = {}

data.forEach(d => {
  let temp = d.split('-')
  if(!mapData[temp[0]]) {
    mapData[temp[0]] = []
  }
  mapData[temp[0]].push(temp[1])
})

let routeCount = 0;

const startArray = mapData['start'];

const getElementArr = (element) => {
  const mapDataValue = Object.values(mapData)
  const mapDataKeys = Object.keys(mapData)
  const elementArray = []
  for(let m = 0; m < mapDataValue.length; m++) {
    if(mapDataValue[m].indexOf(element) !== -1) {
      elementArray.push(mapDataKeys[m])
    }
  }
  return elementArray;
}
startArray.push(...getElementArr('start'))
console.log(mapData);
console.log(startArray);

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
const getRouteCount = (arr, path) => {
  // console.log('received array here :: ', arr);
  let count = 0;
  if(arr) {
    let pathArr = path.split('_');
    for(let i = 0; i <arr.length; i++) {
      if(arr[i] === 'end') {
        count++
      } else if(validateCharecter(arr[i]) && pathArr.indexOf(arr[i]) === -1){
        let tempArr = [];
        if(mapData[arr[i]]) {
          tempArr.push(...mapData[arr[i]])
        }
        tempArr.push(...getElementArr(arr[i]))
        count += getRouteCount(tempArr, path+'_'+arr[i]);
      } else if(!validateCharecter(arr[i])) {
        let tempArr = [];
        if(mapData[arr[i]]) {
          tempArr.push(...mapData[arr[i]])
        }
        tempArr.push(...getElementArr(arr[i]))
        count += getRouteCount(tempArr, path+'_'+arr[i]);
      }
    }
  }
  return count;
}

for(let i = 0; i < startArray.length; i++) {
  if(mapData[startArray[i]]) {
    let path = `start_${startArray[i]}`
    let tempArr = [...mapData[startArray[i]], ...getElementArr(startArray[i])]
    const receivedRouteCount = getRouteCount(tempArr, path);
    routeCount += receivedRouteCount;
  }
}

console.log(routeCount);
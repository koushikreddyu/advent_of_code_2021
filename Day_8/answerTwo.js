const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
//   'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
//   'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
//   'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
//   'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
//   'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
//   'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
//   'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
//   'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
//   'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
// ]

const outPutObject = {};

const getMapObject = (arr) => {
  let mapObject = {}
  for (let e of arr) {
    if(e.length === 2) {
      mapObject[1] = e
    } else if(e.length === 4) {
      mapObject[4] = e
    } else if(e.length === 3) {
      mapObject[7] = e
    } else if(e.length === 7) {
      mapObject[8] = e
    }
  }
  return mapObject
}

const getMatchingNumber = (elementData, mapObj) => {
  const matchCount = [];
  for(let ele in mapObj) {
    let count = 0;
    let tempS = mapObj[ele].split('')
    tempS.forEach(t => {
      if(elementData.indexOf(t) !== -1) {
        count++
      }
    })
    matchCount.push(count);
  }
  return matchCount;
}

const referenceObj = {
  '1325' : '5',
  '2335' : '3',
  '1225' : '2',
  '2336' : '0',
  '2436' : '9',
  '1326' : '6'
}

data.forEach((d, i)=> {
  let newArray = d.split(' | ');
  let inputArr = [...newArray[0].split(' ')]
  let outputArr = [...newArray[1].split(' ')]
  let totalArray = [...inputArr, ...outputArr];
  let mapObject = getMapObject(totalArray);

  for(let ele in outputArr) {
    let elementLength = outputArr[ele].length
    if (elementLength === 2) {
      console.log('matching sequence here :: ', outputArr[ele]);
      outPutObject[i] = outPutObject[i] ? outPutObject[i] += '1' : '1';
    } else if (elementLength === 4) {
      outPutObject[i] = outPutObject[i] ? outPutObject[i] += '4' : '4';
    } else if (elementLength === 3) {
      outPutObject[i] = outPutObject[i] ? outPutObject[i] += '7' : '7';
    } else if (elementLength === 7) {
      outPutObject[i] = outPutObject[i] ? outPutObject[i] += '8' : '8';
    } else if (elementLength === 5 || elementLength === 6) {
      let matchCount = getMatchingNumber(outputArr[ele], mapObject);
      let matchingSequence = matchCount.join('');
      outPutObject[i] = outPutObject[i] ? outPutObject[i] += referenceObj[matchingSequence] : referenceObj[matchingSequence];
    }
  }
})

let totalOutput = 0

for (let ans in outPutObject) {
  totalOutput += parseInt(outPutObject[ans])
}

console.log(totalOutput);
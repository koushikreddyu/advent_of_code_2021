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
const mapObject = {}

let newOutputArray = [];

data.forEach(d => {
  let newArray = d.split(' | ');
  newOutputArray.push(newArray[1].split(' '))
})

for (let arr of newOutputArray) {
  arr.forEach(e => {
    switch(e.length) {
      case 2:
        return mapObject[1] = mapObject[1] ? mapObject[1] + 1 : 1

      case 4:
        return mapObject[4] = mapObject[4] ? mapObject[4] + 1 : 1
        
      case 3:
        return mapObject[7] = mapObject[7] ? mapObject[7] + 1 : 1

      case 7:
        return mapObject[8] = mapObject[8] ? mapObject[8] + 1 : 1
    }
  })
}

// console.log(mapObject);
let totalCount = 0;

for (let elem in mapObject) {
  totalCount += mapObject[elem]
}
console.log(totalCount);
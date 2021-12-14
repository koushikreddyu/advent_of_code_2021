const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [
//   "[({(<(())[]>[[{[]{<()<>>",
//   "[(()[<>])]({[<{<<[]>>(",
//   "{([(<{}[<>[]}>{[]{[(<()>",
//   "(((({<>}<{<{<>}{[]{[]{}",
//   "[[<[([]))<([[{}[[()]]]",
//   "[{[{({}]{}}([{[{{{}}([]",
//   "{<[[]]>}<{[{[{[]{()[[[]",
//   "[<(<(<(<{}))><([]([]()",
//   "<{([([[(<>()){}]>(<<{{",
//   "<{([{{}}[<[[[<>{}]]]>[]]"
// ]

const totalCounts = [];

const openArray = ['{', '<', '[', '(']
const closeArray = ['}', '>', ']', ')']

const updateTheCount = (newValue, totalCount) => {
  return (totalCount * 5) + newValue;
}

const mapData = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}
for(let i = 0; i < data.length; i++) {
  let openCharectors = [];
  let closeCharectors = [];
  const currentData = data[i].split('');
  let isIlligal = false;
  for(let j = 0; j < currentData.length; j++) {
    if(openArray.indexOf(currentData[j]) !== -1) {
      openCharectors = [currentData[j], ...openCharectors]
      closeCharectors = [closeArray[openArray.indexOf(currentData[j])], ...closeCharectors]
    } else {
      if(closeArray.indexOf(currentData[j]) !== openArray.indexOf(openCharectors[0]) ) {
        isIlligal = true;
        break;
      } else {
        openCharectors.shift();
        closeCharectors.shift();
      }
    }
  }
  if(!isIlligal && closeCharectors.length > 0) {
    let total = 0;
    closeCharectors.forEach(char => {
      total = updateTheCount(mapData[char], total);
    })
    totalCounts.push(total);
  }
}
totalCounts.sort(function(a, b){return a - b})
// console.log(totalCounts);
const resultIndex = parseInt((totalCounts.length) / 2)
console.log(totalCounts[resultIndex]);


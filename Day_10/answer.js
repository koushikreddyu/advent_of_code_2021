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

const illegalCharectors = [];

const openArray = ['{', '<', '[', '(']
const closeArray = ['}', '>', ']', ')']
const mapData = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
for(let i = 0; i < data.length; i++) {
  let openCharectors = [];
  const currentData = data[i].split('');
  // console.log('current data :: ', currentData);
  for(let j = 0; j < currentData.length; j++) {
    if(openArray.indexOf(currentData[j]) !== -1) {
      openCharectors = [currentData[j], ...openCharectors]
    } else {
      if(closeArray.indexOf(currentData[j]) !== openArray.indexOf(openCharectors[0]) ) {
        illegalCharectors.push(currentData[j]);
        break;
      } else {
        openCharectors.shift();
      }
    }
  }
}

const total = illegalCharectors.reduce((sum, e) => {
  sum += mapData[e]
  return sum
}, 0)

console.log(total);
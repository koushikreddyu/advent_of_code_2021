const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'));

// const data = [3,4,3,1,2];
const noOfDays = 256;

const maxDays = Array(9).fill(0);
for (let day of data) {
	maxDays[day]++;
}

for (let i = 0; i < noOfDays; i++) {
	let sevenDayFish = 0;
	let nineDayFish = 0;
	for (let day = 0; day < maxDays.length; day++) {
		let count = maxDays[day];
		if (day === 0) {
			sevenDayFish = count;
			nineDayFish = count;
		} else {
			maxDays[day - 1] = count;
		}
	}

	maxDays[6] += sevenDayFish;

	maxDays[8] = nineDayFish;
}

const totalFishesLength = maxDays.reduce((a, b) => a + b);

console.log(totalFishesLength);
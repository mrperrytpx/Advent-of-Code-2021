const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split(",").map((_) => parseInt(_, 10));

const fish = new Array(9).fill(0);
for (let i = 0; i < file.length; i++) {
    fish[file[i]]++;
}

for (let i = 0; i < 80; i++) {
    const lastDay = fish[0];

    for (let j = 0; j < fish.length - 1; j++) {
        fish[j] = fish[j + 1];
    }

    fish[6] += lastDay;
    fish[8] = lastDay;
}

console.log(fish.reduce((a, b) => a + b));
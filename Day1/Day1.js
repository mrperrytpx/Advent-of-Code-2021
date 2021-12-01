const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input", "utf-8").split("\n").filter((_) => _.trim()).map((_) => parseInt(_, 10));

// PART 1
let increments = 0;

for (let i = 1; i <= file.length; i++) {
    if (file[i] > file[i - 1]) increments++;
}

console.log(increments);

// PART 2

let pairIncrements = 0;
for (let i = 0; i < file.length - 3; i++) {
    if (file.slice(i, i + 3).reduce((a, b) => a + b, 0) < file.slice(i + 1, (i + 1) + 3).reduce((a, b) => a + b, 0)) pairIncrements++;
}

console.log(pairIncrements);
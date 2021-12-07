const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map(Number);

let increments = 0;

for (let i = 0; i <= file.length; i++) {
    if (file[i] < file[i + 1]) increments++;
}

console.log(increments);
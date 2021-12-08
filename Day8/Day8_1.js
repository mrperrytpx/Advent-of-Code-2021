const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

let count = 0;
for (let i = 0; i < file.length; i++) {
    const output = file[i].split("|")[1].trim().split(" ");
    for (j = 0; j < output.length; j++) {
        if (output[j].length === 2) count++;
        if (output[j].length === 3) count++;
        if (output[j].length === 4) count++;
        if (output[j].length === 7) count++;
    }
}

console.log(count);
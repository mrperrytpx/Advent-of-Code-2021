const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

let gamma = [];
let epsilon = [];

const binLength = file[0].length;
let passes = 0;

while (passes < binLength) {
    let zeros = 0, ones = 0;
    for (let i = 0; i < file.length; i++) {
        const bit = file[i][passes];
        bit === "0" ? zeros++ : ones++;
    }
    if (zeros > ones) {
        gamma.push(0);
        epsilon.push(1);
    } else {
        gamma.push(1);
        epsilon.push(0);
    }
    passes++;
}

gamma = parseInt(gamma.join(""), 2);
epsilon = parseInt(epsilon.join(""), 2);

let result = gamma * epsilon;
console.log(result);
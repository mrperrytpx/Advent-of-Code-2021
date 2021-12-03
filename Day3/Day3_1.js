const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

let gamma = [];
let epsilon = [];

const binLength = file[0].length;
let passes = binLength;

while (passes !== 0) {
    let zeros = 0, ones = 0;
    for (let i = 0; i < file.length; i++) {
        const bit = file[i][passes - 1];
        if (bit === "0") {
            zeros++;
        } else {
            ones++;
        }
    }
    if (zeros > ones) {
        gamma.unshift(0);
        epsilon.unshift(1);
    } else {
        gamma.unshift(1);
        epsilon.unshift(0);
    }
    passes--;
}

gamma = parseInt(gamma.join(""), 2);
epsilon = parseInt(epsilon.join(""), 2);


console.log(gamma, epsilon, gamma * epsilon);

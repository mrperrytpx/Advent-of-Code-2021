const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

function oxygen(array, position) {
    if (array.length === 1) return parseInt(array[0], 2);
    let zeros = 0, ones = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i][position] === "0") {
            zeros++;
        } else {
            ones++;
        }
    }
    let bit = zeros <= ones ? "1" : "0";
    return array.filter(bin => bin[position] === bit);
}

let position = 0;
while (position !== file[0].length) {
    let bit = correctBit(file, position);
    let newArray = filteredArray(file, bit, position);
    position++;
}
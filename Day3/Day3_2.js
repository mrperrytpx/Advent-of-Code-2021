const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

const rating = (array, element, position = 0) => {
    if (array.length === 1) return parseInt(array[0], 2);
    let zeros = 0, ones = 0;
    for (let i = 0; i < array.length; i++) {
        array[i][position] === "0" ? zeros++ : ones++;
    }
    let bit;
    switch (element) {
        case "co2":
            bit = ones >= zeros ? "0" : "1";
            break;
        case "oxygen":
            bit = ones >= zeros ? "1" : "0";
            break;
        default:
            bit = "1";
            break;
    }
    let filteredArray = array.filter(binary => binary[position] === bit);
    position++;
    return rating(filteredArray, element, position);
}

let result = rating(file, "oxygen") * rating(file, "co2");
console.log(result);
const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let pairInsertions = {};
for (let i = 1; i < file.length; i++) {
    const pair = file[i].split(" -> ");
    pairInsertions[pair[0]] = pair[1];
}

let polymerTemplate = file[0];
let elements = {};
let pairCount = {};

for (let i = 0; i < polymerTemplate.length; i++) {
    elements[polymerTemplate[i]] = elements[polymerTemplate[i]] ? elements[polymerTemplate[i]] + 1 : 1;
    if (i >= 1) {
        let pair = polymerTemplate[i - 1] + polymerTemplate[i];
        pairCount[pair] = pairCount[pair] ? pairCount[pair] + 1 : 1;
    }
}

for (let i = 0; i < 40; i++) {
    let newPairs = {};

    for (let key in pairCount) {
        const amount = pairCount[key];
        const char = pairInsertions[key];
        elements[char] = elements[char] ? elements[char] + amount : amount;
        const leftPair = key[0] + char;
        const rightPair = char + key[1];
        pairCount[key] = 0;
        newPairs[leftPair] = newPairs[leftPair] ? newPairs[leftPair] + amount : amount;
        newPairs[rightPair] = newPairs[rightPair] ? newPairs[rightPair] + amount : amount;
    }

    pairCount = { ...newPairs };
}

let max = 0, min = Infinity;
for (let key in elements) {
    if (elements[key] > max) max = elements[key];
    if (elements[key] < min) min = elements[key];
}

console.log(max - min);
const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let pairInsertions = {};
for (let i = 1; i < file.length; i++) {
    const pair = file[i].split(" -> ");
    pairInsertions[pair[0]] = pair[1];
}

let polymerTemplate = file[0];

function polymerization(pairs, polymer, fusion = polymer) {

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < fusion.length - 1; j++) {
            let polymerPair = fusion[j] + fusion[j + 1];
            if (pairs[polymerPair]) {
                fusion = fusion.slice(0, j + 1) + pairs[polymerPair] + fusion.slice(j + 1);
                j++;
            }
        }

    }

    return fusion;
}

let finalPolymer = polymerization(pairInsertions, polymerTemplate);
let elementList = {};
for (let i = 0; i < finalPolymer.length; i++) {
    elementList[finalPolymer[i]] = elementList[finalPolymer[i]] ? elementList[finalPolymer[i]] + 1 : 1;
}

let max = 0, min = Infinity;
for (let key in elementList) {
    if (elementList[key] > max) max = elementList[key];
    if (elementList[key] < min) min = elementList[key];
}

console.log(max - min);
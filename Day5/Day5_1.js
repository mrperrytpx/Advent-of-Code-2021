const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

const cooridantes = [];
file.forEach((pair) => {
    let fresh = pair.split("->").map((_) => _.trim());
    cooridantes.push(fresh);
});

let pairs = [];
for (let i = 0; i < cooridantes.length; i++) {
    let pair = cooridantes[i];
    let xy = (pair[0].split(","));
    let xy2 = pair[1].split(",");
    pairs.push([[...xy], [...xy2]]);
}

pairs = pairs.filter((pair) => pair[0][0] === pair[1][0] || pair[0][1] === pair[1][1]);

// console.log(pairs);

let field = {};
let count = 0;
pairs.forEach((pair) => {
    let maxX = Math.max(pair[0][0], pair[1][0]);
    let minX = Math.min(pair[0][0], pair[1][0]);
    let maxY = Math.max(pair[0][1], pair[1][1]);
    let minY = Math.min(pair[0][1], pair[1][1]);
    if (maxX == minX) {
        for (let i = minY; i < maxY; i++) {
            let p = i + ',' + minX;
            field[p] = field[p] == undefined ? 1 : field[p] + 1;
        }
    }
    if (minY == maxY) {
        for (let i = minX; i < maxX; i++) {
            let p = i + ',' + minY;
            field[p] = field[p] == undefined ? 1 : field[p] + 1;
        }
    }
});

for (let key in field) {
    if (field[key] > 1) {
        count++;
    }
}

console.log(count);
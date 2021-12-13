const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

const cooridantes = [];
file.forEach((pair) => {
    const fresh = pair.split("->").map((_) => _.trim());
    cooridantes.push(fresh);
});

let pairs = [];
for (let i = 0; i < cooridantes.length; i++) {
    const pair = cooridantes[i];
    const xy = pair[0].split(",");
    const xy2 = pair[1].split(",");
    pairs.push([[...xy], [...xy2]]);
}

let field = {};
let count = 0;

pairs.forEach((pair) => {
    const maxX = Math.max(pair[0][0], pair[1][0]);
    const minX = Math.min(pair[0][0], pair[1][0]);
    const maxY = Math.max(pair[0][1], pair[1][1]);
    const minY = Math.min(pair[0][1], pair[1][1]);
    if (maxX === minX) {
        for (let i = minY; i <= maxY; i++) {
            const p = maxX + ',' + i;
            field[p] = !field[p] ? 1 : field[p] + 1;
        }
    } else if (minY === maxY) {
        for (let i = minX; i <= maxX; i++) {
            const p = i + ',' + maxY;
            field[p] = !field[p] ? 1 : field[p] + 1;
        }
    } else {
        const diffX = pair[0][0] - pair[1][0];
        const diffY = pair[0][1] - pair[1][1];
        const steps = Math.abs(diffX);
        for (let i = 0; i <= steps; i++) {
            const p = pair[0][0] + ',' + pair[0][1];
            field[p] = !field[p] ? 1 : field[p] + 1;
            if (diffX > 0 && diffY > 0) {
                pair[0][0]--;
                pair[0][1]--;
            }
            if (diffX > 0 && diffY < 0) {
                pair[0][0]--;
                pair[0][1]++;
            }
            if (diffX < 0 && diffY > 0) {
                pair[0][0]++;
                pair[0][1]--;
            }
            if (diffX < 0 && diffY < 0) {
                pair[0][0]++;
                pair[0][1]++;
            }
        }
    }
});

for (let key in field) if (field[key] >= 2) count++;

console.log(count);
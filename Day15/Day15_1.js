const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const COLS = file[0].length;
const ROWS = file.length;

let nodeArray = new Array(ROWS);
for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i] = new Array(COLS);
    for (let j = 0; j < nodeArray[i].length; j++) {
        nodeArray[i][j] = [parseInt(file[i][j]), [i, j]];
    }
}

function isValid(row, col) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return false;
    return [0, [row, col]];
}

let start = [0, [0, 0]];
let end = nodeArray[ROWS - 1][COLS - 1];

let queue = [start];
let locked = new Set();

while (queue.length !== 0) {
    queue.sort((a, b) => a[0] - b[0]);

    let [risk, pos] = queue.shift();

    if (pos[0] === end[1][0] && pos[1] === end[1][1]) {
        console.log(risk);
        break;
    }

    const coord = `${pos[0]},${pos[1]}`;
    if (locked.has(coord)) continue;
    locked.add(coord);

    const up = isValid(pos[0] - 1, pos[1]);
    const down = isValid(pos[0] + 1, pos[1]);
    const left = isValid(pos[0], pos[1] - 1);
    const right = isValid(pos[0], pos[1] + 1);

    const neighbours = [up, left, right, down].filter((elem) => elem !== false);

    for (let i = 0; i < neighbours.length; i++) {
        let [, [row, col]] = neighbours[i];
        neighbours[i][0] = risk + parseInt(file[row][col]);
        queue.push(neighbours[i]);
    }

}
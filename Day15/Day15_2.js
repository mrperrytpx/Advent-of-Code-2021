// "<WARNING></WARNING>"
// ###########################################################
// TERMINALLY BAD CODE BELOW
// ###########################################################
// THREAD WITH CAUTION













const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let second = [];
let third = [];
let forth = [];
let fifth = [];
let sixth = [];
let seventh = [];
let eight = [];
let ninth = [];

function whichArray(idx, row) {
    switch (idx) {
        case 1: {
            second.push(row);
            break;
        }
        case 2: {
            third.push(row);
            break;
        }
        case 3: {
            forth.push(row);
            break;
        }
        case 4: {
            fifth.push(row);
            break;
        }
        case 5: {
            sixth.push(row);
            break;
        }
        case 6: {
            seventh.push(row);
            break;
        }
        case 7: {
            eight.push(row);
            break;
        }
        case 8: {
            ninth.push(row);
            break;
        }

    }
}

for (let k = 1; k <= 8; k++) {
    for (let i = 0; i < file.length; i++) {
        let row = file[i].split("").map(Number);
        for (let j = 0; j < row.length; j++) {
            row[j] = parseInt(row[j]) + k;
            if (row[j] > 9) row[j] = row[j] % 9;
        }
        row = row.map(String).join("");
        whichArray(k, row);
    }
}
let result = [];

for (let i = 0; i < file.length * 5; i++) {
    let line;
    if (i < file.length) {
        line = [...file[i], ...second[i], ...third[i], ...forth[i], ...fifth[i]].join("");
        result.push(line);
    }
    if (i < file.length * 2 && i >= file.length) {
        line = [...second[i - 100], ...third[i - 100], ...forth[i - 100], ...fifth[i - 100], sixth[i - 100]].join("");
        result.push(line);
    }
    if (i < file.length * 3 && i >= file.length * 2) {
        line = [...third[i - 200], ...forth[i - 200], ...fifth[i - 200], ...sixth[i - 200], seventh[i - 200]].join("");
        result.push(line);
    }
    if (i < file.length * 4 && i >= file.length * 3) {
        line = [...forth[i - 300], ...fifth[i - 300], ...sixth[i - 300], ...seventh[i - 300], ...eight[i - 300]].join("");
        result.push(line);
    }
    if (i < file.length * 5 && i >= file.length * 4) {
        line = [...fifth[i - 400], ...sixth[i - 400], ...seventh[i - 400], ...eight[i - 400], ninth[i - 400]].join("");
        result.push(line);
    }
}

const COLS = result[0].length;
const ROWS = result.length;

let nodeArray = new Array(ROWS);
for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i] = new Array(COLS);
    for (let j = 0; j < nodeArray[i].length; j++) {
        nodeArray[i][j] = [parseInt(result[i][j]), [i, j]];
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
        neighbours[i][0] = risk + parseInt(result[row][col]);
        queue.push(neighbours[i]);
    }

}
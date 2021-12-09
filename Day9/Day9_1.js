const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

const ROWS = file.length;
const COLS = file[0].length;

function isValid(grid, row, col) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return "9";
    return grid[row][col];
}

let score = 0;
for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        let above = isValid(file, i - 1, j);
        let below = isValid(file, i + 1, j);
        let leftOf = isValid(file, i, j - 1);
        let rightOf = isValid(file, i, j + 1);
        const array = [above, below, leftOf, rightOf, file[i][j]];
        if (array.every(elem => elem == file[i][j])) continue;
        if (file[i][j] == Math.min(...array)) {
            score += parseInt(file[i][j]) + 1;
        }
    }
}

console.log(score);
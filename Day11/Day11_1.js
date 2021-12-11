const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

let numbers = [];
for (let i = 0; i < file.length; i++) {
    let type = file[i].split("").map(Number);
    numbers.push(type);
}

const ROWS = file.length;
const COLS = file[0].length;

const isInBounds = (row, col) => (row < 0 || col < 0 || row >= ROWS || col >= COLS) ? false : [row, col];

let passes = 0;
let flashes = 0;

while (passes !== 100) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            numbers[i][j] = numbers[i][j] + 1;
        }
    }

    let zeroed = new Set();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            if (numbers[i][j] >= 10) {
                numbers[i][j] = 0;
                checkOctopus(numbers, i, j, zeroed);
            }
        }
    }

    flashes += numbers.flat().filter((elem) => elem == 0).length;

    passes++;
}

function checkOctopus(grid, i, j, zeroed) {
    const coord = `${i},${j}`
    if (zeroed.has(coord)) {
        grid[i][j] = 0;
        return;
    }
    zeroed.add(coord);

    const leftUpCorner = isInBounds(i - 1, j - 1);
    const up = isInBounds(i - 1, j);
    const rightUpCorner = isInBounds(i - 1, j + 1);
    const left = isInBounds(i, j - 1);
    const right = isInBounds(i, j + 1);
    const leftDownCorner = isInBounds(i + 1, j - 1);
    const down = isInBounds(i + 1, j);
    const rightDownCorner = isInBounds(i + 1, j + 1);

    const inBounds = [leftUpCorner, up, rightUpCorner, left, right, leftDownCorner, down, rightDownCorner].filter((elem) => elem !== false);

    for (let k = 0; k < inBounds.length; k++) {
        if (zeroed.has(`${inBounds[k][0]},${inBounds[k][1]}`)) {
            grid[inBounds[k][0]][inBounds[k][1]] = 0;
            continue;
        }

        grid[inBounds[k][0]][inBounds[k][1]] = grid[inBounds[k][0]][inBounds[k][1]] + 1;
    }

    const new10s = inBounds.filter((elem) => grid[elem[0]][elem[1]] >= 10);

    if (!new10s) return;

    for (let k = 0; k < new10s.length; k++) {
        grid[new10s[k][0]][new10s[k][1]] = 0;
        checkOctopus(grid, new10s[k][0], new10s[k][1], zeroed);
    }

    return;
}

let result = [];
for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i].join(" "));
}
console.log("End field: ", result);
console.log(flashes);
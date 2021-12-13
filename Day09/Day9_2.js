const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim())

const ROWS = file.length;
const COLS = file[0].length;

function isValid(row, col) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return "9";
    return [row, col];
}

let sizes = [];
for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        let above = isValid(i - 1, j);
        let below = isValid(i + 1, j);
        let leftOf = isValid(i, j - 1);
        let rightOf = isValid(i, j + 1);
        const mappedArray = [above, below, leftOf, rightOf, file[i][j]].map((elem) => {
            if (typeof elem == 'string') return elem;
            return file[elem[0]][elem[1]];
        });

        if (mappedArray.every(elem => elem == file[i][j])) continue;
        if (file[i][j] == Math.min(...mappedArray)) {
            let size = fieldSize(file, i, j);
            sizes.push(size);
        }
    }
}

function fieldSize(field, row, col, visited = new Set()) {
    let coord = `${row}, ${col}`;
    visited.add(coord);

    let above = isValid(row - 1, col);
    let below = isValid(row + 1, col);
    let leftOf = isValid(row, col - 1);
    let rightOf = isValid(row, col + 1);

    const valid = [above, below, leftOf, rightOf].filter((elem) => elem !== '9'
        && !visited.has(`${elem[0]}, ${elem[1]}`)
        && field[elem[0]][elem[1]] != '9'
    );

    for (let i = 0; i < valid.length; i++) {
        fieldSize(field, valid[i][0], valid[i][1], visited);
    }

    return visited.size;
}

let largestBasinsMultiplied = sizes.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);

console.log(largestBasinsMultiplied);
const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const COLS = file[0].length;
const ROWS = file.length;

let nodeArray = new Array(ROWS);
for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i] = new Array(COLS);
    for (let j = 0; j < nodeArray[i].length; j++) {
        nodeArray[i][j] = {
            "x": j,
            "y": i,
            "risk": parseInt(file[i][j])
        };
    }
}

function isValid(row, col) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return false;
    return nodeArray[row][col];
}


let paths = [];
function idno(start, end) {

    start.previous = { risk: 0 };
    let queue = [start];

    let visited = new Set();

    while (queue.length > 0) {
        let item = queue.shift();

        if (item.x === end.x && item.y === end.y) {
            paths.push(item.risk);
            continue;
        }

        const coord = `${item.y},${item.x}`;
        if (!visited.has(coord)) {
            visited.add(coord);
        } else {
            continue;
        }

        const above = isValid(item.y - 1, item.x);
        const below = isValid(item.y + 1, item.x);
        const leftOf = isValid(item.y, item.x - 1);
        const rightOf = isValid(item.y, item.x + 1);

        const neighbours = [above, below, leftOf, rightOf].filter((elem) => elem !== false && !visited.has(`${elem.y},${elem.x}`));

        for (let i = 0; i < neighbours.length; i++) {
            neighbours[i].previous = { "x": item.x, "y": item.y, "risk": item.risk };
            neighbours[i].risk += item.previous.risk;
        }
        queue = [...queue, ...neighbours].sort((a, b) => b.risk - a.risk);
    }
}

idno(nodeArray[0][0], nodeArray[ROWS - 1][COLS - 1]);
console.log(paths);
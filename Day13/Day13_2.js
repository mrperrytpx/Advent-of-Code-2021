const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim())

let dots = file.filter((elem) => !elem.includes("fold")).map((dot) => dot.split(",").map(Number));
const instructions = file.filter((elem) => elem.includes("fold"));

for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i].split(" ")[2].split("=");
    const direction = instruction[0], amount = parseInt(instruction[1]);

    if (direction == "y") {
        for (let j = 0; j < dots.length; j++) {
            if (dots[j][1] > amount) {
                let newY = (2 * amount) - dots[j][1];
                dots[j][1] = newY;
            }
        }
    } else {
        for (let j = 0; j < dots.length; j++) {
            if (dots[j][0] > amount) {
                let newX = (2 * amount) - dots[j][0];
                dots[j][0] = newX;
            }
        }
    }
}

let unique = new Set(dots.map(pair => pair.toString()));

let maxX = 0; maxY = 0;
for (let i = 0; i < dots.length; i++) {
    let pair = dots[i];
    if (pair[0] > maxX) maxX = pair[0];
    if (pair[1] > maxY) maxY = pair[1];
}

for (let i = 0; i <= maxY; i++) {
    let row = '';
    for (let j = 0; j <= maxX; j++) {
        row += unique.has(`${j},${i}`) ? '#' : '.'
    }
    console.log(row);
}
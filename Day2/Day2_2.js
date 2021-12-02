const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

let depth = 0;
let horizontal = 0;
let aim = 0;

for (let i = 0; i < file.length; i++) {
    const direction = file[i].split(" ");
    switch (direction[0]) {
        case "forward":
            horizontal += parseInt(direction[1]);
            depth += aim * parseInt(direction[1]);
            break;
        case "up":
            aim -= parseInt(direction[1]);
            break;
        case "down":
            aim += parseInt(direction[1]);
    }
}

console.log(depth, horizontal, depth * horizontal);
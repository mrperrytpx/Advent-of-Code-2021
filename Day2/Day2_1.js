const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

let depth = 0;
let horizontal = 0;

for (let i = 0; i < file.length; i++) {
    const direction = file[i].split(" ");
    switch (direction[0]) {
        case "forward":
            horizontal += parseInt(direction[1]);
            break;
        case "up":
            depth -= parseInt(direction[1]);
            break;
        case "down":
            depth += parseInt(direction[1]);
            break;
    }
}

let result = depth * horizontal;
console.log(result);
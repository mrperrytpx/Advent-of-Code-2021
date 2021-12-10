const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

const OPENING = ["[", "{", "(", "<"];
const CLOSING = ["]", "}", ")", ">"];
const SCORE = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

const corrupted = [];
for (let i = 0; i < file.length; i++) {
    let stack = [];
    for (let j = 0; j < file[i].length; j++) {
        if (OPENING.includes(file[i][j])) {
            stack.push(file[i][j]);
        } else {
            let popped = stack.pop();
            if (OPENING.indexOf(popped) != CLOSING.indexOf(file[i][j])) {
                corrupted.push(file[i][j]);
                break;
            }
        }
    }
}

let highscore = 0;
for (let i = 0; i < corrupted.length; i++) {
    highscore += SCORE[corrupted[i]];
}

console.log(highscore);
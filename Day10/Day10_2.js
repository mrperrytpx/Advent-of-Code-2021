const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim())

const OPENING = ["[", "{", "(", "<"];
const CLOSING = ["]", "}", ")", ">"];
const SCORE = { ")": 1, "]": 2, "}": 3, ">": 4 };

let scores = [];
for (let i = 0; i < file.length; i++) {
    let stack = [];
    for (let j = 0; j < file[i].length; j++) {
        if (OPENING.includes(file[i][j])) {
            stack.push(file[i][j]);
        } else {
            let popped = stack.pop();
            if (OPENING.indexOf(popped) != CLOSING.indexOf(file[i][j])) {
                stack = [];
                break;
            }
        }
    }

    let result = 0;
    while (stack.length != 0) {
        let popped = stack.pop();
        let index = OPENING.indexOf(popped);
        let oppositeBracket = CLOSING[index];

        result = result * 5 + SCORE[oppositeBracket];;
    }

    if (result > 0) scores.push(result);
}
scores = scores.sort((a, b) => a - b);
let winner = scores[Math.floor(scores.length / 2)];
console.log(winner);
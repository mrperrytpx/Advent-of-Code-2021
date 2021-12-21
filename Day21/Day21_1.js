const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let playerOnePos = parseInt(file[0][file[0].length - 1]);
let playerTwoPos = parseInt(file[1][file[0].length - 1]);

let playerOneScore = 0;
let playerTwoScore = 0;

let dieRolls = 0;
let turnCount = 1;
let turn = true;

const lastDigit = (num) => num > 10 ? parseInt(num.toString().split("").pop()) : num;

const rolledNumbers = (num) => {
    let result = [num, num - 1, num - 2];
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        if (result[i] > 100) result[i] = lastDigit(result[i]);
    }
    return result;
};

while (playerOneScore < 999 && playerTwoScore < 999) {
    if (turn) {
        let rolls = rolledNumbers(turnCount * 3).reduce((a, b) => a + b);
        playerOnePos += rolls;

        if (playerOnePos % 10 === 0) playerOnePos = 10;

        if (playerOnePos > 10) playerOnePos = lastDigit(playerOnePos);

        playerOneScore += playerOnePos;
        turn = false;
        dieRolls += 3;
        turnCount++;
    } else {
        let rolls = rolledNumbers(turnCount * 3).reduce((a, b) => a + b);
        playerTwoPos += rolls;

        if (playerTwoPos % 10 === 0) playerTwoPos = 10;

        if (playerTwoPos > 10) playerTwoPos = lastDigit(playerTwoPos);

        playerTwoScore += playerTwoPos;
        turn = true;
        dieRolls += 3;
        turnCount++;
    }
}

const loser = Math.min(playerOneScore, playerTwoScore);

let result = loser * dieRolls;
console.log(result);
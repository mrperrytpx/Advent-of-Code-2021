const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

const bingoNumbers = file[0].split(",").map(Number);

const bingoBoards = [];
for (let i = 1; i < file.length; i += 5) {
    let board = [];
    for (let j = 0; j < 5; j++) {
        board.push(file[i + j].split(" ").filter((_) => _.trim()));
    }
    bingoBoards.push(board);
}

const arrayColumn = (array, column) => array.map(e => e[column]);

function checkBoard(number) {
    for (let i = 0; i < bingoBoards.length; i++) {
        let board = bingoBoards[i];
        for (let j = 0; j < board.length; j++) {
            let boardRow = board[j];
            for (let k = 0; k < boardRow.length; k++) {
                if (boardRow[k] == number) boardRow[k] = true;
            }
            if (boardRow.every(num => num === true)) return { "winner": number, "board": bingoBoards[i] };
            let boardColumn = arrayColumn(board, j);
            if (boardColumn.every(num => num === true)) return { "winner": number, "board": bingoBoards[i] };
        }
    }
}

for (let i = 0; i < bingoNumbers.length; i++) {
    let number = bingoNumbers[i];
    let winningBoard = checkBoard(number);
    if (winningBoard) {
        let sum = winningBoard.board.flat()
            .filter((_) => _ !== true)
            .map(Number)
            .reduce((a, b) => a + b);
        let result = sum * winningBoard.winner;
        console.log(result);
        break;
    }
}
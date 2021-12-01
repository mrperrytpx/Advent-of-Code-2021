const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim());

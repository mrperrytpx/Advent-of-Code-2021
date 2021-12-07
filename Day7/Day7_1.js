const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split(",").filter((_) => _.trim()).map(Number);

let leastFuel = 0;
const max = Math.max(...file);

for (let i = 0; i <= max; i++) {
    let fuel = 0;
    for (let j = 0; j < file.length; j++) {
        fuel += Math.abs(i - file[j]);
    }
    if (fuel < leastFuel || leastFuel == 0) leastFuel = fuel;
}

console.log(leastFuel);
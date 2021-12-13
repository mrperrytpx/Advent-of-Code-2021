const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim())

let dots = file.filter((elem) => !elem.includes("fold")).map((dot) => dot.split(",").map(Number));
const instructions = file.filter((elem) => elem.includes("fold"));

for (let i = 0; i < 1; i++) {
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

for (let i = 0; i < dots.length; i++) {
    dots[i] = dots[i].map((elem) => elem.toString()).join(",")
}

let unique = new Set(dots);
console.log(unique.size);
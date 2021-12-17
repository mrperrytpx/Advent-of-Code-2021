const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").trim().split(":");

const coords = file[1].split(",").map((_) => _.trim());

let min = [], max = [];
for (let i = 0; i < coords.length; i++) {
    let left = coords[i].split("..")[0].split("=");
    let right = coords[i].split("..")[1].split("=");
    min.push(left[1]);
    max.push(right.join(""));
}

let minX = min[0], minY = min[1];
let maxX = max[0], maxY = max[1];

let result = (Math.abs(minY) - 1) * Math.abs(minY) / 2;
console.log(result);
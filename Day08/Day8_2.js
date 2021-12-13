const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim())

let result = 0;
for (let i = 0; i < file.length; i++) {
    const input = file[i].split("|")[0].trim().split(" ");
    const output = file[i].split("|")[1].trim().split(" ");

    const one = input.find((elem) => elem.length === 2);
    const seven = input.find((elem) => elem.length === 3);
    const four = input.find((elem) => elem.length === 4);
    const eight = input.find((elem) => elem.length === 7);

    const rightUp = one[0];
    const rightDown = one[1];
    const up = seven.split("").filter((letter) => {
        if (letter === rightUp) return false;
        if (letter === rightDown) return false;
        return true;
    }).toString();
    const leftSide = four.split("").filter((letter) => {
        if (letter === rightUp) return false;
        if (letter === rightDown) return false;
        return true;
    });
    const leftUp = leftSide[0];
    const middle = leftSide[1];

    const others = eight.split("").filter((letter) => {
        if (letter === rightDown) return false;
        if (letter === rightUp) return false;
        if (letter === leftUp) return false;
        if (letter === middle) return false;
        if (letter === up) return false;
        return true;
    });
    const leftDown = others[0];
    const down = others[1];

    let nine = input.filter((elem) => elem.length === 6).filter((elem) => !elem.includes(leftDown) || !elem.includes(down));
    let six = input.filter((elem) => elem.length === 6).filter((elem) => (!elem.includes(rightUp) || !elem.includes(rightDown)));
    let zero = input.filter((elem) => elem.length === 6 && (elem !== nine.join("") && elem !== six.join("")));

    let three = input.filter((elem) => elem.length === 5 && ((!elem.includes(leftDown) || !elem.includes(down)) && (!elem.includes(leftUp) || !elem.includes(middle))));
    let five = input.filter((elem) => elem.length === 5 && (!elem.includes(leftDown) || !elem.includes(down)) && (!elem.includes(rightDown) || !elem.includes(rightUp)));
    let two = input.filter((elem) => elem.length === 5 && (elem !== three.join("") && elem !== five.join("")));

    let outputMap = {
        [one.split("").sort().join("")]: 1,
        [four.split("").sort().join("")]: 4,
        [seven.split("").sort().join("")]: 7,
        [eight.split("").sort().join("")]: 8,
        [zero[0].split("").sort().join("")]: 0,
        [two[0].split("").sort().join("")]: 2,
        [three[0].split("").sort().join("")]: 3,
        [five[0].split("").sort().join("")]: 5,
        [six[0].split("").sort().join("")]: 6,
        [nine[0].split("").sort().join("")]: 9,
    };

    const resultArray = [];
    for (let j = 0; j < output.length; j++) {
        let numeral = outputMap[output[j].split("").sort().join("")];
        resultArray.push(numeral);
    }

    result += parseInt(resultArray.join(""));
}

console.log(result);
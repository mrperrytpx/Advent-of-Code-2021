const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").trim();

let binaryString = "";
for (let i = 0; i < file.length; i++) {
    binaryString += parseInt(file[i], 16).toString(2).padStart(4, 0);
}

function decode(string, startingIndex = 0, sumOfVersions = 0) {
    const versionBinary = string.slice(startingIndex, startingIndex + 3);
    const version = parseInt(versionBinary, 2);

    const typeBinary = string.slice(startingIndex + 3, startingIndex + 6);
    const type = parseInt(typeBinary, 2);

    if (type === 4) {
        let lastPair = false;
        let value = "";
        let step = 0;

        while (lastPair !== true) {
            let startingBitIndex = parseInt(string[startingIndex + 6 + step]);
            let bitGroup = string.slice(startingIndex + 6 + step + 1, startingIndex + 6 + step + 5);

            if (!startingBitIndex) {
                lastPair = true;
            }

            value += bitGroup;
            step += 5;
        }

        value = parseInt(value, 2);
        startingIndex += 6 + step;
    } else {
        let lengthType = parseInt(string[startingIndex + 6]);

        if (lengthType === 0) {
            lengthOfSubpackets = parseInt(string.slice(startingIndex + 6 + 1, startingIndex + 6 + 1 + 15), 2);
            console.log(lengthOfSubpackets);
        }

    }

    sumOfVersions += version;
    return { startingIndex, sumOfVersions };

}

console.log(decode(binaryString));
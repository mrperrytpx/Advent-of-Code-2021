const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").trim();

let binaryString = "";
for (let i = 0; i < file.length; i++) {
    binaryString += parseInt(file[i], 16).toString(2).padStart(4, 0);
}

let versionSum = 0;

function newValue(type, val1, val2) {
    let result = 0;
    switch (type) {
        case 0:
            result = val1 + val2;
            break;
        case 1:
            result = val1 * val2;
            break;
        case 2:
            result = Math.min(val1, val2);
            break;
        case 3:
            result = Math.max(val1, val2);
            break;
        case 5:
            result = val1 > val2 ? 1 : 0;
            break;
        case 6:
            result = val1 > val2 ? 0 : 1;
            break;
        case 7:
            result = val1 === val2 ? 1 : 0;
    }
    return result;
}

function decodePacket(index) {
    const versionBits = binaryString.slice(index, index + 3);
    const version = parseInt(versionBits, 2);
    versionSum += version;
    const typeBits = binaryString.slice(index + 3, index + 6);
    const typeId = parseInt(typeBits, 2);

    index += 6;
    if (typeId === 4) {
        let validPair = true;

        while (validPair !== false) {
            const nextBit = parseInt(binaryString.charAt(index));

            if (nextBit !== 1) validPair = false;
            const bitPair = binaryString.slice(index + 1, index + 5);
            index += 5;
            literalValue += bitPair;
        }
        return index;

    }

    if (typeId !== 4) {
        const lengthTypeId = parseInt(binaryString.charAt(index));

        if (lengthTypeId === 0) {
            index += 1;

            const lengthInBits = binaryString.slice(index, index + 15);
            const lengthOfPackets = parseInt(lengthInBits, 2);
            index += 15;

            let shouldStopAt = index + lengthOfPackets;

            while (index !== shouldStopAt) {
                index = decodePacket(index);
            }

            return index;
        }

        if (lengthTypeId === 1) {
            index += 1;

            const numOfPacketsInBits = binaryString.slice(index, index + 11);
            const numOfPackets = parseInt(numOfPacketsInBits, 2);
            index += 11;

            for (let i = 0; i < numOfPackets; i++) {
                index = decodePacket(index);
            }
        }
    }
    return index;
}

decodePacket(0, 0);
console.log(versionSum);
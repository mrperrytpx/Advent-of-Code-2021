const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").trim();

let binaryString = "";
for (let i = 0; i < file.length; i++) {
    binaryString += parseInt(file[i], 16).toString(2).padStart(4, 0);
}

let versionSum = 0;

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
            index += 5;
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

decodePacket(0);
console.log(versionSum);
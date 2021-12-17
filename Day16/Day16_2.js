const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").trim();

let binaryString = "";
for (let i = 0; i < file.length; i++) {
    binaryString += parseInt(file[i], 16).toString(2).padStart(4, 0);
}

function decodePacket(index) {
    console.log("ENTERED!!!!");
    console.log("Starting with index: ", index);
    const versionBits = binaryString.slice(index, index + 3);
    const version = parseInt(versionBits, 2);

    console.log("Version number is: ", version, versionBits);

    const typeBits = binaryString.slice(index + 3, index + 6);
    const typeId = parseInt(typeBits, 2);

    console.log("Type ID check:", typeId);

    index += 6;
    if (typeId === 4) {
        console.log("Type ID is 4");

        let validPair = true;
        let value = "";

        while (validPair !== false) {
            const bitPair = binaryString.slice(index, index + 5);
            if (bitPair.charAt(0) === "0") {
                validPair = false;
            }
            console.log("Bit pair: ", bitPair);
            if (!validPair) console.log("Stopping because it's 0");
            index += 5;
            value += bitPair.slice(1);
        }
        console.log("VALUE BEFORE CONVERTING: ", value);
        value = parseInt(value, 2);
        console.log("Value of subpacket: ", value);
        return [index, value];

    }

    if (typeId !== 4) {
        console.log("Type ID isn't 4");
        const lengthTypeId = parseInt(binaryString.charAt(index));

        console.log("Length type (0 or 1): ", lengthTypeId);

        if (lengthTypeId === 0) {
            index += 1;
            console.log("Length ID is 0");

            const lengthInBits = binaryString.slice(index, index + 15);
            const lengthOfPackets = parseInt(lengthInBits, 2);

            console.log("Next", lengthOfPackets, "is the sum of lengths of next sub packets");

            index += 15;
            let shouldStopAt = index + lengthOfPackets;
            let subpacketValues = [];

            while (index !== shouldStopAt) {
                const [newIndex, value] = decodePacket(index);
                index = newIndex;
                console.log("Adding ", value, "to subway");
                subpacketValues.push(value);

            }
            let idk = newValue(typeId, subpacketValues);

            console.log("SUBWAY:", subpacketValues, "TYPE: ", typeId, "VALUE FROM SUBWAY:", idk);

            console.log("Index after recursion:", index);
            return [index, idk];
        }

        if (lengthTypeId === 1) {
            console.log("Length ID is 1");
            index += 1;
            const numOfPacketsInBits = binaryString.slice(index, index + 11);
            const numOfPackets = parseInt(numOfPacketsInBits, 2);

            console.log("Number of subpackets following is:", numOfPackets);
            index += 11;

            let subpacketValues = [];

            for (let i = 0; i < numOfPackets; i++) {
                const [newIndex, value] = decodePacket(index);
                index = newIndex;
                subpacketValues.push(value);
            }

            let idk = newValue(typeId, subpacketValues);
            console.log("SUBWAY:", subpacketValues, "TYPE: ", typeId, "VALUE FROM SUBWAY:", idk);

            return [index, idk];
        }
    }
}

console.log("START__________________________________");
console.log("Function end: ", decodePacket(0));

function newValue(type, array) {
    let result = 0;
    switch (type) {
        case 0:
            result = array.reduce((a, b) => a + b, 0);
            break;
        case 1:
            result = array.reduce((a, b) => a * b, 1);
            break;
        case 2:
            result = Math.min(...array);
            break;
        case 3:
            result = Math.max(...array);
            break;
        case 5:
            result = array[0] > array[1] ? 1 : 0;
            break;
        case 6:
            result = array[0] < array[1] ? 1 : 0;
            break;
        case 7:
            result = array[0] === array[1] ? 1 : 0;
    }
    return result;
}
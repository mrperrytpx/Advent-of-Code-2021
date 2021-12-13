const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").split("\n").filter((_) => _.trim()).map((_) => _.replace("\r", ""));

let pairs = [];
for (let i = 0; i < file.length; i++) {
    const pair = file[i].split("-");
    pairs.push(pair);
}

const adjecencyList = new Map();
for (let i = 0; i < pairs.length; i++) {
    let node = pairs[i];
    adjecencyList.set(node[0], []);
    adjecencyList.set(node[1], []);
}

pairs.forEach((pair) => {
    adjecencyList.get(pair[0]).push(pair[1]);
    adjecencyList.get(pair[1]).push(pair[0]);
});

let count = 0;
const depthFirstSearch = (node, visited = new Set()) => {
    if (node === 'end') {
        count += 1;
        return;
    }

    if (node.toLowerCase() === node) visited.add(node);

    const ends = adjecencyList.get(node);
    for (let i = 0; i < ends.length; i++) {
        if (!visited.has(ends[i])) depthFirstSearch(ends[i], visited);
    }

    if (node === node.toLowerCase()) visited.delete(node);
};

depthFirstSearch('start');
console.log(count);
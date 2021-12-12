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
const depthFirstSearch = (start, visited = new Set(), stack = []) => {

    if (start === 'end') count += 1;
    if (start.toLowerCase() === start) visited.add(start);

    stack.push(start);

    const ends = adjecencyList.get(start);

    for (let i = 0; i < ends.length; i++) {
        const idk = ends[i];
        if (!visited.has(idk)) depthFirstSearch(idk, visited, stack);
    }

    stack.pop();
    visited.delete(start);
};

depthFirstSearch('start');
console.log(count);
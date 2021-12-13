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
function depthFirstSearch(node, visited = {}) {
    if (node === 'end') {
        count += 1;
        return;
    }

    if (node === node.toLowerCase()) {
        visited[node] = visited[node] ? visited[node] + 1 : 1;
        let moreThanOnce = 0;

        for (let smallCave in visited) {
            moreThanOnce += visited[smallCave] > 1 ? 1 : 0;
            if (visited[smallCave] > 2) {
                visited[node] -= 1;
                return;
            }
        }
        if (moreThanOnce > 1) {
            visited[node] -= 1;
            return;
        }
    }

    const ends = adjecencyList.get(node);
    for (let i = 0; i < ends.length; i++) {
        if (ends[i] === "start") continue;
        depthFirstSearch(ends[i], visited);
    }

    if (node === node.toLowerCase()) visited[node] -= 1;
}

depthFirstSearch("start");
console.log(count);
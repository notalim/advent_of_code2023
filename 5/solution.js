parseLinesToMaps = (lines) => {
    let megaMap = {};

    lines = lines.split("\n\n");

    lines.forEach((line) => {
        miniMap = line.split(":");
        megaMap[miniMap[0]] = miniMap[1].split("\n").map((x) => x.split(" "));
    });
    Object.keys(megaMap).forEach((key) => {
        megaMap[key] = megaMap[key].slice(1);
        megaMap[key] = megaMap[key].map((x) => x.map((y) => +y));
    });

    return megaMap;
};

function findDestination(seed, map, key) {
    let ranges = map[key];
    for (let i = 0; i < ranges.length; i++) {
        let [destStart, sourceStart, length] = ranges[i];
        let sourceEnd = sourceStart + length - 1;
        if (seed >= sourceStart && seed <= sourceEnd) {
            return destStart + (seed - sourceStart);
        }
    }
    return seed;
}

function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");

    let seeds = lines[0]
        .split(" ")
        .map((x) => +x)
        .slice(1);

    let map = parseLinesToMaps(lines.slice(2).join("\n"));

    let locations = seeds.map((seed) => {
        let current = seed;
        for (let key of Object.keys(map)) {
            current = findDestination(current, map, key);
        }
        return current;
    });

    return Math.min(...locations);
}

console.log(solution());

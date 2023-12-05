parseLinesToMaps = (lines) => {
    let megaMap = {};

    lines = lines.split("\n\n");

    lines.forEach((line) => {
        miniMap = line.split(":");
        megaMap[miniMap[0]] = miniMap[1].split("\n").map((x) => x.split(" "));
    });
    Object.keys(megaMap).forEach((key) => {
        megaMap[key] = megaMap[key].slice(1);
        megaMap[key] = megaMap[key].map((x) => x.map((y) => parseInt(y)));
    });

    return megaMap;
};

mapTheMaps = (map) => {
    let megaMap = {};

    Object.keys(map).forEach((key) => {
        let miniMap = {};
        //  sort
        let input = map[key];
        input = input.sort((a, b) => a[0] - b[0]);

        input.forEach((arr) => {
            let destinationRangeStart = arr[0];
            let sourceRangeStart = arr[1];
            let rangeLength = arr[2];

            for (let i = 0; i < rangeLength; i++) {
                miniMap[sourceRangeStart + i] = destinationRangeStart + i;
            }
        });

        megaMap[key] = miniMap;
    });
    return megaMap;
};

function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");

    let seeds = lines[0]
        .split(" ")
        .map((x) => +x)
        .slice(1);

    let map = parseLinesToMaps(lines.slice(2).join("\n"));

    map = mapTheMaps(map);

    let locations = [];

    // console.log(map);

    seeds.forEach((seed) => {
        let next = seed;
        Object.keys(map).forEach((key) => {
            // console.log("key: ", key);
            
            if (map[key][next] !== undefined) {
                next = map[key][next];
            }
            // console.log("next: ", next);
        });
        locations.push(next);
    });

    let min = Math.min(...locations);

    return min;
}

console.log(solution());

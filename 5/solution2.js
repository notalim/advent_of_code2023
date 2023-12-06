// Not my solution; taken from jashkenas 

const fs = require("fs");
const input = fs
    .readFileSync("input.txt", "utf-8")
    .split("\n\n")
    .map((e) => e.trim());

const seeds = input
    .shift()
    .split(": ")[1]
    .split(" ")
    .map((n) => +n);
const seedPairs = [];
for (let i = 0; i < seeds.length; i += 2)
    seedPairs.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);

const makeMap = (mapText) => {
    const rows = mapText
        .split("\n")
        .slice(1)
        .map((r) => r.split(" ").map((n) => +n));
    const solver = (ranges) => {
        const converters = rows
            .filter(([, src, range]) =>
                ranges.find(([start, end]) => start < src + range && end >= src)
            )
            .sort(([, a], [, b]) => a - b);
        if (!converters.length) return ranges;

        const res = [];
        ranges.forEach(([startA, endA]) => {
            console.log(startA, endA);
            for (const [dest, startB, range] of converters) {
                const endB = startB + range - 1;
                if (startA > endB) continue;
                if (startB > startA)
                    res.push([startA, Math.min(startB - 1, endA)]);
                if (endA < startB) break;
                const interStart = Math.max(startA, startB);
                const interEnd = Math.min(endA, endB);
                res.push([
                    interStart - startB + dest,
                    interEnd - startB + dest,
                ]);
                startA = interEnd + 1;
                if (endA <= endB) break;
            }
            if (startA <= endA) res.push([startA, endA]);
        });
        return res;
    };
    return solver;
};

const maps = input.map(makeMap);
const reduceMaps = (initial) =>
    Math.min(
        ...maps
            .reduce((val, curr) => curr(val), initial)
            .map(([start]) => start)
    );

const p1 = reduceMaps(seeds.map((seed) => [seed, seed]));

const p2 = reduceMaps(seedPairs);

console.log(`Advent of Code Day 5:
Part 1: ${p1}
Part 2: ${p2}`);

parseLines = (lines) => {
    let times = lines[0];
    let distances = lines[1];
    times = times.split(" ").filter((t) => t !== "").map((t) => +t).slice(1);
    distances = distances.split(" ").filter((d) => d !== "").map((d) => +d).slice(1);

    // console.log("times: ", times);
    // console.log("distances: ", distances);

    let races = [];

    times.forEach((time, i) => {
        races[i] = [time, distances[i]];
    });

    return races;
};

findTimes = (time, recordDistance) => {
    let times = [];

    for (let holdTime = 1; holdTime <= recordDistance; holdTime++) {
        let speed = holdTime;

        let currDistance = speed * (time - holdTime);

        if (currDistance > recordDistance) {
            times.push(holdTime);
        }
    }

    // console.log("times: ", times)
    return times.length;
};

function solution() {
    const fs = require("fs");
    const lines = fs
        .readFileSync("input.txt", "utf-8").split("\n");

    let parsedTimesAndDistances = parseLines(lines);

    let acc = 1;

    for (let timeAndDistance of parsedTimesAndDistances) {
        let time = timeAndDistance[0];
        let distance = timeAndDistance[1];

        acc *= findTimes(time, distance);
    }

    return acc;
}

console.log(solution());

parseLines = (lines) => {
    let time = lines[0].split(":")[1];
    let distance = lines[1].split(":")[1];

    for (let char of time) {
        if (char === " ") {
            time = time.replace(char, "");
        }
    }

    for (let char of distance) {
        if (char === " ") {
            distance = distance.replace(char, "");
        }
    }

    time = +time;
    distance = +distance;

    return [time, distance];
};

findTimes = (time, recordDistance) => {
    const calculateDistance = (holdTime) => holdTime * (time - holdTime);

    let start = 1;
    let end = time;
    let lowerBound;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (calculateDistance(mid) <= recordDistance) {
            start = mid + 1;
        } else {
            lowerBound = mid;
            end = mid - 1;
        }
    }

    start = lowerBound;
    end = time;
    let upperBound;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (calculateDistance(mid) > recordDistance) {
            upperBound = mid;
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    if (upperBound === undefined) {
        upperBound = time;
    }

    if (lowerBound !== undefined && upperBound >= lowerBound) {
        return upperBound - lowerBound + 1;
    }

    return 0;
};

function solution() {
    const fs = require("fs");
    const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

    let parsedTimeAndDistance = parseLines(lines);

    return findTimes(parsedTimeAndDistance[0], parsedTimeAndDistance[1]);
}

console.log(solution());

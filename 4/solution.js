const { parse } = require("path");

function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");
    let sum = 0;

    let pointsMap = {
        0: 0,
        1: 1,
        2: 2,
        3: 4,
        4: 8,
        5: 16,
        6: 32,
        7: 64,
        8: 128,
        9: 256,
        10: 512,
    };

    let newlines = [];

    lines.forEach((line) => {
        let newline = line.substring(line.indexOf(":") + 1);
        newlines.push(newline);
    });

    let scratchCards = [];

    newlines.forEach((line) => {
        let scratchCard = line.split("|");

        // split one every two characters
        scratchCard[0] = scratchCard[0];
        scratchCard[1] = scratchCard[1];

        let winningNumbers = scratchCard[0].match(/.{1,3}/g);
        winningNumbers = winningNumbers.map((number) => {
            return number.trim();
        });

        let gotNumbers = scratchCard[1].match(/.{1,3}/g);
        gotNumbers = gotNumbers.map((number) => {
            return number.trim();
        });

        // console.log(winningNumbers, gotNumbers);

        let found = 0;

        winningNumbers.forEach((winningNumber) => {
            if (gotNumbers.includes(winningNumber)) {
                found++;
            }
        });
        // console.log("Found " + found + " numbers", "\nPoints: " + pointsMap[found])
        sum += pointsMap[found];
    });

    return sum;
}

console.log(solution());

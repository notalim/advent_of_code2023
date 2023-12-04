const { parse } = require("path");

function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");
    let amountOfScratchCards = lines.length;

    let scratchCardsMap = {};

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

    for (let i = 1; i < amountOfScratchCards + 1; i++) {
        scratchCardsMap[i] = 1;
    }

    let newlines = [];

    lines.forEach((line) => {
        let newline = line.substring(line.indexOf(":") + 1);
        newlines.push(newline);
    });

    let scratchCards = [];

    let cardIndex = 1;

    newlines.forEach((line, index) => {
        cardIndex++;
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

        let found = winningNumbers.reduce(
            (count, num) => count + gotNumbers.includes(num),
            0
        );

        if (found > 0) {
            for (let i = 0; i < found; i++) {
                let nextCardIndex = index + 2 + i;
                if (!scratchCardsMap[nextCardIndex]) {
                    scratchCardsMap[nextCardIndex] = 0;
                }
                scratchCardsMap[nextCardIndex] += scratchCardsMap[index + 1];
            }
        }
    });

    let sum = 0;

    sum = Object.values(scratchCardsMap).reduce((a, b) => a + b, 0);

    return sum;
}

console.log(solution());

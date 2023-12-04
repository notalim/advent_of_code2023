DIGITS = "0123456789";

NCS = "0123456789.";

STAR = "*";

function isStar(character) {
    return character === "*";
}

function getFullNumber(lines, line_index, char_index) {
    let number = "";

   
    let i = char_index;
    while (i >= 0 && lines[line_index][i].match(/\d/)) {
        i--;
    }
    i++;

    while (i < lines[line_index].length && lines[line_index][i].match(/\d/)) {
        number += lines[line_index][i];
        i++;
    }

    return number;
}

function isDigit(character) {
    return !isNaN(character) && character !== " ";
}

findAdjacentNumbers = (lines, line_index, char_index) => {
    let adjacentNumbers = [];
    // number could be multiple digits long

    // getFullNumber upper left
    if (
        line_index > 0 &&
        char_index > 0 &&
        isDigit(lines[line_index - 1][char_index - 1])
    ) {
        let upper_left = getFullNumber(lines, line_index - 1, char_index - 1);
        adjacentNumbers.push(upper_left);
    }

    // getFullNumber upper middle
    if (line_index > 0 && isDigit(lines[line_index - 1][char_index])) {
        let upper_middle = getFullNumber(lines, line_index - 1, char_index);
        adjacentNumbers.push(upper_middle);
    }

    // getFullNumber upper right
    if (
        line_index > 0 &&
        char_index < lines[line_index].length - 1 &&
        isDigit(lines[line_index - 1][char_index + 1])
    ) {
        let upper_right = getFullNumber(lines, line_index - 1, char_index + 1);
        adjacentNumbers.push(upper_right);
    }

    // getFullNumber middle right
    if (
        char_index < lines[line_index].length - 1 &&
        isDigit(lines[line_index][char_index + 1])
    ) {
        let middle_right = getFullNumber(lines, line_index, char_index + 1);
        adjacentNumbers.push(middle_right);
    }

    // getFullNumber lower right
    if (
        line_index < lines.length - 1 &&
        char_index < lines[line_index].length - 1 &&
        isDigit(lines[line_index + 1][char_index + 1])
    ) {
        let lower_right = getFullNumber(lines, line_index + 1, char_index + 1);
        adjacentNumbers.push(lower_right);
    }

    // getFullNumber lower middle
    if (
        line_index < lines.length - 1 &&
        isDigit(lines[line_index + 1][char_index])
    ) {
        let lower_middle = getFullNumber(lines, line_index + 1, char_index);
        adjacentNumbers.push(lower_middle);
    }

    // getFullNumber lower left
    if (
        line_index < lines.length - 1 &&
        char_index > 0 &&
        isDigit(lines[line_index + 1][char_index - 1])
    ) {
        let lower_left = getFullNumber(lines, line_index + 1, char_index - 1);
        adjacentNumbers.push(lower_left);
    }

    // getFullNumber middle left
    if (char_index > 0 && isDigit(lines[line_index][char_index - 1])) {
        let middle_left = getFullNumber(lines, line_index, char_index - 1);
        adjacentNumbers.push(middle_left);
    }

    // remove all duplicates
    adjacentNumbers = [...new Set(adjacentNumbers)];
    // console.log("adjacentNumbers: ", adjacentNumbers);
    return adjacentNumbers;
};



function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");

    // gear ratio is a product of exactly two neighboring number to a star
    let sumOfGearRatios = 0;

    for (let line_index = 0; line_index < lines.length; line_index++) {
        let line = lines[line_index];

        for (let char_index = 0; char_index < line.length; char_index++) {
            let character = line[char_index];

            if (isStar(character)) {
                let adjacentNumbers = findAdjacentNumbers(lines, line_index, char_index);

                if (adjacentNumbers.length === 2) {
                    console.log("Found a gear ratio at line ", line_index + 1, ", char ", char_index + 1,": ", adjacentNumbers[0], "*", adjacentNumbers[1]);
                    let gearRatio = adjacentNumbers[0] * adjacentNumbers[1];
                    sumOfGearRatios += gearRatio;
                }
            }
        }
    }

    return sumOfGearRatios;
}

console.log(solution());

DIGITS = "0123456789";

NCS = "0123456789.";

function isSymbol(character) {
    return character !== "." && !DIGITS.includes(character);
}

function hasAdjacentSymbol(lines, line_index, char_index, number_length) {
    if (line_index > 0) {
        for (let i = char_index; i < char_index + number_length; i++) {
            if (isSymbol(lines[line_index - 1][i])) {
                return true;
            }
        }
    }

    if (line_index + 1 < lines.length) {
        for (let i = char_index; i < char_index + number_length; i++) {
            if (isSymbol(lines[line_index + 1][i])) {
                return true;
            }
        }
    }

    if (char_index > 0 && isSymbol(lines[line_index][char_index - 1])) {
        return true;
    }

    if (
        char_index + number_length < lines[line_index].length &&
        isSymbol(lines[line_index][char_index + number_length])
    ) {
        return true;
    }

    if (
        line_index > 0 &&
        char_index > 0 &&
        isSymbol(lines[line_index - 1][char_index - 1])
    ) {
        return true;
    }

    if (
        line_index > 0 &&
        char_index + number_length < lines[line_index].length &&
        isSymbol(lines[line_index - 1][char_index + number_length])
    ) {
        return true;
    }

    if (
        line_index + 1 < lines.length &&
        char_index > 0 &&
        isSymbol(lines[line_index + 1][char_index - 1])
    ) {
        return true;
    }

    if (
        line_index + 1 < lines.length &&
        char_index + number_length < lines[line_index].length &&
        isSymbol(lines[line_index + 1][char_index + number_length])
    ) {
        return true;
    }

    return false;
}

function solution() {
    const fs = require("fs");
    const input = fs.readFileSync("input.txt", "utf8");
    let lines = input.split("\n");
    let sum = 0;

    for (let line_index = 0; line_index < lines.length; line_index++) {
        let line = lines[line_index];

        for (let char_index = 0; char_index < line.length; char_index++) {
            if (DIGITS.includes(line[char_index])) {
                let number = "";
                let number_index = char_index;

                while (
                    number_index < line.length &&
                    DIGITS.includes(line[number_index])
                ) {
                    number += line[number_index];
                    number_index++;
                }

                if (
                    hasAdjacentSymbol(
                        lines,
                        line_index,
                        char_index,
                        number.length
                    )
                ) {
                    sum += parseInt(number, 10);
                } else {
                    line =
                        line.substring(0, char_index) +
                        ".".repeat(number.length) +
                        line.substring(number_index);
                }

                char_index = number_index - 1;
            }
        }
        lines[line_index] = line;
    }

    const output = lines.join("\n");
    fs.writeFileSync("output.txt", output);

    return sum;
}

console.log(solution());

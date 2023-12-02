

splitter = (game_string) => {
    [MAX_RED, MAX_GREEN, MAX_BLUE] = [0, 0, 0];
    // Game 1: 10 green, 5 blue; 1 red, 9 green, 10 blue; 5 blue, 6 green, 2 red; 7 green, 9 blue, 1 red; 2 red, 10 blue, 10 green; 7 blue, 1 red
    // format of the string
    // should return an array of sums of red, green, blue

    let pure_string = game_string.split(":")[1];

    let game_array = pure_string.split(";");

    let possible = true;

    game_array.forEach((game) => {
        game = game.trim();
        let game_split = game.split(",");
        game_split.forEach((color) => {
            color = color.trim();
            if (color.includes("red")) {
                let num_of_cubes = color.split(" ")[0];
                if (parseInt(num_of_cubes) > MAX_RED) {
                    // console.log(num_of_cubes, MAX_RED);
                    MAX_RED = parseInt(num_of_cubes);
                }
            } else if (color.includes("green")) {
                let num_of_cubes = color.split(" ")[0];
                if (parseInt(num_of_cubes) > MAX_GREEN) {
                    // console.log(num_of_cubes, MAX_GREEN);
                    MAX_GREEN = parseInt(num_of_cubes);
                }
            } else if (color.includes("blue")) {
                let num_of_cubes = color.split(" ")[0];
                if (parseInt(num_of_cubes) > MAX_BLUE) {
                    // console.log(num_of_cubes, MAX_BLUE);
                    MAX_BLUE = parseInt(num_of_cubes);
                }
            }
        });
    });

    return [MAX_RED, MAX_GREEN, MAX_BLUE];
};

solution = () => {
    // read input.txt

    let fs = require("fs");

    let input = fs.readFileSync("input.txt", "utf8");

    // iterate through line by line
    let lines = input.split("\n");

    let sumOfPowers = 0;
    let id = 1;
    lines.forEach((line) => {
        [MAX_RED, MAX_GREEN, MAX_BLUE] = splitter(line);
        console.log("Game " + id + ": " + MAX_RED + " red, " + MAX_GREEN + " green, " + MAX_BLUE + " blue")
        sumOfPowers += MAX_RED * MAX_GREEN * MAX_BLUE;
        id++;
    });

    return sumOfPowers;
};

console.log(solution());

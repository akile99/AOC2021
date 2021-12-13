const fs = require("fs");

// How many measurements are larger than the previous measurement?

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const movement = data.toString().split("\n");

  function part1(array) {
    let horizontal = 0;
    let depth = 0;

    function moveSub(move) {
      // forward X increases the horizontal position by X units.
      // down X increases the depth by X units.
      // up X decreases the depth by X units.

      let m = move.split(" ");
      if (m[0] === "forward") {
        horizontal += parseInt(m[1]);
      } else if (m[0] === "down") {
        depth += parseInt(m[1]);
      } else {
        depth -= parseInt(m[1]);
      }
    }

    array.forEach(moveSub);
    console.log(
      `Part1:\nHorizonal position: ${horizontal}\nDepth position: ${depth}\nMultiplied: ${
        horizontal * depth
      }\n`
    );
  }

  function part2(array) {
    let horizontal = 0;
    let aim = 0;
    let depth = 0;

    function moveAndAimSub(move) {
      // down X increases your aim by X units.
      // up X decreases your aim by X units.
      // forward X does two things:
      // It increases your horizontal position by X units.
      // It increases your depth by your aim multiplied by X.
      const m = move.split(" ");
      const m1 = parseInt(m[1]);
      if (m[0] === "forward") {
        horizontal += m1;
        depth += aim * m1;
      } else if (m[0] === "down") {
        aim += m1;
      } else {
        aim -= m1;
      }
    }
    array.forEach(moveAndAimSub);
    console.log(
      `Part2:\nHorizonal position: ${horizontal}\nDepth position: ${depth}\nMultiplied: ${
        horizontal * depth
      }`
    );
  }

  part1(movement);
  part2(movement);
});

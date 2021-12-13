const fs = require("fs");
const path = require("path");

const fileName = "test.txt";

const input = fs
  .readFileSync(path.join(__dirname, fileName), "utf8")
  .split("\n");

let octopi = input.map((l) => l.split("").map((oct) => parseInt(oct, 10)));
let flashCount = 0;

console.log(`Part1: ${howManyFlashIn100(100)}`);
console.log(`Part2: ${howLongUntilAll100Fire()}`);

function howManyFlashIn100(increments) {
  octopi = input.map((l) => l.split("").map((oct) => parseInt(oct, 10)));
  let flashes = [];
  for (let i = 0; i < increments; i++) {
    incrementOctopus();
    flashes.push(flashCount);
  }
  return flashes.reduce((acc, current) => acc + current);
}

function howLongUntilAll100Fire() {
  octopi = input.map((l) => l.split("").map((oct) => parseInt(oct, 10)));
  let flashes = [];
  let i = 0;
  while (flashCount !== 100) {
    incrementOctopus();
    flashes.push(flashCount);
    i++;
  }

  return flashes.length;
}

function incrementOctopus() {
  flashCount = 0;
  for (let r = 0; r < octopi.length; r++) {
    for (let c = 0; c < octopi[0].length; c++) {
      octopi[r][c] += 1;
    }
  }
  for (let r = 0; r < octopi.length; r++) {
    for (let c = 0; c < octopi[0].length; c++) {
      if (octopi[r][c] > 9) {
        flashCount += 1;
        octopi[r][c] = 0;
        surroundingOctopi(r, c);
      }
    }
  }
  return flashCount;
}

function surroundingOctopi(row, col) {
  // console.log(row, col);
  // up
  if (row - 1 >= 0) {
    // console.log(`up`);
    r = row - 1;
    incrementOcti(r, col);
  }
  //down
  if (row + 1 < octopi.length) {
    // console.log(`down`);

    r = row + 1;
    incrementOcti(r, col);
  }
  // left
  if (col - 1 >= 0) {
    // console.log(`left`);

    c = col - 1;
    incrementOcti(row, c);
  }
  // right
  if (col + 1 < octopi[0].length) {
    // console.log(`right`);

    c = col + 1;
    incrementOcti(row, c);
  }
  // topRight
  if (col + 1 < octopi[0].length && row - 1 >= 0) {
    // console.log(`topRight`);

    c = col + 1;
    r = row - 1;
    incrementOcti(r, c);
  }
  // bottomRight
  if (col + 1 < octopi[0].length && row + 1 < octopi.length) {
    // console.log(`bottomRight`);

    c = col + 1;
    r = row + 1;
    incrementOcti(r, c);
  }
  // topLeft
  if (col - 1 >= 0 && row - 1 >= 0) {
    // console.log(`topLeft`);

    c = col - 1;
    r = row - 1;
    incrementOcti(r, c);
  }
  // bottomLeft
  if (col - 1 >= 0 && row + 1 < octopi.length) {
    // console.log(`bottomLeft`);

    c = col - 1;
    r = row + 1;
    incrementOcti(r, c);
  }

  function incrementOcti(r, c) {
    if (octopi[r][c] > 0) {
      octopi[r][c] += 1;
      if (octopi[r][c] > 9) {
        flashCount++;
        octopi[r][c] = 0;
        surroundingOctopi(r, c);
      }
    }
  }
}

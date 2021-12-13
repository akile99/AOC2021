const fs = require("fs");
const path = require("path");

const fileName = "input.txt";

const input = fs
  .readFileSync(path.join(__dirname, fileName), "utf8")
  .split("\n");

const low = findLowPoints(input);
console.log(`Part1:\nRisk Level: ${risKLevel(low)}`);
const sizes = buildBasins(low);
console.log(`Part2:\nBasins Mult: ${findHighestThree(sizes)}`);

function findLowPoints(input) {
  let lowPoints = {};

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      let number = parseInt(input[row][col]);
      let up = !input[row - 1] ? 10 : parseInt(input[row - 1][col]);
      let down = !input[row + 1] ? 10 : parseInt(input[row + 1][col]);
      let right = !input[row][col + 1] ? 10 : parseInt(input[row][col + 1]);
      let left = !input[row][col - 1] ? 10 : parseInt(input[row][col - 1]);

      // if number < one up && one right && one down && one left or if they exist
      if (number < up && number < down && number < right && number < left)
        lowPoints[row.toString() + col.toString()] = point(row, col, input);
    }
  }
  return lowPoints;
}

function findHighestThree(arr) {
  let first = 0;
  let second = 0;
  let third = 0;
  for (value of arr) {
    if (value > first) {
      first = value;
    } else if (value > second) {
      second = value;
    } else if (value > third) {
      third = value;
    }
  }
  return first * second * third;
}

function risKLevel(obj) {
  let total = 0;
  for (i in obj) {
    total += obj[i].value + 1;
  }
  return total;
}

function buildBasins(obj) {
  let basins = [];
  for (i in obj) {
    basins.push(findBasin(obj[i]));
  }

  return basins;
}

function point(row, col, input) {
  return {
    value: parseInt(input[row][col]),
    row: row,
    col: col,
  };
}

function getAdjacentPoints(coordinate, input) {
  const row = coordinate.row;
  const col = coordinate.col;
  const up = row - 1 >= 0 ? point(row - 1, col, input) : Infinity;
  const down = row + 1 < input.length ? point(row + 1, col, input) : Infinity;
  const left = col - 1 >= 0 ? point(row, col - 1, input) : Infinity;
  const right =
    col + 1 <= input[0].length ? point(row, col + 1, input) : Infinity;

  return { up, down, left, right };
}

function findBasin(lowpoint) {
  const { row, col } = lowpoint;
  let basin = {};
  let visited = {};
  let queue = [];
  let size = 0;

  storeBasinValues(row, col);
  queue.push(lowpoint);

  let adj = getAdjacentPoints(lowpoint, input);

  // Current Position
  let cp = queue[0];
  while (queue.length > 0) {
    for (i in adj) {
      if (adj[i].value < 9 && adj[i].value > cp.value) {
        storeBasinValues(adj[i].row, adj[i].col);
        if (!visited[(adj[i].row, adj[i].col)]) {
          queue.push(point(adj[i].row, adj[i].col, input));
        }
      }
    }
    visited[cp.row.toString() + cp.col.toString()] = true;
    cp = queue.pop();
    adj = getAdjacentPoints(cp, input);
  }

  function storeBasinValues(row, col) {
    basin[row.toString() + col.toString()] = point(row, col, input);
  }

  for (i in basin) {
    size++;
  }
  return size;
  // return basin;
}

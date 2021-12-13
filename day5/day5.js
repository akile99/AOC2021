const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.toString().split("\n");

  let valuePairs = [];
  let lines = {};

  for (coords of input) {
    coords = coords.toString().split(" -> ");
    coords = coords.toString().split(",");
    valuePairs.push(coords);
  }

  for (coords of valuePairs) {
    if (coords[0] === coords[2] || coords[1] === coords[3]) {
      drawLine(coords);
    } else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      drawLine(coords);
    }
  }

  function plotCoords(x, y) {
    let key = x.toString().concat(" - " + y);
    if (lines[key] > 0) {
      lines[key] += 1;
    } else {
      lines[key] = 1;
    }
  }

  function drawLine(coords) {
    let lineLength = 0;
    const x1 = parseInt(coords[0]);
    const x2 = parseInt(coords[2]);
    const y1 = parseInt(coords[1]);
    const y2 = parseInt(coords[3]);

    if (x1 === x2) {
      lineLength = Math.abs(y2 - y1);
      for (let i = 0; i <= lineLength; i++) {
        if (y1 > y2) {
          plotCoords(x1, y2 + i);
        } else {
          plotCoords(x1, y1 + i);
        }
      }
    } else if (y1 === y2) {
      lineLength = Math.abs(x2 - x1);
      for (let i = 0; i <= lineLength; i++) {
        if (x1 > x2) {
          plotCoords(x2 + i, y1);
        } else {
          plotCoords(x1 + i, y1);
        }
      }
    } else {
      // Determine the line angle and plot points
      if (x1 > x2 && y1 > y2) {
        for (let i = 0; i <= x1 - x2; i++) {
          plotCoords(x2 + i, y2 + i);
        }
      } else if (x1 < x2 && y1 > y2) {
        for (let i = 0; i <= x2 - x1; i++) {
          plotCoords(x1 + i, y1 - i);
        }
      } else if (x1 > x2 && y1 < y2) {
        for (let i = 0; i <= x1 - x2; i++) {
          plotCoords(x2 + i, y2 - i);
        }
      } else if (x1 < x2 && y1 < y2) {
        for (let i = 0; i <= x2 - x1; i++) {
          plotCoords(x1 + i, y1 + i);
        }
      }
    }
  }

  let count = 0;
  for (i in lines) {
    if (lines[i] > 1) {
      count++;
    }
  }

  console.log(count);
});

const fs = require("fs");

// How many measurements are larger than the previous measurement?

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const measurements = data.toString().split("\n");
  const depthsInt = measurements.map((i) => parseInt(i));

  function compareDepths(array) {
    let count = 0;
    let previousDepth;
    let depth;
    for (depth of array) {
      depth = depth;
      if (!previousDepth) {
        previousDepth = depth;
      }
      if (depth > previousDepth) {
        previousDepth = depth;
        count++;
      }
      previousDepth = depth;
    }
    return count;
  }

  function compareThreeDepthsToPreviousThree(array) {
    let previousWindow;
    let currentWindow;
    let count = 0;

    for (i in array) {
      currentWindow = array[i] + array[i - 1] + array[i - 2];
      if (!previousWindow) {
        previousWindow = currentWindow;
      }
      if (currentWindow > previousWindow) {
        count++;
      }
      previousWindow = currentWindow;
    }
    return count;
  }

  console.log(`Part 1: ${compareDepths(depthsInt)}`);
  console.log(`Part 2: ${compareThreeDepthsToPreviousThree(depthsInt)}`);
});

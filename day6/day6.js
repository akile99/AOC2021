const fs = require("fs");

fs.readFile("./test.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.toString().split(",");

  function addFishToHash(fishes, fishCounter) {
    for (fish of fishes) {
      if (!fishCounter[fish]) {
        fishCounter[fish] = 1;
      } else {
        fishCounter[fish]++;
      }
    }
    return fishCounter;
  }

  function LoopThroughFishCounterAddFish(fishCounter) {
    let newCounter = 0;
    for (counter in fishCounter) {
      if (counter > 0) {
        fishCounter[counter - 1] += fishCounter[counter];
        fishCounter[counter] = 0;
        if (counter == 8) {
          fishCounter[7] -= newCounter;
          fishCounter[counter] += newCounter;
        }
      } else {
        fishCounter[8] += fishCounter[counter];
        newCounter = fishCounter[counter];
        fishCounter[counter] = 0;
      }
    }
    fishCounter[6] += newCounter;
  }

  function simulateFish(days, fishCounter) {
    for (let day = 0; day < days; day++) {
      LoopThroughFishCounterAddFish(fishCounter);
    }
    return fishCounter;
  }

  function countFish(fishCounter) {
    let count = 0;
    for (fish in fishCounter) {
      count += fishCounter[fish];
    }
    return count;
  }

  function runForDays(days) {
    let fishCounter = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    let fishes = input.map((e) => parseInt(e));

    fishCounter = addFishToHash(fishes, fishCounter);
    fishCounter = simulateFish(days, fishCounter);
    return countFish(fishCounter);
  }

  console.log(`Part1: ${runForDays(80)}\nPart2: ${runForDays(256)}`);
});

// In this example, after 18 days, there are a total of 26 fish.
// After 80 days, there would be a total of 5934.

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let inputs = data.toString().split(/,|\n/);
  inputs = inputs.reduce((obj, cur) => {
    if (obj[cur] != undefined) obj[cur]++;
    else obj[cur] = 1;
    return obj;
  }, []);

  // Part1
  let centerKey = findCenterKey(inputs);
  console.log(`Part1:\nFuel Used: ${calculateFuel1(inputs, centerKey)}`);

  // Part2
  let centerNumber = findCenterNumber(inputs);
  console.log(`Part2:\nFuel Used: ${calculateFuel2(inputs, centerNumber)}`);
});

function findCenterKey(inputs) {
  let total = inputs.reduce((arr, cur) => (cur ? arr + cur : arr));
  let currentIndex = -1;
  let centerIndex = parseInt(total / 2);

  while (centerIndex > 0) {
    do {
      currentIndex++;
    } while (!inputs[currentIndex]);
    centerIndex -= inputs[currentIndex];
  }
  return currentIndex;
}

function calculateFuel1(inputs, centerIndex) {
  return inputs.reduce((arr, cur, i) => {
    if (cur) arr += Math.abs(centerIndex - i) * cur;
    return arr;
  }, 0);
}

function findCenterNumber(inputs) {
  let length = inputs.reduce((arr, cur) => (cur ? arr + cur : arr));
  let total = inputs.reduce((arr, cur, i) => (cur ? arr + cur * i : arr));

  return parseInt(total / length);
}

function calculateFuel2(inputs, centerNumber) {
  let fuel = 0;
  let total = 0;

  for (let i = 0; i <= centerNumber; i++) {
    total += i;
    if (inputs[centerNumber - i]) {
      fuel += total * inputs[centerNumber - i];
    }
  }

  total = 0;
  for (let i = centerNumber + 1; i < inputs.length; i++) {
    total += i - centerNumber;
    if (inputs[i]) {
      fuel += total * inputs[i];
    }
  }

  return fuel;
}

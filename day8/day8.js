const fs = require("fs");
const path = require("path");

const fileName = "input.txt";

const input = fs
  .readFileSync(path.join(__dirname, fileName), "utf8")
  .split("\n")
  .map((entry) => {
    const [signalPatterns, output] = entry.split(" | ");
    return {
      signalPatterns: signalPatterns.split(" "),
      output: output.split(" "),
    };
  });

function findUniqueNumber(input) {
  let unique = [];
  for (i in input) {
    for (entry of input[i].output) {
      if (entry.length !== 5 && entry.length !== 6) {
        unique.push(entry);
      }
    }
  }

  return unique;
}

function storeUniqueNumbers(entry) {
  let unique = {};
  for (key of entry) {
    switch (key.length) {
      case 2:
        unique[1] = key;
        break;
      case 3:
        unique[7] = key;
        break;
      case 4:
        unique[4] = key;
        break;
      case 7:
        unique[8] = key;
        break;
    }
  }

  return unique;
}

function storeUnknownNumbers(entry, unique) {
  let unknowns = {};

  for (key of entry) {
    let commonWith1 = isCommonWithUnique(key, unique[1]);
    let commonWith4 = isCommonWithUnique(key, unique[4]);
    if (key.length === 6 && commonWith4 === 4) {
      unknowns[9] = key;
    } else if (key.length === 6 && commonWith1 === 2) {
      unknowns[0] = key;
    } else if (key.length === 6) {
      unknowns[6] = key;
    } else if (key.length === 5 && commonWith1 === 2) {
      unknowns[3] = key;
    } else if (key.length === 5 && commonWith1 === 1 && commonWith4 === 3) {
      unknowns[5] = key;
    } else if (key.length === 5 && commonWith1 === 1 && commonWith4 === 2) {
      unknowns[2] = key;
    }
  }
  return unknowns;
}

function isCommonWithUnique(unknown, unique) {
  let common = 0;

  for (letter of unknown) {
    if (unique.includes(letter)) {
      common++;
    }
  }
  return common;
}

function getAllKeys(entry) {
  let uniqueKeys = storeUniqueNumbers(entry.signalPatterns);
  let unknownsKeys = storeUnknownNumbers(entry.signalPatterns, uniqueKeys);
  let allKeys = {
    ...unknownsKeys,
    ...uniqueKeys,
  };
  return allKeys;
}

function checkIfValue(value, allKeys) {
  const keys = Object.keys(allKeys);
  const values = Object.values(allKeys);

  for (index in allKeys) {
    if (
      value.split("").every((i) => values[index].includes(i)) &&
      value.length === values[index].length
    ) {
      return keys[index];
    }
  }
}

function getValues(output, allKeys) {
  let values = [];

  for (value of output) {
    values.push(checkIfValue(value, allKeys));
  }

  return parseInt(values.toString().replace(/,/g, ""));
}

function decodeOutput(input) {
  let allKeys;
  let total = 0;

  let i = 0;
  for (i in input) {
    allKeys = getAllKeys(input[i]);
    total += getValues(input[i].output, allKeys);
  }

  return total;
}

function loopThroughPatterns(input) {
  for (pattern of input) {
    console.log(pattern.signalPatterns);
  }
}

console.log(`Part1:\nUnique Numbers: ${findUniqueNumber(input).length}`);
console.log(`Part2:\nWire/Segment: ${decodeOutput(input)}`);

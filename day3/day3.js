// Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.

// The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.

// The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.

// So, the gamma rate is the binary number 10110, or 22 in decimal.

// The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.toString().split("\n");

  const len = input[0].length;

  let common = new Array(len).fill(0);

  function compareBits(bit) {
    bit = parseInt(bit);
    if (bit) {
      return 1;
    }
    return -1;
  }

  function extractBits(bits) {
    bits = bits.split("");
    for (i in bits) {
      common[i] += compareBits(bits[i]);
    }
  }

  function convertToBinaryArray(bit) {
    if (bit >= 0) {
      return 1;
    }
    return 0;
  }

  function compileBackToBinary(arr) {
    for (i in arr) {
      common[i] = convertToBinaryArray(arr[i]);
    }
    return parseInt(common.toString().replace(/,/g, ""), 2);
  }

  function epsilonRate(arr) {
    let epsilon = new Array(arr.length);
    for (i in arr) {
      epsilon[i] = arr[i] ? 0 : 1;
    }
    return parseInt(epsilon.toString().replace(/,/g, ""), 2);
  }

  function reduceArray(arr) {
    let bit;
    let o2gen = arr;
    let c2gen = arr;

    for (let b = 0; b < len; b++) {
      bit = 0;
      for (let i in o2gen) {
        bit += compareBits(o2gen[i][b]);
      }
      bit = convertToBinaryArray(bit);
      if (o2gen.length > 1) {
        o2gen = o2gen.filter((e) => parseInt(e[b]) === bit);
      }
      bit = 0;
      for (let i in c2gen) {
        bit += compareBits(c2gen[i][b]);
      }
      // filter array to keep only the most by bit index.
      bit = convertToBinaryArray(bit);
      if (c2gen.length > 1) {
        c2gen = c2gen.filter((e) => parseInt(e[b]) !== bit);
      }
    }

    return [parseInt(o2gen.toString(), 2), parseInt(c2gen.toString(), 2)];
  }

  function part1() {
    input.forEach(extractBits);
    const gammaRate = compileBackToBinary(common);
    const epsilon = epsilonRate(common);
    console.log(
      `PART 1:\nGamma Rate: ${gammaRate}\nEpsilon Rate: ${epsilon}\nPower Consumption: ${
        gammaRate * epsilon
      }\n`
    );
  }

  function part2() {
    const o2c2rating = reduceArray(input);

    console.log(
      `PART 2:\nO2 Generator Rating: ${o2c2rating[0]}\nCO2 Scrubber Rating: ${
        o2c2rating[1]
      }\nlife support rating: ${o2c2rating[0] * o2c2rating[1]}`
    );
  }

  part1();
  part2();
});

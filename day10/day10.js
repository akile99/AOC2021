const fs = require("fs");
const path = require("path");

const fileName = "input.txt";

const input = fs
  .readFileSync(path.join(__dirname, fileName), "utf8")
  .split("\n");

const linesSeperated = seperateLines(input);
// console.log(linesSeperated);
console.log(`Part1:\nScore: ${scoreSentaxErrors(linesSeperated.CorruptLines)}`);
const autoCorrectScore = scoreAutoCorrect(linesSeperated.OpenningBrackets);
console.log(`Part2:\nAuto Correct\nMiddle Score: ${autoCorrectScore}`);

function seperateLines(input) {
  let corruptLine = [];
  let missingClosing = [];
  let openning = [];

  for (line of input) {
    openning = [];
    if (findCorrupt(line)) {
      corruptLine.push(findCorrupt(line));
    } else {
      missingClosing.push(openning);
    }
  }

  function findCorrupt(line) {
    for (c of line) {
      if (c === "{" || c === "[" || c === "<" || c === "(") {
        openning.push(c);
      } else if (
        (c === "}" && openning[openning.length - 1] === "{") ||
        (c === "]" && openning[openning.length - 1] === "[") ||
        (c === ">" && openning[openning.length - 1] === "<") ||
        (c === ")" && openning[openning.length - 1] === "(")
      ) {
        openning.pop();
      } else if (
        (c === "}" && openning[openning.length - 1] !== "{") ||
        (c === "]" && openning[openning.length - 1] !== "[") ||
        (c === ">" && openning[openning.length - 1] !== "<") ||
        (c === ")" && openning[openning.length - 1] !== "(")
      ) {
        return c;
      }
    }
    // return 0;
  }
  return { CorruptLines: corruptLine, OpenningBrackets: missingClosing };
}

function scoreSentaxErrors(arr) {
  let total = 0;
  // ): 3 points.
  // ]: 57 points.
  // }: 1197 points.
  // >: 25137 points.
  for (i of arr) {
    if (i === ")") {
      total += 3;
    } else if (i === "]") {
      total += 57;
    } else if (i === "}") {
      total += 1197;
    } else if (i === ">") {
      total += 25137;
    }
  }
  return total;
}

function scoreAutoCorrect(arr) {
  let score = 0;
  let allScores = [];
  // Start with a total score of 0.
  // Then, for each character, multiply the total score by 5
  // and then increase the total score by the point value given
  // for the character in the following table:

  for (line of arr) {
    score = 0;
    for (let i = line.length - 1; i >= 0; i--) {
      scoreChar(line[i]);
    }

    allScores.push(parseInt(score));
  }
  allScores.sort((a, b) => a - b);
  return allScores[Math.floor(allScores.length / 2)];

  function scoreChar(char) {
    score *= 5;
    switch (char) {
      case "(":
        score += 1;
        break;
      case "[":
        score += 2;
        break;
      case "{":
        score += 3;
        break;
      case "<":
        score += 4;
        break;
    }
  }

  // ): 1 point.
  // ]: 2 points.
  // }: 3 points.
  // >: 4 points.
  // So, the last completion string above - ])}> - would be scored as follows:

  // Start with a total score of 0.
  // Multiply the total score by 5 to get 0, then add the value of ] (2) to get a new total score of 2.
  // Multiply the total score by 5 to get 10, then add the value of ) (1) to get a new total score of 11.
  // Multiply the total score by 5 to get 55, then add the value of } (3) to get a new total score of 58.
  // Multiply the total score by 5 to get 290, then add the value of > (4) to get a new total score of 294.
}

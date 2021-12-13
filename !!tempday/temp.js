const fs = require("fs");
const path = require("path");

const fileName = "test.txt";

const input = fs
  .readFileSync(path.join(__dirname, fileName), "utf8")
  .split("\n");

console.log(input);

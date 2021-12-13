const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.toString().split("\n\n");

  const drawnNumbers = input[0].split(",");
  const boards = input.slice(1);
  let gameBoards = [];

  class Board {
    constructor(board) {
      this.board = board;
      this.cols = [5, 5, 5, 5, 5];
      this.rows = [5, 5, 5, 5, 5];
      this.isWinner = false;
    }

    removeNumber(number) {
      if (this.isWinner) return;

      for (let c = 0; c < 5; c++) {
        for (let r = 0; r < 5; r++) {
          if (this.board[c][r] === number) {
            this.rows[r]--;
            this.cols[c]--;
            this.board[c][r] = -1;
            this.checkWinner();
            return;
          }
        }
      }
    }

    checkWinner() {
      for (let i = 0; i < 5; i++) {
        if (this.cols[i] === 0 || this.rows[i] === 0) {
          this.isWinner = true;
        }
      }
    }

    getPointsFromBoard() {
      let points = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.board[i][j] >= 0) {
            points += this.board[i][j];
          }
        }
      }
      return points;
    }
  }

  for (b in boards) {
    boards[b] = boards[b].split("\n");
    for (let row = 0; row < 5; row++) {
      boards[b][row] = boards[b][row]
        .split(" ")
        .filter((n) => n)
        .map((n) => parseInt(n));
    }
    // console.log(boards[b])
    gameBoards.push(new Board(boards[b]));
  }

  function runGame() {
    for (number of drawnNumbers) {
      number = parseInt(number);
      for (board of gameBoards) {
        board.removeNumber(number);

        if (board.isWinner) {
          if (gameBoards.length > 1) continue;
          console.log("WINNER");
          console.log(board.board);
          return board.getPointsFromBoard() * number;
        }
      }
      gameBoards = gameBoards.filter((b) => !b.isWinner);
    }
    // console.log(firstWinner);
  }

  console.log(`Magic Number: ${runGame()}`);
});

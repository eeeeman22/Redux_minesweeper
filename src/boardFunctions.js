// 10x15 = [10,15]
const generateNewBoard = sizeParams => {
  let board = [];
  for (let height = 0; height < sizeParams[0]; height++) {
    let row = [];
    for (let width = 0; width < sizeParams[1]; width++) {
      row.push({ hasBeenClicked: false, value: 0, flagged: false });
    }
    board.push(row);
  }
  return board;
};
// 6.3 tiles per mine for medium difficulty
const assignMines = board => {
  let maxNumOfMines = Math.floor((board.length * board[0].length) / 5);
  for (let mines = 0; mines < maxNumOfMines; mines++) {
    let row = Math.floor(Math.random() * board.length);
    let col = Math.floor(Math.random() * board[0].length);
    if (board[row][col].value === "M") {
      mines--;
    } else {
      board[row][col].value = "M";
    }
  } // generate random coordinates using MAth.random()*size params
  // check to see if coord is already mined, if so, skip
  //
  return board;
};

const assignNumbers = board => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].value === "M") {
        continue;
      }
      let value = 0;
      if (row - 1 >= 0) {
        if (board[row - 1][col].value === "M") {
          value++;
        }
      }
      if (row + 1 < board.length) {
        if (board[row + 1][col].value === "M") {
          value++;
        }
      }
      if (col - 1 >= 0) {
        if (board[row][col - 1].value === "M") {
          value++;
        }
      }
      if (col + 1 < board[0].length) {
        if (board[row][col + 1].value === "M") {
          value++;
        }
      }
      if (row - 1 >= 0 && col - 1 >= 0) {
        if (board[row - 1][col - 1].value === "M") {
          value++;
        }
      }
      if (row - 1 >= 0 && col + 1 < board[0].length) {
        if (board[row - 1][col + 1].value === "M") {
          value++;
        }
      }
      if (row + 1 < board.length && col - 1 >= 0) {
        if (board[row + 1][col - 1].value === "M") {
          value++;
        }
      }
      if (row + 1 < board.length && col + 1 < board[0].length) {
        if (board[row + 1][col + 1].value === "M") {
          value++;
        }
      }
      board[row][col].value = value;
    }
  }
  return board;
};

export function createBoard(sizeParams) {
  let board = generateNewBoard(sizeParams);
  board = assignMines(board);
  board = assignNumbers(board);
  return board;
}

export function recursiveBoardCheck(board, location) {
  let row = location[0];
  let col = location[1];

  if (row - 1 >= 0) {
    if (
      board[row - 1][col].value === 0 &&
      !board[row - 1][col].hasBeenClicked
    ) {
      board[row - 1][col].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row - 1, col]);
    } else {
      board[row - 1][col].hasBeenClicked = true;
    }
  }
  if (row + 1 < board.length) {
    if (
      board[row + 1][col].value === 0 &&
      !board[row + 1][col].hasBeenClicked
    ) {
      board[row + 1][col].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row + 1, col]);
    } else {
      board[row + 1][col].hasBeenClicked = true;
    }
  }
  if (col + 1 < board.length) {
    if (
      board[row][col + 1].value === 0 &&
      !board[row][col + 1].hasBeenClicked
    ) {
      board = recursiveBoardCheck(board, [row, col + 1]);
      board[row][col + 1].hasBeenClicked = true;
    } else {
      board[row][col + 1].hasBeenClicked = true;
    }
  }
  if (col - 1 >= 0) {
    if (
      board[row][col - 1].value === 0 &&
      !board[row][col - 1].hasBeenClicked
    ) {
      board[row][col - 1].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row, col - 1]);
    } else {
      board[row][col - 1].hasBeenClicked = true;
    }
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (
      board[row - 1][col - 1].value === 0 &&
      !board[row - 1][col - 1].hasBeenClicked
    ) {
      board[row - 1][col - 1].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row - 1, col - 1]);
    } else {
      board[row - 1][col - 1].hasBeenClicked = true;
    }
  }
  if (row - 1 >= 0 && col + 1 < board[0].length) {
    if (
      board[row - 1][col + 1].value === 0 &&
      !board[row - 1][col + 1].hasBeenClicked
    ) {
      board[row - 1][col + 1].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row - 1, col + 1]);
    } else {
      board[row - 1][col + 1].hasBeenClicked = true;
    }
  }
  if (row + 1 < board.length && col + 1 < board[0].length) {
    if (
      board[row + 1][col + 1].value === 0 &&
      !board[row + 1][col + 1].hasBeenClicked
    ) {
      board[row + 1][col + 1].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row + 1, col + 1]);
    } else {
      board[row + 1][col + 1].hasBeenClicked = true;
    }
  }
  if (row + 1 < board.length && col - 1 >= 0) {
    if (
      board[row + 1][col - 1].value === 0 &&
      !board[row + 1][col - 1].hasBeenClicked
    ) {
      board[row + 1][col - 1].hasBeenClicked = true;
      board = recursiveBoardCheck(board, [row + 1, col - 1]);
    } else {
      board[row + 1][col - 1].hasBeenClicked = true;
    }
  }

  // if square clicked on is blank
  // all eight surrounding squares around it are uncovered (clicked)
  // repeat check for the modified square
  return board;
}

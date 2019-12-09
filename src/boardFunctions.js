/*
.______     ______        ___      .______       _______      _______  __    __  .__   __.   ______     _______.
|   _  \   /  __  \      /   \     |   _  \     |       \    |   ____||  |  |  | |  \ |  |  /      |   /       |
|  |_)  | |  |  |  |    /  ^  \    |  |_)  |    |  .--.  |   |  |__   |  |  |  | |   \|  | |  ,----'  |   (----`
|   _  <  |  |  |  |   /  /_\  \   |      /     |  |  |  |   |   __|  |  |  |  | |  . `  | |  |        \   \    
|  |_)  | |  `--'  |  /  _____  \  |  |\  \----.|  '--'  |   |  |     |  `--'  | |  |\   | |  `----.----)   |   
|______/   \______/  /__/     \__\ | _| `._____||_______/    |__|      \______/  |__| \__|  \______|_______/    
                                                                                                                
*/
const generateNewBoard = size => {
  let board = [];
  for (let height = 0; height < size; height++) {
    let row = [];
    for (let width = 0; width < size; width++) {
      row.push({ hasBeenClicked: false, value: 0, flagged: false });
    }
    board.push(row);
  }
  return board;
};
const assignMines = (board, maxNumOfMines) => {
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
const initialState = {
  victoryStatus: false,
  failureStatus: false,
  flagsApplied: 0,
  timer: 0,
  timerLimit: 999
};
export function createInitialState(sizeParams, difficulty, timerLimit) {
  let board = generateNewBoard(sizeParams);
  let maxNumOfMines = Math.floor(sizeParams ** 2 / difficulty);
  board = assignMines(board, maxNumOfMines);
  board = assignNumbers(board);
  let state = Object.assign({}, initialState, {
    board: board,
    totalMines: maxNumOfMines,
    requestedBoardSize: sizeParams,
    requestedBoardDifficulty: difficulty,
    timerLimit: timerLimit
  });
  return state;
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

export const checkForVictory = state => {
  if (!state.failureStatus) {
    if (state.flagsApplied === state.totalMines) {
      for (let row = 0; row < state.board.length; row++) {
        for (let col = 0; col < state.board[0].length; col++) {
          var square = state.board[row][col];
          if (square.value === "M" && square.flagged === false) {
            return false;
          } else if (square.value >= 0 && square.hasBeenClicked === false) {
            return false;
          }
        }
      }
      return true;
    }
  }
  return false;

  // only run when the correct number of flags is on the board
  // if failureStatus === false
  // all flags must cover mines, which must NOT have been clicked!
  // all other spaces must be clicked
  // if so, return true!

  // else, return false
};

export const avalanche = state => {
  let board = state.board;
  // move all mines that have not been flagged around on the board
  let nonflaggedMines = [];
  let nonClickedSquares = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].value === "M" && !board[row][col].flagged) {
        nonflaggedMines.push([row, col]);
        board[row][col].value = "?";
      }
      if (
        typeof board[row][col].value === "number" &&
        !board[row][col].hasBeenClicked
      ) {
        nonClickedSquares.push([row, col]);
        board[row][col].value = "?";
      }
    }
  }
  let numberOfMinesRemaining = nonflaggedMines.length;
  let potentialSpots = nonflaggedMines.concat(nonClickedSquares);
  while (numberOfMinesRemaining > 0) {
    let i = Math.floor(Math.random() * potentialSpots.length);
    let row = potentialSpots[i][0];
    let col = potentialSpots[i][1];
    if (board[row][col].value !== "M") {
      board[row][col].value = "M";
      numberOfMinesRemaining--;
    }
  }
  board = assignNumbers(board);

  return Object.assign({}, state, { board: board });

  // reassign numbers accordingly
};

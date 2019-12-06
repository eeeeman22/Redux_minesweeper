import { CLICKED, TOGGLE_FLAGGED } from "./actions";
import { createBoard, recursiveBoardCheck } from "./boardFunctions.js";

const initialState = {
  victoryStatus: false,
  failureStatus: false
};

initialState.board = createBoard([10, 10]);
// TODO: split cases into seperate funcs, like toggleFlagged and click should be sep. should RUN the minesweeperApp
// func and tell it which square was modified. minesweeperApp should contain all the board logic to determine
// if you opened a cavern, uncovered a singleton square, or lost the game by clicking on a mine!
function minesweeperApp(state = initialState, action) {
  let location = action.location;
  switch (action.type) {
    case CLICKED:
      // need ref to location from action
      if (state.board[location[0]][location[1]].value === "M") {
        // you clicked on a mine! you lose! still need to update the board so that it displays properly.
        console.log("you lose");
        let failureBoard = JSON.parse(JSON.stringify(state));
        failureBoard.failureStatus = true;
        failureBoard.board[location[0]][location[1]].hasBeenClicked = true;
        return failureBoard;
      } else {
        // copy of board
        let clickedBoard = JSON.parse(JSON.stringify(state.board));
        // run recursive check
        clickedBoard[location[0]][location[1]].hasBeenClicked = true;
        if (clickedBoard[location[0]][location[1]].value === 0) {
          clickedBoard = recursiveBoardCheck(clickedBoard, location);
        }
        // return
        return Object.assign({}, state, { board: clickedBoard });
      }
    case TOGGLE_FLAGGED:
      let toggledBoard = JSON.parse(JSON.stringify(state));
      toggledBoard.board[location[0]][location[1]].flagged = !toggledBoard
        .board[location[0]][location[1]].flagged;
      // modify board at that location
      return toggledBoard;
    default:
      return state;
  }
}

export default minesweeperApp;

import {
  CLICKED,
  TOGGLE_FLAGGED,
  NEW_GAME,
  CHANGE_REQ_BOARD_SIZE,
  CHANGE_REQ_BOARD_DIFFICULTY,
  INCREMENT_TIMER,
  CHANGE_TIMER_LIMIT,
  AVALANCHE
} from './actions';
import {
  createInitialState,
  recursiveBoardCheck,
  checkForVictory,
  avalanche
} from './boardFunctions.js';

const initialState = createInitialState(10, 5);
// TODO: split cases into seperate funcs, like toggleFlagged and click should be sep. should RUN the minesweeperApp
// func and tell it which square was modified. minesweeperApp should contain all the board logic to determine
// if you opened a cavern, uncovered a singleton square, or lost the game by clicking on a mine!
function minesweeperApp(state = initialState, action) {
  let location = action.location;
  switch (action.type) {
    case CLICKED:
      // need ref to location from action
      if (state.board[location[0]][location[1]].value === 'M') {
        // you clicked on a mine! you lose! still need to update the board so that it displays properly.
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
        let newBoard = Object.assign({}, state, { board: clickedBoard });
        if (checkForVictory(newBoard)) {
          newBoard.victoryStatus = true;
        }
        // return
        return newBoard;
      }
    case TOGGLE_FLAGGED:
      let toggledBoard = JSON.parse(JSON.stringify(state));
      toggledBoard.board[location[0]][location[1]].flagged = !toggledBoard
        .board[location[0]][location[1]].flagged;
      if (toggledBoard.board[location[0]][location[1]].flagged) {
        toggledBoard.flagsApplied++;
        // toggledBoard.
      } else {
        toggledBoard.flagsApplied--;
      }
      if (checkForVictory(toggledBoard)) {
        toggledBoard.victoryStatus = true;
      }
      // modify board at that location
      return toggledBoard;
    case NEW_GAME:
      let newState = Object.assign({}, state);
      newState = createInitialState(
        action.boardParams,
        state.requestedBoardDifficulty
      );
      // todo, write newgame reducer
      return newState;
    case CHANGE_REQ_BOARD_SIZE:
      return Object.assign({}, state, { requestedBoardSize: action.size });
    case CHANGE_REQ_BOARD_DIFFICULTY:
      return Object.assign({}, state, {
        requestedBoardDifficulty: action.difficulty
      });
    case INCREMENT_TIMER:
      console.log('increment timer');
      if (state.timer + 1 > state.timerLimit) {
        console.log('failure');
        return Object.assign({}, state, { failureStatus: true });
      }
      return Object.assign({}, state, state.timer++);
    case CHANGE_TIMER_LIMIT:
      return Object.assign({}, state, (state.timerLimit = action.timerLimit));
    case AVALANCHE:
      let avalancheState = JSON.parse(JSON.stringify(state));
      return avalanche(avalancheState);
    default:
      return state;
  }
}

export default minesweeperApp;

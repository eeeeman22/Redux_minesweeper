/*
 * action types
 */

export const CLICKED = "CLICKED";
export const TOGGLE_FLAGGED = "TOGGLE_FLAGGED";
export const NEW_GAME = "NEW_GAME";
export const CHANGE_REQ_BOARD_SIZE = "CHANGE_REQ_BOARD_SIZE";
export const CHANGE_REQ_BOARD_DIFFICULTY = "CHANGE_REQ_BOARD_DIFFICULTY";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
export const CHANGE_TIMER_LIMIT = "CHANGE_TIMER_LIMIT";
export const AVALANCHE = "AVALANCHE";

/*
 * action creators
 */

export function clickSquare(location) {
  return { type: CLICKED, location: location };
}

export function toggleFlag(location) {
  return { type: TOGGLE_FLAGGED, location };
}
export function changeRequestedBoardSize(size) {
  return { type: CHANGE_REQ_BOARD_SIZE, size: size };
}

export function resetBoard(boardParams) {
  return { type: NEW_GAME, boardParams: boardParams };
}

export function changeRequestedBoardDifficulty(difficulty) {
  return { type: CHANGE_REQ_BOARD_DIFFICULTY, difficulty: difficulty };
}

export function incrementTimer() {
  return { type: INCREMENT_TIMER };
}

export function changeTimerLimit(newLimit) {
  return { type: CHANGE_TIMER_LIMIT, timerLimit: newLimit };
}

export function avalancheActionCreator() {
  return { type: AVALANCHE };
}

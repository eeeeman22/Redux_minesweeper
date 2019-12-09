import React from "react";
import { connect } from "react-redux";
import {
  resetBoard,
  changeRequestedBoardSize,
  changeRequestedBoardDifficulty,
  changeTimerLimit,
  avalancheActionCreator
} from "./actions";

// Allow the user to adjust
// the difficulty level (board size + number of mines)
const Menu = ({
  dispatch,
  boardParams,
  requestedBoardDifficulty,
  timerLimit
}) => {
  return (
    <div>
      <table className="menuContainer">
        <tbody>
          <tr>
            <td>Board Size</td>
            <td>
              <input
                type="range"
                min="5"
                max="20"
                value={boardParams}
                onChange={e => {
                  dispatch(changeRequestedBoardSize(e.target.value));
                }}
              />{" "}
            </td>
            <td>
              {boardParams}X{boardParams}
            </td>
          </tr>
          <tr>
            <td>Difficulty</td>
            <td>
              <input
                type="range"
                min="3"
                max="10"
                value={requestedBoardDifficulty}
                onChange={e => {
                  console.log(e);
                  dispatch(changeRequestedBoardDifficulty(e.target.value));
                }}
              />
            </td>
            <td>
              {Number(requestedBoardDifficulty) === 3
                ? "Impossible"
                : requestedBoardDifficulty < 5
                ? "Hard"
                : requestedBoardDifficulty < 7
                ? "Medium"
                : requestedBoardDifficulty < 9
                ? "Easy"
                : "Very Easy"}
              {" " + requestedBoardDifficulty}tiles/mine
            </td>
          </tr>
          <tr>
            <td>Timer Limit</td>
            <td>
              <input
                type="number"
                min="1"
                max="999"
                default="100"
                value={timerLimit}
                onChange={e => {
                  console.log(timerLimit);
                  dispatch(changeTimerLimit(e.target.value));
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          dispatch(resetBoard(boardParams));
        }}
      >
        Reset Board
      </button>
      <button
        onClick={() => {
          dispatch(avalancheActionCreator());
        }}
      >
        avalanche!
      </button>
    </div>
  );
};

const mapStateToProps = store => ({
  victoryStatus: store.victoryStatus,
  failureStatus: store.failureStatus,
  boardParams: store.requestedBoardSize,
  requestedBoardDifficulty: store.requestedBoardDifficulty,
  timerLimit: store.timerLimit
});

export default connect(mapStateToProps, null)(Menu);

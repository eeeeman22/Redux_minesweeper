import React from "react";
import { toggleFlag, clickSquare } from "./actions.js";
import { connect } from "react-redux";

const Board = ({ board, dispatch }) => {
  return (
    <div className="boardContainer">
      <table className="board">
        <tbody>
          {board.map((row, rowNum) => {
            return (
              <tr key={rowNum}>
                {row.map((cell, cellNum) => {
                  let cellClass = getCellClass(cell);
                  let cellContents = getCellContents(cellClass, cell);
                  return (
                    <td
                      key={rowNum + "," + cellNum}
                      rownum={rowNum}
                      cellnum={cellNum}
                      onClick={e => {
                        if (e.altKey) {
                          dispatch(toggleFlag([rowNum, cellNum]));
                        } else {
                          dispatch(clickSquare([rowNum, cellNum]));
                        }
                      }}
                      className={cellClass + " square"}
                    >
                      {cellContents}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getCellClass = cell => {
  return cell.hasBeenClicked
    ? cell.value === "M"
      ? "mine"
      : cell.value > 0
      ? "number _" + cell.value
      : "empty"
    : cell.flagged
    ? "flagged"
    : "waiting";
};

const getCellContents = (cellClass, cell) => {
  return cellClass === "mine"
    ? "MINE"
    : cellClass.split(" ")[0] === "number"
    ? cell.value
    : cellClass === "empty"
    ? ""
    : cellClass === "flagged"
    ? "Flag"
    : "";
};

const mapStateToProps = store => ({
  board: store.board,
  victoryStatus: store.victoryStatus,
  failureStatus: store.failureStatus
});
export default connect(mapStateToProps, null)(Board);

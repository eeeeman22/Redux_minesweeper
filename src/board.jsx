import React from "react";
import { toggleFlag, clickSquare } from "./actions.js";
import { connect } from "react-redux";

const Board = ({ board, dispatch }) => {
  return (
    <div>
      <table>
        <tbody>
          {board.map((row, rowNum) => {
            return (
              <tr>
                {row.map((cell, cellNum) => {
                  let cellClass = cell.hasBeenClicked
                    ? cell.value === "M"
                      ? "mine"
                      : cell.value > 0
                      ? "number"
                      : "empty"
                    : cell.flagged
                    ? "flagged"
                    : "waiting";
                  let cellContents =
                    cellClass === "mine"
                      ? "MINE"
                      : cellClass === "number"
                      ? cell.value
                      : cellClass === "empty"
                      ? ""
                      : cellClass === "flagged"
                      ? "Flag"
                      : "";
                  return (
                    <td
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

const mapStateToProps = store => ({ board: store.board });
export default connect(mapStateToProps, null)(Board);

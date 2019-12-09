import React from "react";
import { connect } from "react-redux";
const Banner = ({
  victoryStatus,
  failureStatus,
  flagsApplied,
  totalMines,
  timer
}) => {
  if (victoryStatus === false && failureStatus === false) {
    return (
      <div>
        <div className="banner">
          <span style={{ float: "left" }}>time elapsed:{timer}</span>
          <span style={{ float: "right" }}>
            Mines Remaining:{totalMines - flagsApplied}
          </span>
        </div>
      </div>
    );
  } else if (victoryStatus === true) {
    return (
      <div style={{ backgroundColor: "green" }} className="victory">
        <h1 style={{ color: "white" }}>VICTORY!</h1>
      </div>
    );
  } else if (failureStatus === true) {
    return (
      <div style={{ backgroundColor: "red" }} className="failure">
        <h1 style={{ color: "white" }}>FAILURE!</h1>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    victoryStatus: state.victoryStatus,
    failureStatus: state.failureStatus,
    flagsApplied: state.flagsApplied,
    totalMines: state.totalMines,
    timer: state.timer
  };
};
export default connect(mapStateToProps, null)(Banner);

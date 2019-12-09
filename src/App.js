import React from "react";
import Banner from "./banner.jsx";
import Menu from "./menu.jsx";
import Board from "./board.jsx";
import "./App.css";
import { connect } from "react-redux";
import { incrementTimer } from "./actions.js";

function App({ dispatch }) {
  setInterval(() => {
    dispatch(incrementTimer());
  }, 1000);
  return (
    <div style={{ display: "inline-block" }}>
      <h1 className="title">MINESWEEPHER</h1>
      <Banner />
      <br></br>
      <Board className="board" />
      <Menu />
    </div>
  );
}

export default connect()(App);

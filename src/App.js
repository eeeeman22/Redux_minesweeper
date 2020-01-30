import React from 'react';
import Banner from './banner.jsx';
import Menu from './menu.jsx';
import Board from './board.jsx';
import './App.css';
import { connect } from 'react-redux';
import { incrementTimer } from './actions.js';

function App({ dispatch }) {
  setInterval(() => {
    dispatch(incrementTimer());
  }, 1000);
  return (
    <div style={{ display: 'inline-block', width: '600px' }}>
      <h1 className="title">MINESWEEPHER</h1>
      <Banner />
      <br></br>
      <Board className="board" />
      <Menu />
      Directions: Alt+Click a square to mark it with a flag. Right click it to
      uncover it. Don't uncover a mine! If the square has a number, this number
      represents the number of mines adjacent to that square. Hit "Avalanche!"
      to mix up the tiles on the board. V handy if you get stuck.
    </div>
  );
}

export default connect()(App);

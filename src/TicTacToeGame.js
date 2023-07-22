import React from "react";
import { useState } from "react";

export default function TicTacToeGame() {
  const [history, setHistory] = useState(Array(9).fill([]).map(() => Array(3).fill([]).map(() => (Array(3).fill("")))));
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  //TODO this is where the bug is -- nextHistory needs to be a 2d array now
  function handlePlay(nextSquares) {
    const nextHistory = ([...history.slice(0, currentMove + 1), nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move # " + move;
    }
    else {
      description = "Go to game start";
    }
    return ( 
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
    );
  });
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
          <li>
            You are playing move # {currentMove + 1}
          </li>
        </ol>
      </div>
    </div>
  );
}

function Square({ value, onSqaureClick }) {
  
  return ( 
    <button className="square" onClick={onSqaureClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  const size = 3;

  function handleClick(row, column) {
    if (squares[row][column] || CalculateWinner(squares)) {
      // return;
    }
    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[row][column] = 'X';
    } 
    else {
      nextSquares[row][column] = 'O';
    }
    onPlay(nextSquares)
  }

  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function BuildBoard() {
    const components = [];

    for (let i = 0; i < size; i++) {
      components.push([]);
      for (let j = 0; j < size; j++) {
        components[i].push(<Square value={squares[i][j]} onSqaureClick={() => handleClick(i, j)} />)
      }
    }

    return components;

  }
  
  return (
    <React.Fragment>
      
      <BuildBoard />
      
      {/* <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSqaureClick={() => handleClick(0)} />
        <Square value={squares[1]} onSqaureClick={() => handleClick(1)} />
        <Square value={squares[2]} onSqaureClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSqaureClick={() => handleClick(3)} />
        <Square value={squares[4]} onSqaureClick={() => handleClick(4)} />
        <Square value={squares[5]} onSqaureClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSqaureClick={() => handleClick(6)} />
        <Square value={squares[7]} onSqaureClick={() => handleClick(7)} />
        <Square value={squares[8]} onSqaureClick={() => handleClick(8)} />
      </div> */}
    </ React.Fragment>
  );
}

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < 3; i++) {
    
  }

  for(let i = 0; i < lines.length; i++) {
    const[a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
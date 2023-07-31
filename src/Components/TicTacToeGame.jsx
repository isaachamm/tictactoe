import React from "react";
import { useState } from "react";

export default function TicTacToeGame() {
  // const [history, setHistory] = useState(Array(9).fill([]).map(() => 
  //   Array(3).fill([]).map(() => (Array(3).fill("")))));
  const [history, setHistory] = useState(Array(9).fill([]).map(() => 
    Array(3).fill([]).map(() => (Array(3).fill()))));
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const [xDictionary, setxDictionary] = useState({
    Rows: Array(3).fill(0),
    Columns: Array(3).fill(0),
    NegativeDiagonal: 0,
    RightDiagonal: 0
  });
  const [oDictionary, setoDictionary] = useState({
    Rows: Array(3).fill(0),
    Columns: Array(3).fill(0),
    NegativeDiagonal: 0,
    RightDiagonal: 0
  });  
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} 
          xDictionary={xDictionary} oDictionary={oDictionary} />
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

function Board({ xIsNext, squares, onPlay, xDictionary, oDictionary }) {

  const size = 3;

  function handleClick(row, column) {
    if (squares[row][column]) {
      return;
    } else if (CalculateWinner(row, column, xIsNext, xDictionary, oDictionary)) {
      // winner = true;
      return;
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

  let status;
  const winner = CheckWinner(xDictionary, oDictionary)
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


    return (
      <div>
        {components.map(component => (
          <div>
            {component}
          </div>
        ))}
      </div>
    ) 
  }
  
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <BuildBoard />
    </ React.Fragment>
  );
}

function CalculateWinner(row, column, xIsNext, xDictionary, oDictionary) {
  
  if (CheckWinner(xDictionary, oDictionary)) {
    return true;
  }

  if(xIsNext) {
    xDictionary["Rows"][row] += 1;
    xDictionary["Columns"][column] += 1;
    if (row === column) {
      xDictionary["NegativeDiagonal"] += 1
    }
    if ((row + column) === 3) {
      xDictionary["PositiveDiagonal"] += 1
    }

  } else {
    oDictionary["Rows"][row] += 1;
    oDictionary["Columns"][column] += 1;
    if (row === column) {
      oDictionary["NegativeDiagonal"] += 1
    }
    if ((row + column) === 3) {
      oDictionary["PositiveDiagonal"] += 1
    }

  }

  return null;
}

function CheckWinner(xDictionary, oDictionary) {
  
  for (let i = 0; i < 3; i++) {
    if (xDictionary["Rows"][i] === 3
    || xDictionary["Columns"][i] === 3) {
      return "X";
    }
  }
  
  if (xDictionary["NegativeDiagonal"] === 3
    || xDictionary["PositiveDiagonal"] === 3) {
    return "X";
  }

  for (let i = 0; i < 3; i++) {
    if (oDictionary["Rows"][i] === 3
    || oDictionary["Columns"][i] === 3) {
      return "O";
    }
  }

  if (oDictionary["NegativeDiagonal"] === 3
    || oDictionary["PositiveDiagonal"] === 3) {
    return "O";
  }

  return null;
}
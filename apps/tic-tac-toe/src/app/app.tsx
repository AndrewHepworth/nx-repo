// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { useState } from 'react';


function calculateWinner( squares: Array<number> ) {
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

  for (let i = 0; i < lines.length; i++ ) {
    const [a, b, c] = lines[i]
    if (squares.at(a) && squares.at(a) === squares.at(b) && squares.at(a) === squares.at(a) && squares.at(c) ) {
      return squares.at(a)
    }
  }
  return null
}

function Square ({ value, onSquareClick, index }: any)  { 
  return (
    <button className='square' onClick={() => { onSquareClick(index)}} >
      {value}
    </button> 

  )
}

function BoardRow ({ value1, value2, value3, callback, index}: any) {
  return ( 
    <div className='board-row'>
      <Square value={value1} onSquareClick={callback} index={index} />
      <Square value={value2} onSquareClick={callback} index={index + 1} />
      <Square value={value3} onSquareClick={callback} index={ index + 2} />
    </div>
  )
}

function Board ({ isXnext, squares, onPlay}: any) { 
  const winner = calculateWinner(squares)
  let status;
  if (winner) {
    status = `Winner: ${winner} `
  } else {
    status = `Next player: ${(isXnext? 'X' : 'O') } `
  }

  function handleClick (i:  number) {
    if ( squares.at(i) !== '' || calculateWinner(squares) ) {
      return;
    }
    const nextSquares = squares.slice()
    const gameChar = isXnext ? 'X' : 'O' 
    nextSquares[i] = gameChar
    onPlay(nextSquares)
  }
  return (
    <>
      <div className='status' >{status} </div>
      <div>
        <BoardRow value1={squares.at(0)} value2={squares.at(1)} value3={squares.at(2)} callback={handleClick} index={0} />
        <BoardRow value1={squares.at(3)} value2={squares.at(4)} value3={squares.at(5)} callback={handleClick} index={3} />
        <BoardRow value1={squares.at(6)} value2={squares.at(7)} value3={squares.at(8)} callback={handleClick} index={6} />
      </div>
    </>
  );

}

function Game() {
  const [history, setHistory] = useState([Array(9).fill('')])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const isXnext = currentMove % 2 === 0;

  function handlePlay( nextSquares: Array<number> ) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  const moves = history.map( (squares, move ) => {
    let description;
    if (move > 0 ) {
      description = `Go to move #${move}`
    } else {
      description = `Go to game start`
    }
    return ( 
      <li key={move}> 
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board isXnext={isXnext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )

}

export function App() {
  return <Game />
}

export default App;

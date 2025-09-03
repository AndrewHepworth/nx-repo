// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

import { useState } from 'react';

function MyButton () {
  
  return (
    <button> I'm a button </button>
  );
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

function Board () { 
  const [isXnext, setIsXnext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(''))

  function handleClick (i:  number) {
    if ( squares.at(i) !== '' ) {
      return;
    }
    const nextSquares = squares.slice()
    const gameChar = isXnext ? 'X' : 'O' 
    nextSquares[i] = gameChar
    setSquares(nextSquares)
    setIsXnext(!isXnext)
  }
  return (
    <div>
      <BoardRow value1={squares.at(0)} value2={squares.at(1)} value3={squares.at(2)} callback={handleClick} index={0} />
      <BoardRow value1={squares.at(3)} value2={squares.at(4)} value3={squares.at(5)} callback={handleClick} index={3} />
      <BoardRow value1={squares.at(6)} value2={squares.at(7)} value3={squares.at(8)} callback={handleClick} index={6} />
    </div>
  );

}

export function App() {
  return <Board />
}

export default App;

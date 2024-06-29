import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null]];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; 
  for(const turn of gameTurns){
        const { square, player } = turn;
        const { row, col } = square;  //object destructing
        gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS);
  const [ gameTurns, setGameTurns ] = useState([]);  

  //const [ activePlayer, setActivePlayer] = useState('X');  remove the states as much as possible and derive values from the existing states here gameTurns
  const activePlayer = deriveActivePlayer(gameTurns);
  
  //to update gameboard//deep copy is required while reset match to reset the values, bcoz object once create is immutable.
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard,players);
  let hasDraw = (gameTurns.length === 9) && !winner;

  //Build logic upon click on the button in gameboard, to construct custom object 'updatedTurns' with fields useful for both updating gameBoard array and to derive 'activePlayer'
  // attribute which is used for updating state of Player component.
  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square:{row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns];
      return updatedTurns;
    }   
  );    
  }
  function handleReset(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newPlayerName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newPlayerName
      }
    })
  } 

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onPlayerChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onPlayerChange={handlePlayerNameChange}/>          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleReset}/>}
       <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
    <Log turns={gameTurns}/> 
    </main>);
}

export default App

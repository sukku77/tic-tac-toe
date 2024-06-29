    
export default function GameBoard({onSelectSquare, board }){
    //dervied / computed state from props.
    /*let gameBoard = initialGameBoard;
    for(const turn of turns){
        const { square, player } = turn;
        const { row, col } = square;  //object destructing
        gameBoard[row][col] = player;
    }*/
    //comment this as the below logic will not save the order of the state change when clicked on buttons
   /* const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

    function handleClick(rowIndex,colIndex){
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map((internalArray) => [...internalArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });
       onSelectSquare();   
    }*/

    return(
        <ol id="game-board"> 
            {board.map((row, rowIndex) => (
               <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                        <li key={colIndex}>
                            <button disabled={playerSymbol != null} onClick={() => onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                        </li>
                        ))}
                    </ol>
               </li>
            ))}
        </ol>
    );
}
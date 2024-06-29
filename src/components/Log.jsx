//this component is display all the list of turns while doing every click on gameboard.So it required the state here also as in gameboard. So as App component contains both Gameboard and Log component 
//it is better to lift up the state from Gameboard to App
export default function Log({turns}){
    return (
        <ol id="log">
            {turns.map((turn) => 
            <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.row}</li>)}
        </ol>
    );
}
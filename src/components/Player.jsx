import { useState } from "react";

export default function Player({initialName, symbol, isActive, onPlayerChange}){
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);
   
    function handleEditClick(){
        setIsEditing((editing) => !isEditing)
        if(isEditing){
          onPlayerChange(symbol,playerName);
        }
    }
    function handleChange(event){
        setPlayerName(event.target.value)
    }
    let editPlayerName = <span className="player-name">{playerName}</span>;
    //let buttonName = "Edit"
    if(isEditing){
        editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
       // buttonName =  "Save"
    }
    return(
          <li className={isActive ? 'active' : undefined}> 
            <span className="player">
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    );
}
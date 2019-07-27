import React from 'react';
import style from "./style.css"

let output;
const Output = (props) => {
  if(!props.gameStatus) output = "The Game is on let's play";
  if(props.gameStatus === 1) output = "YOU WIN!!";
  if(props.gameStatus === 2) {
    output = `YOU LOSE! The Quote was ${props.answer}`;
  }
  return (
    <div className='output'>
      {output}
    </div>
  );
};

export default Output;

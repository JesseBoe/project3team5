import React from 'react';
import style from "./style.css"


const Output = (props) => {

  return (
    <div className='streak'>
      Streak: {props.streak}
    </div>
  );
};

export default Output;

import React from 'react';
import style from "./style.css"

const Answer = (props) => {
  let answer = props.answer[0].word;
  const hint = props.answer[0].hint;
  let pick = props.pickedArray;
  
  let guess = pick.join('');
  let regexp = new RegExp('[^' + guess + ']','g');
  let underscore = answer.replace(regexp, '_');


  return (
    <div>
      <div className='answer-box'>
        {underscore}
      </div>
      <div className='hint'>
        {hint}
      </div>
  </div>
  );
};

export default Answer;

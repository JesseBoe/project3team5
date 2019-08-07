import React, { Component } from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";

class confetti extends Component {
    render() {
      return (
        <div>
          <div className ="Confetti" style="width={width} height={height}"/>
        </div>
      );
    }
  }
export default confetti;
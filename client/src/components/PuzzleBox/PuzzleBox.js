import React, { Component } from "react";
import Letter from "./Letter";

class PuzzleBox extends Component {

    render() {
        var count = 0;
        return(
            <div style={{position: "relative", fontSize: "56px"}}>
                {this.props.puzzle.split('').map((_letter) => {
                    return <Letter key={"letter-" + count++} letter={_letter}></Letter>
                })}
            </div>
        )
    }
}


export default PuzzleBox;
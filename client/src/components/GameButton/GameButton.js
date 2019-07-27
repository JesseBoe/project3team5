import React, { Component } from "react";
import style from "./GameButton.css"

class GameButton extends Component {

    Solve = () => {
        console.log("Solve");
    }

    Buy = () => {
        console.log("Buy");
    }

    Spin = () => {
        console.log("Spin");
    }


    render() {
        return (
            <div className="d-flex justify-content-around" style= {{width: "100%"}}>
                <div onClick={() => { this.Spin(); }} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: "pointer" }}>SPIN</span>
                </div>
                <div onClick={() => { this.Buy(); }} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "24px", cursor: "pointer" }}>BUY VOWEL</span>
                </div>
                <div onClick={() => { this.Solve(); }} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: "pointer" }}>SOLVE</span>
                </div>
            </div>
        )
    }
}

export default GameButton;
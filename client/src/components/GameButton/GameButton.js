import React, { Component } from "react";
import style from "./GameButton.css"

class GameButton extends Component {

    render() {
        return (
            <div className="d-flex justify-content-around " style={{ width: "100%", position: "relative"}}>
                <div onClick={() => {this.props.spinWheel()}} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: "pointer" }}>SPIN</span>
                </div>
                <div onClick={() => {this.props.buyVowel()}} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "24px", cursor: "pointer" }}>BUY VOWEL</span>
                </div>
                <div onClick={() => {this.props.solve()}} className="rcorners1 d-flex justify-content-center">
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: "pointer" }}>SOLVE</span>
                </div>
            </div>
        )
    }
}

export default GameButton;
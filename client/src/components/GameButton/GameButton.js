import React, { Component } from "react";

class GameButton extends Component {

    shouldButtonEnabled = (buttonNumber) => {
        if (this.props.enabled) {
            if (this.props.gameState === "Spinning Wheel") {
                if (buttonNumber === 1) {
                    return true;
                }
            }
            else if (this.props.gameState === "Selecting Action") {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div className="d-flex justify-content-around " style={{ width: "100%", position: "relative"}}>
                <div onClick={() => { this.props.spinWheel(); }} className={"d-flex justify-content-center " + (this.shouldButtonEnabled(1) ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: this.shouldButtonEnabled(1) ? 'pointer' : 'default' }}>SPIN</span>
                </div>
                <div onClick={() => { this.props.buyVowel(); }} className={"d-flex justify-content-center " + (this.shouldButtonEnabled(2) ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "24px", cursor: this.shouldButtonEnabled(2) ? 'pointer' : 'default' }}>BUY VOWEL</span>
                </div>
                <div onClick={() => { this.props.solve(); }} className={"d-flex justify-content-center " + (this.shouldButtonEnabled(3) ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: this.shouldButtonEnabled(3) ? 'pointer' : 'default' }}>SOLVE</span>
                </div>
            </div>
        )
    }
}

export default GameButton;
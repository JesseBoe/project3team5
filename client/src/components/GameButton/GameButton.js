import React, { Component } from "react";
import style from "./GameButton.css"

class GameButton extends Component {

    render() {
        return (
            <div className="d-flex justify-content-around " style={{ width: "100%", position: "relative"}}>
                <div onClick={() => { this.props.spinWheel(); }} className={"d-flex justify-content-center " + (this.props.enabled ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: this.props.enabled ? 'pointer' : 'default' }}>SPIN</span>
                </div>
                <div onClick={() => { this.props.buyVowel(); }} className={"d-flex justify-content-center " + (this.props.enabled ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "24px", cursor: this.props.enabled ? 'pointer' : 'default' }}>BUY VOWEL</span>
                </div>
                <div onClick={() => { this.props.solve(); }} className={"d-flex justify-content-center " + (this.props.enabled ? 'rcorners1' : 'rcorners2')}>
                    <span className="unselect" style={{ color: "#ba1e68", fontSize: "28px", cursor: this.props.enabled ? 'pointer' : 'default' }}>SOLVE</span>
                </div>
            </div>
        )
    }
}

export default GameButton;
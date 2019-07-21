import React, { Component } from "react";
import keyCss from "./VirtualKeyboard.css"
import { stat } from "fs";


class VirtualKeyboard extends Component {
    alphabet1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    alphabet2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    alphabet3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    state = {
        onlyVowels : false,
        letterEnabled : {
            A : true,
            B : true,
            C: true,
            D: true,
            E: true,
            F: true,
            G: true,
            H: true,
            I: true,
            J: true,
            K: true,
            L: true,
            M: true,
            N: true,
            O: true,
            P: true,
            Q: true,
            R: true,
            S: true,
            T: true,
            U: true,
            V: true,
            W: true,
            X: true,
            Y: true,
            Z: true,
        }
    }

    disable = (letter) => {
        console.log(this.state[letter]);
        var newLetters = this.state.letterEnabled;
        newLetters[letter] = false;
        this.setState({
            onlyVowels : this.state.onlyVowels,
            letterEnabled : newLetters
        })
    }

    render() {
        return (
            <div className = "Card Keyboard" style={{width: "50%"}}>
                <div style={{width:"95%", margin:"auto"}}>
                    <div className="d-flex justify-content-around pt-1">
                        {this.alphabet1.map((letter) => {
                            return <div onClick={() => {this.disable(letter)}} className={this.state.letterEnabled[letter] ? "click-item d-flex justify-content-center" : "disabled d-flex justify-content-center"}>{letter}</div>
                        })}
                    </div>
                    <div className="d-flex justify-content-around">
                        {this.alphabet2.map((letter) => {
                            return <div onClick={() => { this.disable(letter) }} className={this.state.letterEnabled[letter] ? "click-item d-flex justify-content-center" : "disabled d-flex justify-content-center"}>{letter}</div>
                        })}
                    </div>
                    <div className="d-flex justify-content-around pb-1">
                        {this.alphabet3.map((letter) => {
                            return <div onClick={() => { this.disable(letter) }} className={this.state.letterEnabled[letter] ? "click-item d-flex justify-content-center" : "disabled d-flex justify-content-center"}>{letter}</div>
                        })}
                    </div>
                </div>
            </div>
        );
    }   
}

export default VirtualKeyboard;
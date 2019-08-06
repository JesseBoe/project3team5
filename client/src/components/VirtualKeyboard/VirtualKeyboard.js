import React, { Component } from "react";
import keyCss from "./VirtualKeyboard.css"


class VirtualKeyboard extends Component {
    alphabet1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    alphabet2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    alphabet3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    


    chooseLetter = (letter) => {
        this.props.socket.emit("chooseLetter", letter);
    }

    // disable = (letter) => {
    //     console.log(this.state[letter]);
    //     var newLetters = this.state.letterEnabled;
    //     newLetters.push(letter);
    //     this.setState({
    //         onlyVowels : this.state.onlyVowels,
    //         letterEnabled : newLetters
    //     })
    // }

    canSelect = (letter) => {
        let vowels = ['A', 'E', 'I', 'O', 'U'];
        if (this.props.gameState.onlyVowels) {
            if (vowels.indexOf(letter) !== -1) {
                if (this.props.gameState.disabledLetters.indexOf(letter) == -1) {
                    return true;
                }
                return false;
            }
            return false;
        }
        else {
            if (vowels.indexOf(letter) == -1) {
                if (this.props.gameState.disabledLetters.indexOf(letter) == -1) {
                    return true;
                }
                return false;
            }
            return false;
        }
    }

    render() {
        return (
            <div className = "Card Keyboard" style={{ width: "100%"}}>
                <div style={{width:"95%", margin:"auto"}}>
                    <div className="d-flex justify-content-around pt-1">
                        {this.alphabet1.map((letter) => {
                            return <div key={"keyboard-" + letter} onClick={() => { this.chooseLetter(letter) }} className={this.canSelect(letter) ? "click-item d-flex justify-content-center unselect" : "disabled d-flex justify-content-center unselect"}>{letter}</div>
                        })}
                    </div>
                    <div className="d-flex justify-content-around">
                        {this.alphabet2.map((letter) => {
                            return <div key={"keyboard-" + letter} onClick={() => { this.chooseLetter(letter) }} className={this.canSelect(letter) ? "click-item d-flex justify-content-center unselect" : "disabled d-flex justify-content-center unselect"}>{letter}</div>
                        })}
                    </div>
                    <div className="d-flex justify-content-around pb-1">
                        {this.alphabet3.map((letter) => {
                            return <div key={"keyboard-" + letter} onClick={() => { this.chooseLetter(letter) }} className={this.canSelect(letter) ? "click-item d-flex justify-content-center unselect" : "disabled d-flex justify-content-center unselect"}>{letter}</div>
                        })}
                    </div>
                </div>
            </div>
        );
    }   
}

export default VirtualKeyboard;
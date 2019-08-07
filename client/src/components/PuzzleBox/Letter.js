import React, { Component } from "react";

class Letter extends Component {

    isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
    }


    render() {

        let display;

        if (this.props.letter == "_") {
            display = <span className="letter">
                {this.props.letter}
            </span>;
        }
        else if (!this.isLetter(this.props.letter)) {
            display = <span className="letter">
                {this.props.letter}
            </span>;
        }
        else {
            display = <span id={this.props.keyid} style={{opacity: 0}} className="anim3 letter">
                {this.props.letter}
            </span>;
        }

        return (
            <span>
                {display}
            </span>
        )
    }
}


export default Letter;
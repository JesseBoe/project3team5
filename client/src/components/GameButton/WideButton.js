import React, {Component} from "react";
import style from "./GameButton.css"

class WideButton extends Component {


    render() {
        return <div onClick={() => { this.props.func(); }} className="rcorners3 d-flex justify-content-center" style={{ width: "90%", color: "#ba1e68", borderColor: this.props.color}}>
            <span className="unselect" style={{ color: this.props.color, fontSize: "28px", cursor: "pointer" }}>{this.props.text}</span>
        </div> 
    }
}

export default WideButton;
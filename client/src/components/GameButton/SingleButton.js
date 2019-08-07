import React, {Component} from "react";
import style from "./GameButton.css"

class singleButton extends Component {


    render() {
        return <div onClick={() => { this.props.func(); }} className="rcorners1 d-flex justify-content-center" style={{borderColor: this.props.color}}>
            <span className="unselect" style={{ color: this.props.color, fontSize: "28px", cursor: "pointer" }}>{this.props.text}</span>
        </div> 
    }
}

export default singleButton;
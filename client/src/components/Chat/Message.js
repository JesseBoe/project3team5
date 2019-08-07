import React, { Component } from "react";

class Message extends Component {
    render() {
        return (
            <div className="message" style={{ margin: "6px 0px" }}>
                <span className="Name" style={{ color: "red" }}>{this.props.Name + ": "} </span><span>{this.props.text}</span>
            </div>
        )
    }
}

export default Message;
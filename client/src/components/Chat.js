import React, { Component } from "react";
import Message from "./Message";

class Chat extends Component {
    chatAtBottom = true;
    socket = "";

    state = {
        messages: [],
        textField : "",
        userName : "Jesse"
    }

    componentDidMount() {
        if (this.props.socket) {
            this.socket = this.props.socket;
            this.socket.on("RecieveMessage", (data) => {
                this.setMessage(data.name, data.text);
            })
        }
        else {
            console.log("Socket is not yet mounted");
        }

        let chatBody = document.getElementById("chatBody");
        chatBody.onscroll = (event) => {
            this.chatAtBottom = chatBody.scrollTop + 160 > chatBody.scrollHeight - 1;
        };

        let textbox = document.getElementById("textfield");
        textbox.addEventListener('keypress', (event) => {
            if (event.keyCode == 13) {
                this.sendMessage();
            }
        });
    }

    componentDidUpdate() {
        if (this.chatAtBottom) {
            let chatBody = document.getElementById("chatBody");
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    sendMessage() {
        let data = {
            name : this.state.userName,
            text : this.state.textField
        }
        this.setState({
            textField: ""
        });
        this.setMessage(data.name, data.text);
        this.socket.emit("SendMessage", data);
    }

    setMessage(_name, _text) {
        if (_text.trim()) {
            let temp = this.state.messages;
            temp.push({ name: _name, text: _text });
            this.setState({
                messages: temp
            });
        }
    }

    handleInputChange = event => {
        let value = event.target.value;
        this.setState({
            textField: value
        });
    };

    render() {
        return (
            <div className="card ml-4 mt-4" style={{width: "50%"}}>
                <div className="card-header text-center bg-light" style={{height: "12px"}}></div>
                <div className="card-body bg-light" id="chatBody" style={{height: "160px", overflowY: "scroll", padding: "6px 20px"}}>
                    <div className="welcome text-muted">
                        Welcome to the chat room!
                    </div>
                    {this.state.messages.map((message) => {
                        return(<Message Name={message.name} text={message.text}></Message>)
                    })}
                </div>
                <div className="card-footer bg-light" style={{ padding: "10px 8px 6px 16px" }}>
                    <div className="d-flex flex-row">
                        <input className="p-2 form-control" id="textfield" value={this.state.textField} onChange={this.handleInputChange} style={{width: "92%", marginRight: "16px" }} type="text"></input>
                        <button type="submit" onClick={() => {this.sendMessage()}} style={{height: "38px"}} className="p-2 btn btn-info">Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
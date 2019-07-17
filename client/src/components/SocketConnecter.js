import React, { Component } from "react";
import openSocket from "socket.io-client"

class SocketConnecter extends Component {
    socket = null;

    connect() {
        if (!this.socket) {
            console.log("Login!");
            this.socket = openSocket("https://uw-bootcamp-project3.herokuapp.com/");
        }
    }

    sendMessage() {
        var tweet = { user: "Jesse", text: "Hello, world!" };
        this.socket.emit("tweet", tweet);
    }

    disconnect() {
        if (this.socket) {
            console.log("disconnect!");
            this.socket.emit("disconnect");
            this.socket = null;
        }
    }

    render() {
        return (
            <div className="Container">
                <div className="card-deck" style={{ marginTop: "30px", width: "50%" }}>
                    <div className="card">
                        <button type="button" onClick={() => this.connect()} className="btn btn-primary">Connect</button>
                    </div>
                    <div className="card">
                        <button type="button" className="btn btn-warning">Join Room</button>
                    </div>
                    <div className="card">
                        <button type="button" onClick={() => this.disconnect()} className="btn btn-danger">Disconnect</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SocketConnecter;
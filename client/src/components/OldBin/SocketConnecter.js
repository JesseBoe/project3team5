import React, { Component } from "react";
import openSocket from "socket.io-client"

const PORT = process.env.PORT || 3001;

class SocketConnecter extends Component {
    socket = null;

    connect() {
        if (!this.socket) {
            console.log("Login!");
            this.socket = openSocket(window.location.host + ":" + PORT);
        }
    }

    sendMessage() {
        console.log(window.location.host);
        var tweet = { user: "Jesse", text: "Hello, world!" };
        this.socket.emit("tweet", tweet);
    }

    disconnect() {
        if (this.socket) {
            console.log("disconnect!");
            this.socket.disconnect();
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
                        <button type="button" className="btn btn-warning">Nothing</button>
                    </div>
                    <div className="card">
                        <button type="button" onClick={() => this.disconnect()} className="btn btn-danger">Disconnect</button>
                    </div>
                </div>
                <navbar>

                </navbar>
            </div>
        );
    }
}

export default SocketConnecter;
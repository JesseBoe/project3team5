import React, { Component } from "react";
import openSocket from "socket.io-client"

class SocketConnecter extends Component {
    socket;

    connect() {
        console.log("Login!");
        socket = openSocket("https://uw-bootcamp-project3.herokuapp.com/");
    }

    disconnect() {
        console.log("disconnect!");
        this.socket.emit("disconnect");
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
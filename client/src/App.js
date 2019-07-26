import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"

import Chat from "./components/Chat/Chat.js";

class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <div>
        <Chat socket={this.socket} />
      </div>
    );
  }
}

export default App;

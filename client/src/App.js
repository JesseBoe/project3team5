import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"

import SocketConnecter from "./components/SocketConnecter";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Timer from "./components/Timer";
import Chat from "./components/Chat";


class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <Chat socket={this.socket}/>
    );
  }
}

export default App;

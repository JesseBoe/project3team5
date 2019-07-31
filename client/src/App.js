import React, { Component } from "react";
import io from "socket.io-client";
import SocketConnector from "./components/SocketConnecter";
import HangmanGame from "./components/HangmanGame";
import Login from "./components/Login";
import Wheel from "./components/Wheel";

//const localhostSocket = io.connect("http://localhost:3000");
const PORT = process.env.PORT || 3001;
// console.log("http://" + window.location.hostname + ":" + PORT);
const localhostSocket = io.connect("http://" + window.location.hostname + ":" + PORT);
// console.log(Winwheel + " app.js - Client")

class App extends Component {
 
  render() {
    return (
      <Login socket={localhostSocket}>
        <SocketConnector />
        <Wheel />
        <HangmanGame />
      </Login>
    );
  }
}

export default App;

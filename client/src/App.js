import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"
import Login from "./components/Login";
import Wheel from "./components/Wheel/Wheel";
import HangmanGame from "./components/HangmanGame";


import SayWhat from "./components/SayWhat";
import AvatarSetter from "./components/PlayerAvatar/AvatarSetter"

class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <div>
        {/* <Login socket={this.socket}></Login> */}
        <SayWhat socket={this.socket}/>
        <HangmanGame/>

      </div>
    )
  }
}

export default App;

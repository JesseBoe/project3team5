import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"

import GameButton from "./components/GameButton/GameButton"
import NavBar from "./components/Navbar/Navbar"
import Chat from "./components/Chat/Chat.js";
import PlayerAvatar from "./components/PlayerAvatar/PlayerAvatar";
import VirtualKeyboard from "./components/VirtualKeyboard/VirtualKeyboard";
import SayWhat from "./components/SayWhat";

class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <div>
        <SayWhat socket={this.socket}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"

import GameButton from "./components/GameButton/GameButton"
import NavBar from "./components/Navbar/Navbar"
import Chat from "./components/Chat/Chat.js";
import PlayerAvatar from "./components/PlayerAvatar/PlayerAvatar";

class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <div>
        <NavBar></NavBar>
      </div>
    );
  }
}

export default App;

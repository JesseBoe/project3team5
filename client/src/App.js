import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"
import Login from "./components/Login";
import Wheel from "./components/Wheel/Wheel";


import SayWhat from "./components/SayWhat";

class App extends Component {
  socket = openSocket(window.location.host);
  render() {
    return (
      <div>
        {/* <Login socket={this.socket}></Login> */}
        <SayWhat socket={this.socket}/>
      </div>
    )
  }
}

export default App;

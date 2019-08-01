import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"
import Login from "./components/Login/Login";
import Wheel from "./components/Wheel/Wheel";


import SayWhat from "./components/SayWhat";
console.log(window.location.host);
class App extends Component {
  socket = openSocket(window.location.host);
  
  render() {
    return (
      <div>
        <Login>
        {/* <Login socket={this.socket}></Login> */}
        <SayWhat socket={this.socket}/>
        </Login>
      </div>
    )
  }
}

export default App;

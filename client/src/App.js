import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketConnecter from "./components/SocketConnecter";
import NavBar from "./components/NavBar/index";

class App extends Component {
  render() {
    return (
      // <SocketConnecter/>
      <NavBar/>   
       );
  }
}

export default App;

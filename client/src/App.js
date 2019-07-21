import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketConnecter from "./components/SocketConnecter";
import VirtualKeyboard from "./components/VirtualKeyboard";

class App extends Component {
  render() {
    return (
      <VirtualKeyboard/>
    );
  }
}

export default App;

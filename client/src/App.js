import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketConnecter from "./components/SocketConnecter";

class App extends Component {
  render() {
    return (
      <SocketConnecter/>
    );
  }
}

export default App;

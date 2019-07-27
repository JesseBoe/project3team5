import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketConnecter from "./components/SocketConnecter";
import NavBar from "./components/NavBar/index";
import Winner from "./components/Winner/index";

class App extends Component {
  render() {
    return (
      // <SocketConnecter/>
      <div>
        <NavBar />
        <Winner />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client"
import Login from "./components/Login/Login";
import Wheel from "./components/Wheel/Wheel";

import SayWhat from "./components/SayWhat";
import AvatarSetter from "./components/PlayerAvatar/AvatarSetter"

import players from "./pages/players";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import playerDetail from "./pages/playerDetail";
import home from "./pages/home";

console.log(window.location.host);

class App extends Component {
  socket = openSocket(window.location.host);
  
  render() {
    return (
      <div>
        <Login>
        <Router>
        <Switch> 
        <Route exact path="/" component={home} />
          <Route exact path="/players" component={players} />
          <Route exact path="/players/:id" component={playerDetail} />
          </Switch>
        </Router>
        <SayWhat socket={this.socket}/>
        </Login>
      </div>
    )
  }
}

export default App;

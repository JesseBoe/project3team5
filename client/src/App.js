import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import Login from "./components/Login/Login";
import Wheel from "./components/Wheel/Wheel";

import SayWhat from "./components/SayWhat";
import AvatarSetter from "./components/PlayerAvatar/AvatarSetter";

import Players from "./pages/Players";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import playerDetail from "./pages/playerDetail";
import Profile from "./pages/Profile";

console.log(window.location.host);

class App extends Component {
  socket = openSocket(window.location.host);

  render() {
    return (
      <div>
        
          <Login>

            
              {/* <Route exact path="/" component={Profile} /> */}
              <Route
                exact
                path="/gameplay"
                render={() => <SayWhat socket={this.socket} />}
              />
              <Route exact path="/players" component={Players} />
              <Route exact path="/players/:id" component={playerDetail} />
              <Route
                // exact
                // path="/hello"
                render={() => <div>Hello</div>}
              />
            
          </Login>
       
      </div>
    );
  }
}

export default App;

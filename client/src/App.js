import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import Login from "./components/Login/Login";
import Wheel from "./components/Wheel/Wheel";

import SayWhat from "./components/SayWhat";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import JoinGameForum from "./components/JoinGameForum/JoinGameForum";

import Players from "./pages/Players";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import playerDetail from "./pages/playerDetail";
import Profile from "./pages/Profile";

let local = false;
if (window.location.host == "localhost:3000") {
  local = true;
}

class App extends Component {
  socket = local
    ? openSocket("localhost:3001")
    : openSocket(window.location.host);

  render() {
    return (
      <div>
        <Login>
          {loggedInUser => {
            console.log(loggedInUser);
            return (
              <div>
                <Route
                  exact
                  path="/"
                  render={() => <Profile user={loggedInUser} />}
                />
                <Route
                  exact
                  path="/gameplay"
                  render={() => (
                    <SayWhat socket={this.socket} user={loggedInUser} />
                  )}
                />
                <Route
                  exact
                  path="/players"
                  render={() => <Players user={loggedInUser} />}
                />
                <Route exact path="/players/:id" component={playerDetail} />
                <Route
                  path="/room/:roomid"
                  render={() => (
                    <WaitingRoom
                      create={false}
                      socket={this.socket}
                      user={loggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/create"
                  render={() => (
                    <WaitingRoom
                      create={true}
                      socket={this.socket}
                      user={loggedInUser}
                    />
                  )}
                />
                <Route exact path="/join" render={() => <JoinGameForum />} />
              </div>
            );
          }}
        </Login>
      </div>
    );
  }
}

export default App;

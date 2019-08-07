import React, { Component } from "react";
import "./App.css";
import openSocket from "socket.io-client";
import Login from "./components/Login/Login";

import SayWhat from "./components/SayWhat";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import JoinGameForum from "./components/JoinGameForum/JoinGameForum";

import Players from "./pages/Players";
import { BrowserRouter as Router, Route } from "react-router-dom";
import playerDetail from "./pages/playerDetail";
import Profile from "./pages/Profile";

let local = false;
if (window.location.host === "localhost:3000") {
  local = true;
}




class App extends Component {
  socket = local
    ? openSocket("localhost:3001")
    : openSocket(window.location.host);


  componentDidMount() {

    window.onunload = function () {
      console.log("Do you really want to close?");
    };
  
  window.addEventListener("onunload", function (e) {
    var confirmationMessage = "the dude abides";
    this.console.log(confirmationMessage); 
    return confirmationMessage;                            //Webkit, Safari, Chrome
    });
  }

  render() {
    return (
      <div>
        <Login>
          {loggedInUser => (
            <div>
              <Route
                exact
                path="/"
                render={() => <Profile user={loggedInUser} />}
              />
              <Route exact path="/players" render={() => <Players user={loggedInUser} />} />
              <Route exact path="/players/:id" component={playerDetail} />
              <Route path="/room/" render={() => (<WaitingRoom create={false} socket={this.socket} user={loggedInUser}/>)}/>
              <Route exact path="/create" render={() => (<WaitingRoom create={true} socket={this.socket} user={loggedInUser}/>)} />
              <Route exact path="/join" render={() => (<JoinGameForum/>)}/>
              <Route path="/game/:roomid" render={() => (<SayWhat socket={this.socket} user={loggedInUser}/>)}/>
            </div>
          )}
        </Login>
      </div>
    );
  }
}



export default App;

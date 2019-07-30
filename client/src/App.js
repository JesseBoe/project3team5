import React, { Component } from "react";
import io from "socket.io-client";
import SocketConnector from "./components/SocketConnecter";
import Login from "./components/Login";
import HangmanGame from "./components/HangmanGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";

import players from "./pages/players";

import playerDetail from "./pages/playerDetail";

import home from "./pages/home";

//const localhostSocket = io.connect("http://localhost:3000");
const PORT = process.env.PORT || 3001;
console.log("http://" + window.location.hostname + ":" + PORT);
const localhostSocket = io.connect("http://" + window.location.hostname + ":" + PORT);


class App extends Component {
 
  render() {
    return (
      <Login socket={localhostSocket}>
      <SocketConnector/>
      <HangmanGame/>
      <Router>
      <div>
        
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/players" component={players} />
          <Route exact path="/players/:id" component={playerDetail} />
          
          
          <Route component={NoMatch} />
        </Switch>
    
      </div>
    </Router>
    </Login>
    );
  }
}

export default App;

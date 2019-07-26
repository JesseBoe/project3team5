import React, { Component } from 'react';
import SocketConnecter from "./components/SocketConnecter";
import Game from "./components/game";


class App extends Component {

  render() {
    return (<Game/>);
  }  
}

export default App;

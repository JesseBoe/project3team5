import React, { Component } from "react";
import "./style.css";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <navbar bg="light" className="NavBar">
          <a href="#home" className="Brand">Home Link</a>
        </navbar>
      </div>
    );
  }
}

export default NavBar;
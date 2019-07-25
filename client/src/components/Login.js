import React from "react";
import EmailLogin from "./EmailLogin";
import Googler from "./Googler";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  onSuccess = () => {
    console.log("onSuccess works");
    this.setState({ authenticated: true });
  };

  render() {
    if (this.state.authenticated) {
      return this.props.children;
    } else {
      return (
        <div>
          <EmailLogin socket={this.props.socket} onSuccess={this.onSuccess} />
          <Googler onSuccess={this.onSuccess} />
        </div>
      );
    }
  }
}

export default Login;

import React from "react";

class EmailLogin extends React.Component {
  constructor(props) {
    super(props);
    props.socket.on("wendy", function() {
      console.log("ready to roll");
      props.onSuccess();
    });
    this.state = {
      username: "",
      password: ""
    };
  }

  onLogIn = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.socket.emit("authentication", this.state);
  };

  onSignUp = () => {
    this.props.socket.emit("authentication", { ...this.state, register: true });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSocket = event => () => {
    console.log("dude");
    this.props.socket.emit(event);
  };

  render() {
    return (
      <form size="large">
        <h1>Please Log In</h1>
        <div>
          <input
            name="username"
            fluid="true"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input
            name="password"
            fluid="true"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <br />
          <button onClick={this.onLogIn} color="blue" size="large">
            Log In
          </button>
          <button onClick={this.onSignUp} color="violet" size="large">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default EmailLogin;

import React, { Component } from "react";
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

class Googler extends Component {
  render() {
    return (
      <GoogleLogin
        clientId="1016935393851-duns3pih1cn8q1am141cd3e2loj3mklq.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.props.onSuccess}
        onFailure={responseGoogle}
      />
    );
  }
}

export default Googler;

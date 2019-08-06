import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";
import "./login.css";
var props;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit worked");
    this.props._login(this.state.username, this.state.password);
    this.setState({
      redirectTo: this.props.redirectAfterLogin
    });
  }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        } else {
            return (
                <div className="modal-wrapper LoginForm"
                    style={{
                    // transform: props.show ? 'translateY(0vh)' : 'translateY(-0vh)',
                    // opacity: props.show ? '1' : '0'
                    }}>
                    <div className="modal-header">
                        <h1>Login</h1>
                        <span className="close-modal-btn" onClick={'/signup'}>×</span>
                        {/* <span className="close-modal-btn" onClick={props.close}>×</span> */}
                    </div>
                    <div className="modal-body">
                        <form name="signin" id="modalForm">
                            <div className="inputField">
                                <label id="label-username" htmlFor="username">Username:</label>
                                <input
                                  className="inputField form-control" 
                                  id="username-input"
                                  type="text"
                                  name="username"
                                  value={this.state.username}
                                  onChange={this.handleChange}
                                  placeholder="Enter username"
                                  />
                            </div>
                            <div className="inputField">
                                <label id="label-password" htmlFor="password">Password:</label>
                                <input
                                    className="inputField form-control" 
                                    id="password-input"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Enter password"
                                  />
                            </div>
                        </form>
                    </div>
                    <div> 
                        <button className='submit-button btn-block' onClick={this.handleSubmit}>Login</button>
                    </div>
                    <div>
                        <a className="login-image" href="/auth/google">
                            <img src={googleButton} alt="sign into Google Button" />
                        </a>
                    </div>
                    <div className="modal-footer">
                        <a href="/signup" className='footerText'c>Create Account</a>
                    </div> 
                </div>
            );
        }
    }
}

export default LoginForm;

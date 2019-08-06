import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import "./login.css";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";
var props;

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // TODO - validate!
        axios
            .post('/auth/signup', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log(response)
                if (!response.data.errmsg) {
                    console.log('youre good')
                    this.setState({
                        redirectTo: '/login'
                    })
                } else {
                    console.log('duplicate')
                }
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }}
            />
        }
        return (
            <div className="modal-wrapper SignupForm"
                style={{
                    // transform: props.show ? 'translateY(0vh)' : 'translateY(-0vh)',
                    // opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h1>Create Account</h1>
                    <span className="close-modal-btn" onClick={'/signup'}>×</span>
                    {/* <span className="close-modal-btn" onClick={props.close}>×</span> */}
                </div>
                <div className="modal-body">
                    <form name="signup" id="modalForm">
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
                        </div>confirmpass-input
                        <div className="inputField">
                            <label id="label-confirm" htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                className="inputField form-control" 
                                id="confirm-input"
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                placeholder="Confirm your password"
                            />
                        </div>
                    </form>
                </div>
                <div> 
                    <button className='submit-button btn-block' onClick={this.handleSubmit}>Register</button>
                </div>
                <div>
                    <a className="login-image" href="/auth/google">
                        <img src={googleButton} alt="sign into Google Button" />
                    </a>
                </div>
                <div className="modal-footer">
                    <a href="/login" className='footerText'c>Sign in</a>
                </div> 
            </div>
        );
    }
}

export default SignupForm
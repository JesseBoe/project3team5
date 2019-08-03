import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "../SignupForm";
import axios from "axios";
import { Route, Link, Redirect, Switch } from "react-router-dom";

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li>
            <Link to="#" className="nav-link" onClick={props.logout}>
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gameplay" className="nav-link">
              Game Play
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/players" className="nav-link">
              Players
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <ul className="nav">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
  }

  componentDidMount() {
    axios.get("/auth/user").then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        console.log("THERE IS A USER");
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios.post("/auth/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _login(username, password) {
    console.log("_login working");
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        console.log("hello repsonse!");
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }

  render() {
    return (
      <div className="LoginPage">
        {/* LINKS to our different 'pages' */}
        <DisplayLinks logout={this._logout} loggedIn={this.state.loggedIn} />
        {/* ROUTES */}
        {/* <Route exact path="/" component={Home} /> */}
        
        {this.state.loggedIn ? this.props.children : <Redirect to={{ pathname: "/login "}} />}
            
        <Route
          exact
          path="/login"
          render={() => {
            if (this.state.loggedIn) {
              return <Redirect to={{ pathname: "/" }} />;
            } else {
              return (
                <LoginForm
                  _login={this._login}
                  _googleSignin={this._googleSignin}
                />
              );
            }
          }}
        />
        <Route exact path="/signup" component={SignupForm} />
        
      </div>
    );
  }
}

export default Login;

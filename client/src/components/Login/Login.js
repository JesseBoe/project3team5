import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Navbar from "../Navbar/Navbar.js"
import axios from "axios";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import "./login.css";

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <Navbar logout={props.logout} loggedin={true}/>
      // <nav className="navbar">
      //   <ul className="nav">
      //     <li>
      //       <Link to="#" className="nav-link" onClick={props.logout}>
      //         Logout
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/gameplay" className="nav-link">
      //         Game Play
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/" className="nav-link">
      //         Profile
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/players" className="nav-link">
      //         Players
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/create" className="nav-link">
      //         Create
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/join" className="nav-link">
      //         Join
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
    );
  } else {
    return (
      <Navbar logout={props.logout} loggedin={false}/>
      // <nav className="navbar">
      //   <ul className="nav">
      //     {/* <li className="nav-item">
      //       <Link to="/" className="nav-link">
      //         Home
      //       </Link>
      //     </li> */}
      //     <li className="nav-item">
      //       <Link to="/login" className="nav-link">
      //         Login
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link to="/signup" className="nav-link">
      //         Sign Up
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
    );
  }
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
  }
  waiting = true;

  componentDidMount() {
    axios.get("/auth/user").then(response => {
      console.log(response.data);
      this.waiting = false;
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
    if (this.waiting) {
      return (<div></div>);
    }
    let redirect = null;
    if (!this.props.location.pathname.startsWith("/login") && !this.props.location.pathname.startsWith("/signup")) {
      if (!this.state.loggedIn) {
        redirect = (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirectTo: this.props.location.pathname }
            }}
          />
        );
      }
    }
    return (
      <div className="LoginPage">
        {/* LINKS to our different 'pages' */}
        <DisplayLinks logout={this._logout} loggedIn={this.state.loggedIn} />
        {/* ROUTES */}
        {/* <Route exact path="/" component={Home} /> */}

        {this.state.loggedIn ? this.props.children(this.state.user) : redirect}

        <Route
          // exact
          path="/login"
          render={props => {
            console.log(props);
            if (this.state.loggedIn) {
              return (
                <Redirect to={{ pathname: this.state.redirectTo }} />
              );
            } else {
              return (
                <LoginForm
                  _login={this._login}
                  _googleSignin={this._googleSignin}
                  redirectAfterLogin={this.state.redirectTo}
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

export default withRouter(Login);

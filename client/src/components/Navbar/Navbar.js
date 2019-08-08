import React, { Component } from "react";
import logo from "./SayWhatLogo.svg";
import { Route, Link, Redirect, withRouter } from "react-router-dom";

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="row d-flex" style={{ backgroundColor: "#1D1135", Width:"100%", color: "white", height: "70px"}}>
                    <span className="d-flex flex-grow-1 p-2"><span><img alt="pointer" style={{cursor: "pointer", position: "absolute", top:"-32px", left: "30px"}} src={logo} height="145px" width="155px"></img></span></span>
                    {this.props.loggedin && <span className=" d-flex p-2 mt-2 mr-3"><span style={{marginTop: "8px"}}>SPACE CREDITS: 103294</span></span> || <span className="d-flex p-2"></span>}
                    {this.props.loggedin && <div className="d-flex p-2 mt-3 mr-3">Currently logged in as: <span style={{ color: "#ba1e68", textDecoration: "underline", textDecorationStyle: "double" }}> Jesse</span></div>}
                    {this.props.loggedin && <div className="d-flex p-2 mt-2 mr-3"> <Link to="#" className="nav-link" onClick={this.props.logout}>Logout</Link></div>}
                </nav>
            </div>
        )
    }
}

export default Navbar;

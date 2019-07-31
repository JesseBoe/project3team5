import React, { Component } from "react";
import logo from "./SayWhatLogo.svg"

class Navbar extends Component {

    state = {
        LoggedIn : true,
    }

    render() {
        var userElement;

        if (this.state.LoggedIn) {
            userElement = 
                <span className=" d-flex col-2 justify-content-end">
                    <span style={{ marginTop: "8px" }}>Currently logged in as: <span style={{ color: "#ba1e68", textDecoration: "underline", textDecorationStyle: "double" }}>Jesse</span> </span>
                </span>
        }
        else {
            userElement = 
                <span className="d-flex col-2 justify-content-end">
                    <span style={{ marginTop: "8px" }}> Click here to login!</span>
                </span>
        }


        return (
            <div>
                <nav className="row d-flex" style={{ backgroundColor: "#1D1135", maxWidth:"100%", color: "white", height: "70px", paddingLeft: "35px", paddingRight: "35px", paddingTop: "16px"}}>
                    <span className="d-flex col-8 mb-0"><span><img style={{cursor: "pointer", position: "absolute", top:"-44px"}} src={logo} height="125px" width="125px"></img></span></span>
                    {this.state.LoggedIn && 
                    <span className=" d-flex col-2">
                        <span style={{marginTop: "8px"}}>SPACE CREDITS: 103294</span>
                    </span> ||
                        <span className="d-flex col-2"></span>
                    }
                    {userElement}
                </nav>
            </div>
        )
    }
}

export default Navbar;

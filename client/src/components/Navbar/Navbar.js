import React, { Component } from "react";

class Navbar extends Component {

    state = {
        LoggedIn : true,
    }

    render() {
        var userElement;

        if (this.state.LoggedIn) {
            userElement = 
                <span className=" d-flex col-2 justify-content-end">
                    <span>Currently logged in as: <span style={{ color: "#ba1e68", textDecoration: "underline", textDecorationStyle: "double" }}>Jesse</span> </span>
                </span>
        }
        else {
            userElement = 
                <span className="d-flex col-2 justify-content-end">
                    <span> Click here to login!</span>
                </span>
        }


        return (
            <div>
                <nav className="row d-flex" style={{ backgroundColor: "#1d1135", color: "white", height: "60px", paddingLeft: "35px", paddingRight: "35px", paddingTop: "16px"}}>
                    <span className="d-flex col-8 mb-0"><span>[LOGO]</span></span>
                    {this.state.LoggedIn && 
                    <span className=" d-flex col-2">
                        <span>SPACE CREDITS: 103294</span>
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

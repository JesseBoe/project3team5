import React, { Component } from "react";
import PlayerSection from "../PlayerAvatar/PlayerSection";
import { Route, Link, Redirect, Switch } from "react-router-dom";

class joinGameForum extends Component {


    state = {
        roomid : "",
        redirect : false
    }

    handleChange = (event) => {
        this.setState({
            roomid: event.target.value
        })
    }

    render() 
    {
        return <div>
            <div>
                <label for="roomText">Room Id:</label>
                <input className="form-control form-control-lg" onChange={this.handleChange} id="roomText" type="text" placeholder="room id"/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => {this.setState({redirect : true})}}>Join</button>
            </div>
            {this.state.redirect ? (<Redirect to={{ pathname: `/room/${this.state.roomid}` }}/>) : ""};
        </div>
    }
}

export default joinGameForum;
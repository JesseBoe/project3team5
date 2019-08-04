import React, {Component} from "react";
import PlayerSection from "../PlayerAvatar/PlayerSection";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import SingleButton from "../GameButton/SingleButton"

let gameData = "";


class WaitingRoom extends Component {

    redirectPath = "";
    localReady = false;

    toggleReady = () => {
        this.props.socket.emit("toggleReady");
        this.forceUpdate();
    }
    
    componentDidMount() {
        if (this.props.create) {
            this.props.socket.emit("createGame");
            this.props.socket.on("createGameResponse", (str) => {
                this.redirectPath = `/room/${str}`;
                console.log("Response");
                this.forceUpdate();
            });
        } else {
            this.props.socket.emit("joinGame", window.location.pathname.split("/").pop());
            this.forceUpdate();
        }
        this.props.socket.on("returnGameData", (data) => {
            gameData = data;
            this.forceUpdate();
        });
        this.props.socket.on("recieveMyPlayerData", (data) => {
            this.localReady = data.ready;
        })
    }

    render() {
        return <div className="container">
            <div>
                <div style={{marginTop: "25%", textAlign: "center", fontSize: "48px", color:"white"}}>Waiting for players</div>
                <div className= "d-flex justify-content-center" style={{marginTop: "20%"}}>
                    <SingleButton color={this.localReady ? "#1eba57" : "#ba1e68"} func={this.toggleReady} text={this.localReady ? "Not Ready" : "Ready"}/>
                </div>
                <PlayerSection gameData={gameData}/>
                {this.redirectPath !== "" ? <Redirect to={{ pathname: this.redirectPath }} /> : ""}
            </div>
        </div>
    }
}

export default WaitingRoom;
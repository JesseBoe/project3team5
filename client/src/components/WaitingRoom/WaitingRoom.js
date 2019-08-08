import React, {Component} from "react";
import PlayerSection from "../PlayerAvatar/PlayerSection";
import { Redirect } from "react-router-dom";
import SingleButton from "../GameButton/SingleButton"

let gameData = "";


class WaitingRoom extends Component {

    redirectPath = "";
    redirectPath2 = "";
    localReady = false;

    toggleReady = () => {
        this.props.socket.emit("toggleReady");
        this.forceUpdate();
    }
    
    componentDidMount() {
        console.log(this.props.user);
        let playerObj = { username: (this.props.user.local ? this.props.user.local.username : this.props.user.firstName), robotAntenna: this.props.user.robot.RobotAntenna, robotImage: this.props.user.robot.RobotImage, robotColor: this.props.user.robot.RobotColor};
        this.props.socket.emit("setPlayer", playerObj);

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
            console.log(gameData);
            this.forceUpdate();
        });
        this.props.socket.on("recieveMyPlayerData", (data) => {
            this.localReady = data.ready;
            this.forceUpdate();
        })
        this.props.socket.on("startGame", (data) => {
            this.redirectPath2 = `/game/${data}`
            this.forceUpdate();
        })
    }

    render() {
        return <div className="container">
            <div>
                <div style={{marginTop: "18%", textAlign: "center", fontSize: "48px", color:"white"}}>Waiting for players</div>
                <div className= "d-flex justify-content-center" style={{marginTop: "10%"}}>
                    <SingleButton color={this.localReady ? "#1eba57" : "#ba1e68"} func={this.toggleReady} text={this.localReady ? "Ready" : "Join Game"}/>
                </div>
                <PlayerSection gameData={gameData}/>
                {this.redirectPath !== "" ? <Redirect to={{ pathname: this.redirectPath }} /> : ""}
                {this.redirectPath2 !== "" ? <Redirect to={{ pathname: this.redirectPath2 }} /> : ""}
            </div>
        </div>
    }
}

export default WaitingRoom;
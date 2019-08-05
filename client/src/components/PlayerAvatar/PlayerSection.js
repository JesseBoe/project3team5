import React, { Component } from "react";
import NewAvatar from "./NewAvatar";


class PlayerSection extends Component {
    render() {
        return(
            <div style={{ position: "absolute", left: 0, bottom: 0, width: '100%' }}>
                <div className="container d-flex justify-content-around" style={{ position: "relative"}}>
                    {this.props.gameData && this.props.gameData.players.map((player => {
                        return (
                            <span key={player.username}>
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    {this.props.gameData.hasStarted ? "" : <div style={{ position: "absolute", width: "140px", top: '-64px', textAlign: 'center', fontSize: "24px", color: player.ready ? "#1eba57" : "#ba1e68" }}>{player.ready ? "Ready" : "Not Ready"}</div>}
                                    <div style={{ position: "absolute", color: "#ba1e68", top: "-34px", width: "140px", textAlign: "center", fontSize: "32px" }}>{player.username}</div>
                                    <NewAvatar RobotAntenna={player.robotAntenna} RobotColor={player.robotColor} RobotImage={player.robotBody} />
                                    <div style={{ position: "absolute", left: "7px", bottom: "4px", height: "24px", width: "90%", textAlign: "center", backgroundColor: "rgb(0, 0, 0, .75)", color: "white" }}>
                                        <span style={{ opacity: "1", color: "lightgreen" }}>{player.cash}</span>
                                    </div>
                                </div>
                            </span>
                        );
                    }))}
                </div>
            </div>
        )
    }
}

export default PlayerSection;
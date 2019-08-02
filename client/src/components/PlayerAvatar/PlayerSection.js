import React, { Component } from "react";
import NewAvatar from "./NewAvatar";

class PlayerSection extends Component {
    render() {
        return(
            <div className="d-flex justify-content-around">
                <span style={{ position:"relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", color: "#ba1e68", top: "-34px", width:"140px", textAlign: "center", fontSize: "32px"}}>Jesse</div>
                    <NewAvatar RobotAntenna="01" RobotColor="Red" RobotImage="01" />
                    <div style={{position: "absolute", left: "7px", bottom: "4px", height: "24px", width: "90%", textAlign: "center", backgroundColor: "rgb(0, 0, 0, .75)", color: "white"}}>
                        <span style={{opacity: "1", color: "lightgreen"}}>1,000</span>
                    </div>
                </span>
                <span style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", color: "#ba1e68", top: "-34px", width: "140px", textAlign: "center", fontSize: "32px" }}>Player 2</div>
                    <NewAvatar RobotAntenna="03" RobotColor="Pink" RobotImage="03" />
                    <div style={{ position: "absolute", left: "7px", bottom: "4px", height: "24px", width: "90%", textAlign: "center", backgroundColor: "rgb(0, 0, 0, .75)", color: "white" }}>
                        <span style={{ opacity: "1", color: "lightgreen" }}>1,000</span>
                    </div>
                </span>
                <span style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", color: "#ba1e68", top: "-34px", width: "140px", textAlign: "center", fontSize: "32px" }}>Player 3</div>
                    <NewAvatar RobotAntenna="02" RobotColor="Blue" RobotImage="02" />
                    <div style={{ position: "absolute", left: "7px", bottom: "4px", height: "24px", width: "90%", textAlign: "center", backgroundColor: "rgb(0, 0, 0, .75)", color: "white" }}>
                        <span style={{ opacity: "1", color: "lightgreen" }}>1,000</span>
                    </div>
                </span>
                <span style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", color: "#ba1e68", top: "-34px", width: "140px", textAlign: "center", fontSize: "32px" }}>Player 4</div>
                    <NewAvatar RobotAntenna="04" RobotColor="Purple" RobotImage="04" />
                    <div style={{ position: "absolute", left: "7px", bottom: "4px", height: "24px", width: "90%", textAlign: "center", backgroundColor: "rgb(0, 0, 0, .75)", color: "white" }}>
                        <span style={{ opacity: "1", color: "lightgreen" }}>1,000</span>
                    </div>
                </span>
            </div>
        )
    }
}

export default PlayerSection;
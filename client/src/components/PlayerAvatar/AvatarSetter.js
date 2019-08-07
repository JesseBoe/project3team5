import React, { Component } from "react";
import style from "./PlayerAvatar.css";
import Avatar from "./PlayerAvatar";
import NewAvatar from "./NewAvatar";
import ArrowLeft from "./SplitImages/ArrowLeft.png";
import ArrowRight from "./SplitImages/ArrowRight.png";

class AvatarSetter extends Component {
    state = {
        RobotImage: "01",
        RobotAntenna: "01",
        RobotColor: "Red",
    }

    colors = ["Red", "Blue", "Pink", "Purple", "Green", "Orange"]

    changeRobot = (dir) => {
        if (dir === "left") {
            if (this.state.RobotImage === "01") {
                this.setState({RobotImage : "04"})
            }
            else {
                let temp = parseInt(this.state.RobotImage);
                temp--;
                temp < 10 ? this.setState({ RobotImage: "0" + temp }) : this.setState({ RobotImage: "" + temp })
            }
        }
        if (dir === "right") {
            if (this.state.RobotImage === "04") {
                this.setState({RobotImage : "01"})
            }
            else {
                let temp = parseInt(this.state.RobotImage);
                temp++;
                temp < 10 ? this.setState({ RobotImage: "0" + temp }) : this.setState({ RobotImage: "" + temp })
            }
        }
    }

    changeAntenna = (dir) => {
        if (dir === "left") {
            if (this.state.RobotAntenna === "01") {
                this.setState({ RobotAntenna: "04" })
            }
            else {
                let temp = parseInt(this.state.RobotAntenna);
                temp--;
                temp < 10 ? this.setState({ RobotAntenna: "0" + temp }) : this.setState({ RobotAntenna: "" + temp })
            }
        }
        if (dir === "right") {
            if (this.state.RobotAntenna === "04") {
                this.setState({ RobotAntenna: "01" })
            }
            else {
                let temp = parseInt(this.state.RobotAntenna);
                temp++;
                temp < 10 ? this.setState({ RobotAntenna: "0" + temp }) : this.setState({ RobotAntenna: "" + temp })
            }
        }
    }

    changeColor = (dir) => {
        let index = this.colors.indexOf(this.state.RobotColor);
        if (dir === "left") {
            if (index === 0){
                this.setState({RobotColor: this.colors[this.colors.length -1]})
            }
            else {
                this.setState({RobotColor: this.colors[index - 1]})
            }
        }
        if (dir === "right") {
            if (index === this.colors.length -1) {
                this.setState({ RobotColor: this.colors[0] })
            }
            else {
                this.setState({ RobotColor: this.colors[index + 1] })
            }
        }
    }

    render() {
        return (
            <div style={{ width: "200px" }}>
                <div className= "d-flex justify-content-center row">
                    <div className="col" style={{paddingRight:"0px"}}>
                        <div className="justify-content-center row">
                            <img onClick={() => { this.changeAntenna("left") }} className="arrow" style={{height:"46px", marginTop:"3px"}} src={ArrowLeft}></img>
                        </div>
                        <div className="justify-content-center row">
                            <img onClick={() => {this.changeRobot("left")}} className="arrow" style={{ height: "46px" }} src={ArrowLeft}></img>
                        </div>
                        <div className="justify-content-center row">
                            <img onClick={() => { this.changeColor("left") }} className="arrow" style={{ height: "46px" }} src={ArrowLeft}></img>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center" style={{paddingRight:"0px", paddingLeft: "0px" }}>
                        <NewAvatar RobotAntenna={this.state.RobotAntenna} RobotColor={this.state.RobotColor} RobotImage={this.state.RobotImage}/>
                    </div>
                    <div className="col" style={{ paddingLeft: "0px" }}>
                        <div className="justify-content-center row">
                            <img onClick={() => { this.changeAntenna("right") }} className="arrow" style={{ height: "46px", marginTop: "3px" }} src={ArrowRight}></img>
                        </div>
                        <div className="justify-content-center row">
                            <img onClick={() => { this.changeRobot("right") }} className="arrow" style={{ height: "46px" }} src={ArrowRight}></img>
                        </div>
                        <div className="justify-content-center row">
                            <img onClick={() => { this.changeColor("right") }} className="arrow" style={{ height: "46px" }} src={ArrowRight}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AvatarSetter;
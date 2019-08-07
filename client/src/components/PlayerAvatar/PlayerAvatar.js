import React, {Component} from "react";
import style from "./PlayerAvatar.css"
const images = importAll(require.context('./SplitImages', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

class PlayerAvatar extends Component {

    componentDidMount() {
        this.render();
    }
    
    state = {
        RobotImage : "01",
        RobotAntenna : "01",
        RobotColor : "Red",
    }

    colorToRoation = (color) => {
        if (color === "Blue") {
            return 90;
        }
        if (color === "Purple") {
            return 130;
        }
        if (color === "Orange") {
            return -90;
        }
        if (color === "Pink") {
            return -135;
        }
        if (color === "Green") {
            return 45;
        }
        if (color === "Red") {
            return 235;
        }
    }
    
    render() {


        return(
            <div className="unselect" style={{position: "relative", width:"140px", height:"140px", left: "0", top: "0" }}>
                <span style={{width: "140px"}}></span>
                <img alt="robot" className="colorChange robot" style={{ position: "absolute", left: "0", top: "0", filter: "hue-rotate(" + this.colorToRoation(this.state.RobotColor) + "deg)" }} src={images["Robot-" + this.state.RobotImage + "_b.png"]}></img>
                <img alt="robot" className="colorChange robot" style={{ position: "absolute", left: "0", top: "0", filter: "hue-rotate(" + this.colorToRoation(this.state.RobotColor) + "deg)" }} src={images["Antenna-" + this.state.RobotAntenna + "_b.png"]}></img>
                <img alt="robot" className="robot" style={{ position: "absolute", left: "0", top: "0" }} src={images["Robot-" + this.state.RobotImage + ".png"]}></img>
                <img alt="robot" className="robot" style={{ position: "absolute", left: "0", top: "0" }} src={images["Antenna-" + this.state.RobotAntenna + ".png"]}></img>
            </div>
        ) 
    }
}



export default PlayerAvatar;
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
        RobotImage : "",
        RobotAntenna : "",
        RobotColor : "",
    }
    
    render() {
        return(
            <div>
                <div style={{position: "relative", left: "0", top: "0"}}>
                    <img className="colorChange" style={{ position: "relative", left: "0", top: "0"}} src={images["Robot-01_b.png"]}></img>
                    <img style={{ position: "absolute", left: "0", top: "0" }} src={images["Robot-01.png"]}></img>
                    <img style={{ position: "absolute", left: "0", top: "0" }} src={images["Antenna-01.png"]}></img>
                    
                </div>
            </div>
        ) 
    }
}



export default PlayerAvatar;
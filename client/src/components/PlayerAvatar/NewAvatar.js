import React from "react";
const images = importAll(require.context('./SplitImages', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const NewAvatar = (props) => {

    let colorToRoation = (color) => {
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

    return (
        <div className="unselect" style={{ position: "relative", width: "140px", height: "140px", left: "0", top: "0" }}>
            <span style={{ width: "140px" }}></span>
            <img alt="robot" className="colorChange robot" style={{ position: "absolute", left: "0", top: "0", filter: "hue-rotate(" + colorToRoation(props.RobotColor) + "deg)" }} src={images["Robot-" + props.RobotImage + "_b.png"]}></img>
            <img alt="robot" className="colorChange robot" style={{ position: "absolute", left: "0", top: "0", filter: "hue-rotate(" + colorToRoation(props.RobotColor) + "deg)" }} src={images["Antenna-" + props.RobotAntenna + "_b.png"]}></img>
            <img alt="robot" className="robot" style={{ position: "absolute", left: "0", top: "0" }} src={images["Robot-" + props.RobotImage + ".png"]}></img>
            <img alt="robot" className="robot" style={{ position: "absolute", left: "0", top: "0" }} src={images["Antenna-" + props.RobotAntenna + ".png"]}></img>
        </div>
    )
}

export default NewAvatar;
import React, {Component} from "react";
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
                    <img src={images["Robot-01"]}></img>
                </div>
            </div>
        ) 
    }
}

export default PlayerAvatar;
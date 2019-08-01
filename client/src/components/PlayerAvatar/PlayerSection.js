import React, { Component } from "react";
import PlayerAvatar from "./PlayerAvatar"

class PlayerSection extends Component {
    render() {
        return(
            <div className="d-flex justify-content-around">
                <span style={{ display: "inline-block" }}>
                    <PlayerAvatar />
                </span>
                <span style={{ display: "inline-block" }}>
                    <PlayerAvatar />
                </span>
                <span style={{ display: "inline-block" }}>
                    <PlayerAvatar />
                </span>
                <span style={{ display: "inline-block" }}>
                    <PlayerAvatar />
                </span>
            </div>
        )
    }
}

export default PlayerSection;
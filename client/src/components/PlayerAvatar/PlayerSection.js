import React, { Component } from "react";
import PlayerAvatar from "./PlayerAvatar"

class PlayerSection extends Component {
    render() {
        return(
            <div>
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
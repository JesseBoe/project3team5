import React, { Component } from "react";
import style from "./Hint.css"

class Hint extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                <div className="hint d-flex justify-content-center">>
                    <span style={{ color: "#ba1e68", fontSize: "28px" }}>{this.props.hint}</span>
                </div>
            </div>
        )
    }
}

export default Hint;
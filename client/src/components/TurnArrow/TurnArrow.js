import React, { Component } from "react"
import style from "./TurnArrow.css"
import DownArrow from "./ArrowDown.png"

const TurnArrow = (props) => {
    return (
        <div className="TurnArrowContainer">
            <img className="ArrowImage" style={{ width: "100%" }} src={DownArrow}></img>
        </div>
    )
}

export default TurnArrow;
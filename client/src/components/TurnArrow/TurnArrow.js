import React from "react"
import style from "./TurnArrow.css"
import DownArrow from "./ArrowDown.png"

const TurnArrow = (props) => {
    if (props.arrowLetter) {
        return (
            <div className="TurnArrowContainer rcorners999" style={{ textAlign: 'center', textAlign: 'center', left: '26%', top: '-90px' }}>
                <span style={{ fontSize: "36px", fontWeight: "bold", color: "#ba1e68"}}>{props.arrowLetter}</span>
            </div>
        )
    }
    return (
        <div className="TurnArrowContainer">
            <img alt="arrow" className="ArrowImage" style={{ width: "100%" }} src={DownArrow}></img>
        </div>
    )
}

export default TurnArrow;
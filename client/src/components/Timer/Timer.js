import React, {Component} from "react";
import timerr from "./Timer.css";

class Timer extends Component {
    timerRef;
    state = {
        TurnTime : 5,
        TurnOver : false,
        Extra : ""
    }

    componentDidMount() {
        this.startTimer();
    }
    //This function will be called through a socket event.
    setTime = (turnTime) => {
        this.setState({
            TurnTime : turnTime,
            TurnOver : false
        }).then(() => {
            this.startTimer();
        })
    }
    startTimer = () => {
        this.timerRef = setInterval(() => {
            var turnOver = this.state.TurnTime - 1 < 0;
            document.getElementById('timer').classList.remove("play");
            if (!turnOver) {
                if (this.state.TurnTime !== 1) {
                    setTimeout(() => {
                        document.getElementById('timer').classList.add("play");

                    }, 60);
                }
                this.setState({
                    TurnTime: this.state.TurnTime - 1,
                    TurnOver: false,
                })
            }
            else {
                this.setState({
                    TurnTime: 0,
                    TurnOver: true,
                })
                this.stopTimer();
            }
        }, 1000);
    }
    stopTimer = () => {
        clearInterval(this.timerRef);
        this.timerRef = null;
    }
    toggleTimer = () => {
        if (this.timerRef) {
            this.stopTimer();
        }
        else {
            this.startTimer();
        }
    }
    componentWillUnmount = () => {
        this.stopTimer();
    }
    render(){
        return(
            <div className="offset">
                <div id="circle" className={"border border-info rounded-circle resize"} style={{ backgroundColor: "#1d1135"}}>
                </div>
                <div className={"counter play" + this.state.Extra} id="timer" onClick={() => { this.toggleTimer() }} style={{ color: "#ba1e68", fontSize: "64px" }}>
                            {this.state.TurnTime}
                </div>
            </div>
        )
    }

}

export default Timer;
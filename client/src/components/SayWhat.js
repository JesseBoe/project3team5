import React, {Component} from "react";
import Chat from "./Chat/Chat";
import GameButton from "./GameButton/GameButton";
import Navbar from "./Navbar/Navbar";
import Timer from "./Timer/Timer"
import VirtualKeyboard from "./VirtualKeyboard/VirtualKeyboard"
import PuzzleBox from "./PuzzleBox/PuzzleBox"
import Hint from "./Hint/Hint"
import PlayerSection from "./PlayerAvatar/PlayerSection"
import Wheel from "./Wheel/Wheel";

class SayWhat extends Component {

    spinWheel = () => {
        console.log("SpinWheel");
    }
    buyVowel = () => {
        console.log("BuyVowel");
    }
    solve = () => {
        console.log("Solve");
    }

    render() {
        return(
            <div>
                <Navbar/>
                <div className="container" style={{maxWidth : "98%"}}>
                    <div className="row">
                        <div className="col-6 left" style={{ overflow: "hidden"}}>
                            <div>
                                <div style={{ height: "320px" }} className="d-flex align-items-center">
                                    <PuzzleBox puzzle="____, _ __ ____ ______!" />
                                </div>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Hint />
                            </div>
                            <div style={{ marginTop: "153px"}}>
                                <PlayerSection />
                            </div>
                            {/* <div style={{ position: "absolute", top: "454px", left: "4.5%"}}> */}
                            <div style={{ position: "absolute", top: "800px", left: "4.5%" }}>
                                <VirtualKeyboard />
                            </div>
                        </div>
                        <div className="col-6 right">
                            <div style={{position: "absolute", right:140, top: 15}}>
                                <Timer/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Wheel/>
                            </div>
                            <div style={{marginTop: "0px"}}>
                                <GameButton spinWheel={this.spinWheel} buyVowel={this.buyVowel} solve={this.solve}/>
                                <Chat socket={this.props.socket}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SayWhat;
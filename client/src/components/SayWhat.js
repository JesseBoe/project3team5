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

    gameData = "";
    myId = "";
    myturn = false;

    componentDidMount() {
        this.props.socket.on("recieveMyPlayerData", (data) => {
            this.myId = data.id;
            this.forceUpdate();
        })
        this.props.socket.on("returnGameData", (data) => {
            this.gameData = data;
            if (this.gameData.players[this.gameData.whosTurn].id === this.myId) {
                this.myturn = true;
                console.log("My turn");
            }
            this.forceUpdate();
        });
        this.props.socket.emit("requestUpdate");
    }

    spinWheel = () => {
        this.props.socket.emit("requestSpinWheel");
    }
    buyVowel = () => {
        console.log("BuyVowel");
    }
    solve = () => {
        console.log("Solve");
    }

    render() {
        if (this.gameData != "") {
            return (
                <div>
                    <Navbar />
                    <div className="container" style={{ maxWidth: "98%" }}>
                        <div className="row">
                            <div className="col-6 left" style={{ overflow: "hidden" }}>
                                <div>
                                    <div style={{ height: "320px" }} className="d-flex align-items-center">
                                        <PuzzleBox puzzle={this.gameData.puzzle} />
                                    </div>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <Hint hint={this.gameData.hint} />
                                </div>
                                <div style={{ marginTop: "153px" }}>
                                    <PlayerSection gameData={this.gameData} />
                                </div>
                                {/* <div style={{ position: "absolute", top: "454px", left: "4.5%"}}> */}
                                <div style={{ position: "absolute", top: "800px", left: "4.5%" }}>
                                    <VirtualKeyboard socket={this.props.socket} />
                                </div>
                            </div>
                            <div className="col-6 right">
                                <div style={{ position: "absolute", right: 140, top: 15 }}>
                                    <Timer />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Wheel socket={this.props.socket}/>
                                </div>
                                <div style={{ marginTop: "0px" }}>
                                    <GameButton spinWheel={this.spinWheel} buyVowel={this.buyVowel} solve={this.solve} enabled={this.myturn} />
                                    <Chat socket={this.props.socket} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div></div>);
    }
}

export default SayWhat;
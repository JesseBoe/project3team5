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
import PuzzleSolve from "./PuzzleSolve/PuzzleSolve";
import TurnArrow from "./TurnArrow/TurnArrow";
import style  from "./SayWhat.css";




class SayWhat extends Component {

    gameData = "";
    myId = "";
    myturn = false;
    keyboardOnScreen = true;
    hideArrow = false;

    componentDidMount() {
        let playerObj = { username: (this.props.user.local ? this.props.user.local.username : this.props.user.firstName), robotAntenna: this.props.user.robot.RobotAntenna, robotImage: this.props.user.robot.RobotImage, robotColor: this.props.user.robot.RobotColor };
        this.props.socket.emit("setPlayer", playerObj);
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
            else {
                this.myturn = false;
            }
            this.forceUpdate();
        });
        this.props.socket.emit("requestUpdate");
    }

    spinWheel = () => {
        if (this.gameData.consonantsGuessed < 21) {
            this.props.socket.emit("requestSpinWheel");
        }
    }
    buyVowel = () => {
        if (this.gameData.vowelsGuessed < 5) {
            this.props.socket.emit("buyVowel");
        }
    }
    solve = () => {
        this.props.socket.emit("solvePuzzle");
    }

    isKeyboardOnScreen = () => {
        if (this.myturn) {
            if (this.gameData.gameState === "Selecting Consonant" || this.gameData.gameState === "Buy Vowel") {
                return true;
            }
            return false;
        }
        return false;
    }

    isPuzzleSolveOnScreen = () => {
        if (this.myturn) {
            if (this.gameData.gameState === "Solving") {
                return true;
            }
            return false;
        }
        return false;
    }
    version = 2;

    render() {
        if (this.gameData !== "") {
            if (this.version == 1) {
                return (
                    <div style={{ height: "auto" }}>
                        <Navbar />
                        <div className="container" style={{ maxWidth: "98%" }}>
                            <div style={{ position: 'fixed', width: '97%', height: '600px', zIndex: (this.isPuzzleSolveOnScreen() ? 1 : -1), overflow: 'hidden' }}>
                                <div className={this.isPuzzleSolveOnScreen() ? "puzzleSolveOffScreen puzzleSolveOnScreen" : "puzzleSolveOffScreen"}>
                                    <PuzzleSolve socket={this.props.socket} puzzle={this.gameData.puzzle} />
                                </div>
                            </div>
                            <div className="row h-100">
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
                                        <PlayerSection hideArrow={this.hideArrow} gameData={this.gameData} />
                                    </div>
                                    <div style={{ position: "relative" }}>
                                        <div className={this.isKeyboardOnScreen() ? "keyboardOffScreen keyboardOnScreen" : "keyboardOffScreen"}>
                                            <VirtualKeyboard socket={this.props.socket} gameState={this.gameData} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 right">
                                    <div style={{ position: "absolute", right: 140, top: 15 }}>
                                        <Timer />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Wheel socket={this.props.socket} />
                                    </div>
                                    <div style={{ marginTop: "0px" }}>
                                        <GameButton spinWheel={this.spinWheel} buyVowel={this.buyVowel} solve={this.solve} enabled={this.myturn} gameState={this.gameData.gameState} />
                                        <Chat socket={this.props.socket} user={this.props.user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            if (this.version = 2) {
                return <div className="container h-100 w-100">
                    <Navbar/>
                </div>
            }
        }
        return (<div></div>);
    }
}

export default SayWhat;
import React, {Component} from "react";
import Chat from "./Chat/Chat";
import GameButton from "./GameButton/GameButton";
import Navbar from "./Navbar/Navbar";
import PlayerAvater from "./PlayerAvatar/PlayerAvatar"
import Timer from "./Timer/Timer"
import VirtualKeyboard from "./VirtualKeyboard/VirtualKeyboard"

class SayWhat extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <div className="container" style={{maxWidth : "98%"}}>
                    <div className="row">
                        <div className="col-6 left">
                            <PlayerAvater/>
                            <VirtualKeyboard/>
                        </div>
                        <div className="col-6 right">
                            <div style={{position: "absolute", right:130, top: 15}}>
                                <Timer/>
                            </div>
                            <div style={{marginTop: "420px"}}>
                                <GameButton />
                                <Chat />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SayWhat;
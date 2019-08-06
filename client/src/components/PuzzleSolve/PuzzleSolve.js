import React, {Component} from "react";

class PuzzleSolve extends Component {

    state = {
        text : ""
    }

    handleInputChange = event => {
        let value = event.target.value;
        this.setState({
            text: value
        });
    };

    submitSolution = () => {
        this.props.socket.emit("idLikeToSolveThePuzzle", this.state.text);
    }

    render() {
        return <div className="card" style={{width: "800px"}}>
            <div className="card-header">
                Solve the Puzzle!
            </div>
            <div className="card-body">
                <h5 className="card-title">{this.props.puzzle}</h5>
                <input onChange={this.handleInputChange} value={this.state.text} className="form-control form-control-lg" placeholder="Type out the whole puzzle with punctuation" type="text"/>
                <div onClick={this.submitSolution} className="btn btn-primary mt-4">Solve</div>
            </div>
        </div>
    }
}

export default PuzzleSolve;
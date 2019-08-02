import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    player: {}
  };
  // When this component mounts, grab the player with the _id of this.props.match.params.id
  // e.g. localhost:3000/players/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getplayer(this.props.match.params.id)
      .then(res => this.setState({ player: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-1"></Col>
          <Col size="md-10">
            <Jumbotron>
              <h2>
                <strong>{this.state.player.name} </strong>
              </h2>
              <h5><code>Position: {this.state.player.position}</code></h5>
            </Jumbotron>
          </Col>
          <Col size="md-1"></Col>
        </Row>
        <Row>
          <Col size="md-1"></Col>
          <Col size="md-10 offset-1">
            <article className="card">
              <h2 className="card-header">Player Card</h2>
              <div className="card-body">
              <h5 className="card-subtitle">{this.state.player.name} ({this.state.player.position})</h5><hr></hr>
              <small><p>Age: {this.state.player.age} | Weight: {this.state.player.weight}lbs</p></small>
              <small><p>Position: {this.state.player.position} </p></small> 
              <small><p>AtBats: {this.state.player.atbats} | Hits: {this.state.player.hits} | Outs: {this.state.player.outs}</p></small>
              <p>
                {this.state.player.about}
              </p>
              <p><Link to="/players" className="btn btn-outline-primary">← Back to Players</Link></p>
              </div>
            </article><br></br>

          </Col>
          <Col size="md-1"></Col>
        </Row>

      </Container>
    );
  }
}

export default Detail;

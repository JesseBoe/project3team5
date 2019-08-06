import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar/Navbar";
import API from "../utils/API";

class Detail extends Component {
  state = {
    player: {}
  };
  
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
              <h5><code> level: {this.state.player.level}</code></h5>
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
              <h5 className="card-subtitle">{this.state.player.name} ({this.state.player.level})</h5><hr></hr>
              <small><p> Score: {this.state.player.score} </p>
              <p><Link to="/players" className="btn btn-outline-primary">← Back to Players</Link></p>
              </small>
              </div>
            </article>

          </Col>
          <Col size="md-1"></Col>
        </Row>

      </Container>
    );
  }
}

export default Detail;

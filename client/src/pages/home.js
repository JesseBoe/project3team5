
import React from "react";
import { Jumbotron } from 'reactstrap';
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";

const Example = (props) => {
  return (
      <Container>
        <br></br>
      <Row>
      <Col size="sm-1"></Col>
      <Col size="sm-10">
      <Jumbotron className="text-center">
        <h1 className="text-center"><small><i class="fas fa-baseball-ball fa-spin"></i></small> <strong> Player stats</strong></h1>
        <p className="lead text-center"> Players</p>
        <hr className="my-2 text-center" />
        <p>choose your own avatar</p>
      <div className="btn-group">
        <Link to="/players" className="btn btn-outline-primary align-top">players</Link> 
        {/* <Link to="/teams" className="btn btn-outline-primary">teams</Link> 
        <Link to="/games" className="btn btn-outline-primary">games</Link>  */}
      </div>
      </Jumbotron></Col>
      <Col size="sm-1"></Col>
    </Row></Container>
  );
};

export default Example;